import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const accessToken = async (userPayload) => {
	try {
		const token = jwt.sign({ userPayload }, process.env.ACCESS_TOKEN, { expiresIn: "2m" });
		return token;
	} catch (error) {
		return {
			status: 409,
			errorMessage: error.message,
			errorStack: error.stack,
		};
	}
};
