import { Request, Response } from "express";
const jwt = require('jsonwebtoken');
import { IUserLoginRequest, IUserPayload } from "../interface/user";
import { loginService, signupService } from "../service/UserService";

export const login = (request: Request, response: Response): void => {
	const data: IUserLoginRequest = request.body;
	const responseData = loginService(data);
	responseData.then(data => {
		if (data.code === 200) {
			// TO-DO ADD JWT
			
			const token = jwt.sign({ _id: user._id }, "PrivateKey");
			// res.send(token);
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
			// TO-DO ADD JWT
		}
		response.json(data);
	});
};