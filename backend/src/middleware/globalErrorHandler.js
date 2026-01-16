import dotenv from "dotenv";
import STATUS_CODE from "../constants/STATUS_CODE.js";

dotenv.config();

const globalErrorHandler = (error, req, res, next) => {
	const status = error.statusCode || 500;

	console.log(error.statusCode);

	const matchedError = STATUS_CODE[status];

	const errorFound = {
		status: status,
		errorTitle: matchedError.title,
		errorMessage: error.message,
	};

	if (process.env.NODE_ENV === "development") {
		errorFound.stack = error.stack;
	}

	res.status(status).json(errorFound);
};

export default globalErrorHandler;
