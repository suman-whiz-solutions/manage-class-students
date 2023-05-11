import mongoose from "mongoose";
import CONFIG from ".";

mongoose.connection.on("connected", () => {
    console.log("Connected to database");
});

mongoose.connection.on("error", (err) => {
    console.error(`Database connection error: ${err}`);
    process.exit(1);
});

mongoose.connection.on("disconnected", (res) => {
    console.log("Disconnected from database",res);
});

const connectToDB = async (): Promise<void> => {
    try {
        let url = CONFIG.MONGO_URI()
        await mongoose.connect(url, { retryWrites: false }).then(res => console.log(`DB Connected to ${CONFIG.MONGO_DB}`))
    } catch (err) {
        console.log(`DB not connected due to => ${JSON.stringify(err)}`);
    }
}

export default connectToDB;