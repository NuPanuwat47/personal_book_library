import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDatabase = async (): Promise<void> => {
	const databaseUri = process.env.MONGODB_URI;
	if (!databaseUri) {
		throw new Error("Missing MONGODB_URI in environment");
	}

	await mongoose.connect(databaseUri);
	console.log("MongoDB connected");
};
