import dotenv from "dotenv";
import asyncErrorHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import throwHTTPError from "../utils/throwHTTPError.js";

dotenv.config();

const authToken = asyncErrorHandler(async (req, res, next) => {
	const headers = req.headers.authorization ?? req.headers.Authorization;
	const token = headers && headers.split(" ")[1];

	if (!token) {
		return throwHTTPError("Unauthorized", 401);
	}

	jwt.verify(token, process.env.ACCESS_TOKEN, (error, data) => {
		if (error) {
			return throwHTTPError("Invalid token.", 401);
		}

		const user = data.user || data; // Extract the userPayload

		// if data not found, return an error
		if (!user) {
			return throwHTTPError("Invalid token structure", 401);
		}

		// Extracted userPayload for req.user to access the data from the GET method
		req.user = {
			id: user.id || user._id,
			name: user.name,
			email: user.email,
			country: user.country,
		};

		next();
	});
});

export default authToken;
