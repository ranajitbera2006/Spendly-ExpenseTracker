import dns from 'dns'
import mongoose from "mongoose";
dns.setServers(['8.8.8.8','8.8.4.4'])
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected successfully!");
  } catch (error) {
    console.log("Error in DB connection!", error.message);
  }
};
