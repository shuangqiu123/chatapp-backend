import { Request, Response } from "express";
import { createChannelService } from "../service/ChannelService";
import { IChannelJoinRequest, IChannelPayload } from "../interface/channel";

export const createChannel = (request: Request, response: Response): void => {
	const data: IChannelPayload = request.body;
	const userId = response.locals.userId;
	const responseData = createChannelService(data, userId);
	responseData.then(data => {
		if (data.code === 200) {
			// TO-DO ADD JWT
		}
		response.json(data);
	});
};

export const joinChannel = (request: Request, response: Response): void => {
	const data: IChannelJoinRequest = request.body;
	const userId = response.locals.userId;
	const responseData = signupService(data);
	responseData.then(data => {
		if (data.code === 200) {
			// TO-DO ADD JWT
		}
		response.json(data);
	});
};