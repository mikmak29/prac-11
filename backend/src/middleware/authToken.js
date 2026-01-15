import dotenv from "dotenv";
import asyncErrorHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import conditionalErrorHandler from "../utils/conditionalErrorHandler.js";

dotenv.config();

const authToken = asyncErrorHandler(async (req, res, next) => {
	const headers = req.headers.authorization ?? req.headers.Authorization;
	const token = headers && headers.split(" ")[1];

	if (!token) {
		return conditionalErrorHandler("Unauthorized", 401);
	}

	jwt.verify(token, process.env.ACCESS_TOKEN, (error, data) => {
		if (error) {
			return conditionalErrorHandler("Invalid token.", 401);
		}

		const user = data.user || data;

		if (!user) {
			return conditionalErrorHandler("Invalid token structure", 401);
		}

		console.log("auth: ", user);
		req.user = {
			name: user.name,
			email: user.email,
			country: user.country,
		};

		next();
	});
});

export default authToken;
