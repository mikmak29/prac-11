import dotenv from "dotenv";
import asyncErrorHandler from "express-async-handler";
import jwt from "jsonwebtoken";

dotenv.config();

const authToken = asyncErrorHandler(async (req, res, next) => {
	const authHeaders = req.headers.Authorization ?? req.headers.authorization;
	const token = authHeaders && authHeaders.split(" ")[1];

	jwt.verify(token, process.env.ACCCESS_TOKEN, (error, user) => {
		if (error) {
			throw new Error("Please provide a token.");
		}

		if (!token) {
			throw new Error("Unauthorized.");
		}

		const userPayload = {
			username: user?.username,
			email: user?.email,
			role: user?.role,
		};

		req.user = userPayload;

		next();
	});
});

export default authToken;
