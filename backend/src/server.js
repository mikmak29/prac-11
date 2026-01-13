import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookie from "cookie-parser";
import express from "express";
// import { v4 as uuidv4 } from "uuid";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8100;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookie());
app.use(compression());

const severStarter = () => {
	try {
		app.listen(PORT, () => {
			console.log(`Server was listening on PORT ${PORT}`);
		});
	} catch (error) {
		throw new Error({ message: error.message });
	}
};

severStarter();
