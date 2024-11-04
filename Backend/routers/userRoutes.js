const express = require('express');
const userFunctions = require('../controllers/userControllers');
const Router = express.Router();

// Route to handle user signup
Router.route('/signup').post(userFunctions.signup);

// Route to handle email verification
Router.route('/verify/:userId/:uniqueString').get(userFunctions.verification);

// Route to handle user login
Router.route('/login').post(userFunctions.login);

// Route to handle user logout
Router.route('/logout').get(userFunctions.logout);

// Route to get user information
Router.route('/getUserInfo').get(userFunctions.getUserInfo);

module.exports = Router;
