const throwHTTPError = (errorMessage, statusCode) => {
	const errorFound = new Error(errorMessage);
	errorFound.statusCode = statusCode;
	throw errorFound;
};

export default throwHTTPError;
