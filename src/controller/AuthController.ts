import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUserLoginRequest, IUserPayload } from "../interface/user";
import { loginService, signupService } from "../service/UserService";

function generateJWT(userID: string){
	const token = jwt.sign({ _id: userID}, "PrivateKey", {expiresIn: "1200"});
	return token;
}
export const login = (request: Request, response: Response): void => {
	const data: IUserLoginRequest = request.body;
	const responseData = loginService(data);
	responseData.then(data => {
		if (data.code === 200) {
			// TO-DO ADD JWT			
			//const token = jwt.sign({ _id: data.data.id}, "PrivateKey", {expiresIn: "1200"});
			const token = generateJWT(data.data.id);
			response.setHeader("Authorization", `bearer${token}`);
			// response.header("x-auth-token", token).send(_.pick(user, ['_id', 'name', 'email']));
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
			const token = generateJWT(data.data.id);
			response.setHeader("Authorization", `bearer${token}`);
		}
		response.json(data);
	});
};