import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1); // Exit process with failure - 1 means failure
  }
};
