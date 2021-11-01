import { IUserLoginRequest, IUserPayload, IProfileUpdate, IUserGet } from "../interface/user";
import Joi, { ValidationResult } from "joi";

export const validateUserSignup = (user: IUserPayload): ValidationResult => {
	const schema = Joi.object({
		email: Joi.string().email().min(5).max(255).required(),
		password: Joi.string().min(5).max(30).required(),
	});
	return schema.validate(user);
};

export const validateUserLogin = (user: IUserLoginRequest): ValidationResult => {
	const schema = Joi.object({
		email: Joi.string().email().min(5).max(255).required(),
		password: Joi.string().min(5).max(30).required(),
	});
	return schema.validate(user);
};

export const validateUserUpdate = (user: IProfileUpdate): ValidationResult => {
	const schema = Joi.object({
		username: Joi.string().min(5).max(20).required(),
		bio: Joi.string().required(),
	});
	return schema.validate(user);
};
export const validateUserGet = (user: IUserGet): ValidationResult => {
	const schema = Joi.object({
		users: Joi.required(),
	});
	return schema.validate(user);
};
