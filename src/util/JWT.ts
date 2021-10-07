import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IResponse } from "../interface/response";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateJWT = (userID: string): string => {
	const token = jwt.sign({ _id: userID }, JWT_SECRET, { expiresIn: "1d" });
	return token;
};

export const verifyJWT = (request: Request, response: Response, next: NextFunction): void => {
	const token = request.header("Authorization");
	if (!token) {
		const responseBody: IResponse<void> = {
			code: 401,
			message: "Unauthorised request"
		};
		response.json(responseBody);
		return;
	}
	try {
		const payload: JwtPayload | string = jwt.verify(token.slice(6), JWT_SECRET);
		if (typeof payload == "string") {
			return;
		}
		response.locals.userId = payload._id;
		next();
	} catch (err) {
		const responseBody: IResponse<void> = {
			code: 401,
			message: "Unauthorised request"
		};
		response.json(responseBody);
		return;
	}
};