const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URL);
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;