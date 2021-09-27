import Joi, { ValidationResult } from "joi";
import { IUserPayload } from "../interface/user";

export const validateUser = (user: IUserPayload): ValidationResult => {
	const schema = Joi.object({
		username: Joi.string().min(5).max(20).required(),
		email: Joi.string().email().min(5).max(255).required(),
		password: Joi.string().min(5).max(30).required()
	});
	return schema.validate(user);
};