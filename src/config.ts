import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const url: string | undefined = process.env.DATABASE_URL;

const connectDB = async () => {
  if (url) {
    const conn = await mongoose.connect(url);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } else {
    throw new Error("DATABASE_URL is not defined");
  }
};

export default connectDB;
