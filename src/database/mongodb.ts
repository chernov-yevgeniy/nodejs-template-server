import mongoose from "mongoose";

export default async function () {
    const mongoDsn = process.env.MONGO_DSN;

    if (!mongoDsn) {
        throw new Error("MONGO_DSN is not defined");
    }

    return await mongoose.connect(mongoDsn)
}