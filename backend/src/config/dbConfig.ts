import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`, {
            dbName: "EventAura",
        });
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.log(`Error in connecting to MongoDB: ${error}`);
        process.exit(1); // Exit process with failure
    }
}

export default connectDB;