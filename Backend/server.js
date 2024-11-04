const server = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables from the config file
dotenv.config({ path: "./config.env" });

// Construct the database connection string
const db = process.env.DATABASE.replace(
    "<password>", // Placeholder for the password
    process.env.DATABASE_PASS // Replace with actual password from environment variables
);

// Connect to the database
mongoose.connect(db).then(() => {
  console.log("Database Connected");
}).catch(err => {
  console.error("Database connection error:", err); // Log any connection errors
});

// Start the server and listen on the specified port
server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
