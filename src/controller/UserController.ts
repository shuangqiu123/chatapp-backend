import { Request, Response } from "express";
import { IProfileUpdate } from "../interface/user";
import { updateService } from "../service/UserService";

export const update = (request: Request, response: Response): void => {
	const data: IProfileUpdate = request.body;
	const userId = response.locals.userId;
	const responseData = updateService(data, userId);
	responseData.then(data => {
		response.json(data);
	});
};