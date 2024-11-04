const express = require("express");
const http = require("http");
const userRoutes = require("./routers/userRoutes");
const errorFunctions = require("./utils/errorHandler");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const server = http.createServer(app);

// Middleware to parse JSON request bodies
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Frontend origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Middleware to parse cookies
app.use(cookieParser());

// Route handling for user-related requests
app.use("/api/users", userRoutes);

// Middleware to handle 404 errors for unmatched routes
app.use("*", (req, res) => {
  res.status(404).json({
    status: "Page not found",
  });
});

// Middleware for global error handling
app.use(errorFunctions.errorHandler);

module.exports = server;
