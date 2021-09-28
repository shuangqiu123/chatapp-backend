import { Request, Response, NextFunction } from "express";
import Joi, { ValidationResult } from "joi";
import { IResponse } from "../interface/response";
import { IUserLoginRequest, IUserPayload } from "../interface/user";

export const generalRequestBodyValidator = <T>(validator: (arg: T) => ValidationResult):
(request: Request, response: Response, next: NextFunction) => void => {
	return (request: Request, response: Response, next: NextFunction) => {
		const data: T = request.body;
		const result: ValidationResult = validator(data);
	
		if (result.error) {
			const responseBody: IResponse<void> = {
				code: 404,
				message: "Validation error"
			};
			response.json(responseBody);
			return;
		}
		next();
	};
};

export const validateUserSignup = (user: IUserPayload): ValidationResult => {
	const schema = Joi.object({
		username: Joi.string().min(5).max(20).required(),
		email: Joi.string().email().min(5).max(255).required(),
		password: Joi.string().min(5).max(30).required()
	});
	return schema.validate(user);
};

export const validateUserLogin = (user: IUserLoginRequest): ValidationResult => {
	const schema = Joi.object({
		email: Joi.string().email().min(5).max(255).required(),
		password: Joi.string().min(5).max(30).required()
	});
	return schema.validate(user);
};