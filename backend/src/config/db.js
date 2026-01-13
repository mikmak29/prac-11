import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log(`Database connected successfully at ${mongoose.connection.db.databaseName}`);
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
};

export default connectDB;
