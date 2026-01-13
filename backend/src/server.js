import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
// import { v4 as uuidv4 } from "uuid";

dotenv.config();

const PORT = process.env.PORT || 8100;

const severStarter = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log(`Server was listening on PORT ${PORT}`);
		});
	} catch (error) {
		throw new Error({ message: error.message });
	}
};

severStarter();
