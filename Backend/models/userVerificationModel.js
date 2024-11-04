const mongoose = require("mongoose");

const usersVerificationSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  userEmail: String,
  hashedString: String,
  createdAt: Date,
  expiresAt: Date,
});

const usersVerification = mongoose.model(
  "userVerification",
  usersVerificationSchema
);

module.exports = usersVerification;