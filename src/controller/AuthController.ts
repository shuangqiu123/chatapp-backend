import { Request, Response } from "express";
import { IUserLoginRequest, IUserPayload } from "../interface/user";
import { loginService, signupService } from "../service/UserService";

export const login = (request: Request, response: Response): void => {
	const data: IUserLoginRequest = request.body;
	const responseData = loginService(data);
	responseData.then(data => {
		response.json(data);
	});
};

export const signup = (request: Request, response: Response): void => {
	const data: IUserPayload = request.body;
	const responseData = signupService(data);
	responseData.then(data => {
		response.json(data);
	});
};