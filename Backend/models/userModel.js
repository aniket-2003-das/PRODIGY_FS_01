const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

// Define the user schema
const userSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: [true, "A user must have an email"], // Ensure email is provided
    validate: [validator.isEmail, "Email provided is not valid"], // Validate email format
  },
  
  password: {
    type: String,
    required: [true, "Please enter password"], // Ensure password is provided
    minlength: 8, // Minimum password length
  },
  
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm password"], // Ensure password confirmation is provided
    validate: [
      function (ele) {
        return ele === this.password; // Validate that password and confirmation match
      },
      "Password doesn't match", // Error message for mismatched passwords
    ],
  },
  
  verified: {
    type: Boolean,
    default: false, // Default to false if not specified
  },
  
  firstName: {
    type: String,
    required: false, // Optional field
  },
  
  lastName: {
    type: String,
    required: false, // Optional field
  },
  
  image: {
    type: String,
    required: false, // Optional field
  },
  
  profileSetup: {
    type: Boolean,
    default: false, // Default to false if not specified
  },
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) { // Only hash the password if it's new or modified
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Create and export the user model
const Users = mongoose.model("Users", userSchema);
module.exports = Users;
