import { Request, Response } from "express";
import { IUserLoginRequest, IUserPayload } from "../interface/user";
import { loginService, signupService } from "../service/UserService";
import { generateJWT } from "../util/JWT";

export const login = (request: Request, response: Response): void => {
	const data: IUserLoginRequest = request.body;
	const responseData = loginService(data);
	responseData.then(data => {
		if (data.code === 200) {
			const token = generateJWT(data.data.id);
			response.setHeader("Authorization", `bearer${token}`);
		}
		response.json(data);
	});
};

export const signup = (request: Request, response: Response): void => {
	const data: IUserPayload = request.body;
	const responseData = signupService(data);
	responseData.then(data => {
		if (data.code === 200) {
			const token = generateJWT(data.data.id);
			response.setHeader("Authorization", `bearer${token}`);
		}
		response.json(data);
	});
};