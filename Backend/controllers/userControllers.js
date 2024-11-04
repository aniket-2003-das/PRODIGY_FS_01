const catchAsync = require("../utils/catchAsync");
const Users = require("../models/userModel");
const usersVerification = require("../models/userVerificationModel");
const sendMail = require("../utils/sendMail");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const appError = require("../utils/appError");
const JWT = require("jsonwebtoken");

exports.signup = catchAsync(async (req, res, next) => {
  const check1 = await Users.find({
    $and: [{ userEmail: req.body.userEmail }, { verified: true }],
  });
  if (check1.length > 0)
    return next(new appError("This email is already registered", 400));

  const check2 = await Users.find({ userEmail: req.body.userEmail });
  if (check2.length > 0) {
    await Users.deleteOne({ userEmail: req.body.userEmail });
  }

  const newUser = await Users.create({
    userEmail: req.body.userEmail,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    verified: false,
    firstName: undefined,
    lastName: undefined,
    image: undefined,
    profileSetup: false,
  });

  try {
    await sendVerificationEmail(newUser, req);
  } catch (err) {
    return next(new appError("Failed to send Email", 400));
  }

  res.status(202).json({
    Status: "Pending",
    Message: "Verification email has been sent",
    newUser,
  });
});

const sendVerificationEmail = catchAsync(async (newUser, req) => {
  const check1 = await usersVerification.find({ userEmail: newUser.userEmail });
  if (check1) {
    await usersVerification.deleteOne({ userEmail: newUser.userEmail });
  }

  const uniqueString = uuidv4();
  const hashedString = await bcrypt.hash(uniqueString, 10);

  const newToken = await usersVerification.create({
    userId: newUser._id,
    userEmail: newUser.userEmail,
    hashedString: hashedString,
    createdAt: Date.now(),
    expiresAt: Date.now() + 21600000, // Expires after 6 hours
  });

  const message =
    `Open this to verify. ${process.env.origin}` +
    "/verify/" +
    newUser._id +
    "/" +
    uniqueString;
  sendMail({
    to: newUser.userEmail,
    subject: "Verify Your Email",
    text: message,
  });
});

exports.verification = catchAsync(async (req, res, next) => {
  const { userId, uniqueString } = req.params;
  const currentUser = await usersVerification.find({ userId: userId });

  if (
    currentUser[0] &&
    currentUser[0].expiresAt > Date.now() &&
    (await bcrypt.compare(uniqueString, currentUser[0].hashedString))
  ) {
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { verified: true },
      { new: true }
    );

    await usersVerification.deleteOne({ userId: userId });
    res.status(201).json({
      Status: "Verified",
      Message: "Verification Completed successfully",
      updatedUser,
    });
  } else {
    res.status(400).json({
      Status: "Unverified",
      message: "Verification Failed",
    });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { userEmail, password } = req.body;
  const cuser = await Users.findOne({ userEmail });
  if (!cuser) {
    return next(
      new appError(
        "The provided email doesn't exist in the database. Please sign up first.",
        400
      )
    );
  }

  if (!cuser.verified) {
    return next(
      new appError("Please verify your email first or else sign up again", 400)
    );
  }

  if (!(await bcrypt.compare(password, cuser.password))) {
    return next(new appError("Incorrect password", 400));
  }
  createSendToken(cuser, res);
});

const sign = (id, email) => {
  return JWT.sign({ id, email }, `${process.env.JWT_SECRET}`, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, res) => {
  const token = sign(user._id, user.userEmail);

  const cookieOptions = {
    expire: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
    sameSite: "None",
  };
  res.cookie("jwt", token, cookieOptions);
  res.status(200).json({
    Status: "success",
    user,
    token,
  });
};

exports.logout = (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(0), // Set to a date in the past to expire the cookie
    httpOnly: true, // Ensure the cookie is not accessible via JavaScript
    secure: true, // Use secure cookies in production
    sameSite: "None", // Ensure proper cross-site requests
  });
  res.status(204).json({
    Status: "success",
  });
};

exports.getUserInfo = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(
      new appError("You are not logged in. Please log in first!", 401)
    );
  }
  const decoded = JWT.verify(token, process.env.JWT_SECRET);
  const currentUser = await Users.findById(decoded.id);
  if (!currentUser) {
    return next(
      new appError("The user belonging to this token does not exist.", 400)
    );
  }
  res.status(200).json({
    userInfo: currentUser,
  });
});
