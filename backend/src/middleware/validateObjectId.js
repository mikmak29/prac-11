import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		const error = new Error("Invalid ID or record not found");
		error.status = 409;
		return next(error);
	}
	next();
};

export default validateObjectId;
