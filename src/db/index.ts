import mongoose from "mongoose";
import { config } from "../utils/config";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(config.databaseUrl as string)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB