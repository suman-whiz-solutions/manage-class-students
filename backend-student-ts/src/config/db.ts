import mongoose from "mongoose";
import config from "./config";

const { MONGODB } = config;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
