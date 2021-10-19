import { Request, Response, NextFunction } from "express";
import { ValidationResult } from "joi";
import { IResponse } from "../interface/response";

export const generalRequestBodyValidator = <T>(validator: (arg: T) => ValidationResult):
(request: Request, response: Response, next: NextFunction) => void => {
	return (request: Request, response: Response, next: NextFunction) => {
		const data: T = request.body;
		const result: ValidationResult = validator(data);
		console.log(data);
		if (result.error) {
			const responseBody: IResponse<void> = {
				code: 404,
				message: "Validation error: " + result.error
			};
			response.json(responseBody);
			return;
		}
		next();
	};
};

export const generalRequestParamValidator = (validator: (arg: unknown) => ValidationResult):
(request: Request, response: Response, next: NextFunction) => void => {
	return (request: Request, response: Response, next: NextFunction) => {
		const data: unknown = { ...request.params };
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