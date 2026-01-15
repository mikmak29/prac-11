import STATUS_CODE from "../constants/STATUS_CODE.js";

const globalErrorHandler = (error, req, res, next) => {
	const status = error.status || error.statusCode || 500;

	const matchedError = STATUS_CODE[status] || STATUS_CODE[500];

	const errorFound = {
		...matchedError,
		errorMessage: error.message,
		errorStack: error.stack,
	};
	res.status(status).json(errorFound);
};

export default globalErrorHandler;
