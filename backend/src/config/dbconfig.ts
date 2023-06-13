import mongoose, { ConnectOptions } from "mongoose";

const DB_NAME = "TestDB";
const DB_USERNAME = "admin";
const DB_PASSWORD = "admin@123";
const DB_HOST = "localhost";
const DB_PORT = "27017";

const url = `mongodb+srv://admin:admin123@cluster0.145qkxl.mongodb.net/`;

if (!DB_HOST) {
  console.error("DB_URI not found in environment variables!");
  process.exit(1);
}

mongoose.connection.on("connected", () => {
  console.log("Connected to database", DB_NAME);
});

mongoose.connection.on("error", (err) => {
  console.error(`database connection error: ${err}`);
  process.exit(1);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from database");
});

const connectToDb = async (): Promise<void> => {
  try {
    const options: ConnectOptions = {
        auth: {
            username: DB_USERNAME,
            password: DB_PASSWORD
        },
        retryWrites: false
    };
    await mongoose.connect(url, options as any).then(res => console.log(`dbconfig: connected to portal DB: ${url}`));
  } 
  catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToDb;
