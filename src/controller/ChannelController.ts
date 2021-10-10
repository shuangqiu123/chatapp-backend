import { Request, Response } from "express";
import { createChannelService, joinChannelService } from "../service/ChannelService";
import { IChannelJoinRequest, IChannelPayload } from "../interface/channel";

export const createChannel = (request: Request, response: Response): void => {
	const data: IChannelPayload = request.body;
	const userId = response.locals.userId;
	const responseData = createChannelService(data, userId);
	responseData.then(data => {
		response.json(data);
	});
};

export const joinChannel = (request: Request, response: Response): void => {
	const data: IChannelJoinRequest = request.body;
	const userId = response.locals.userId;
	const responseData = joinChannelService(data, userId);
	responseData.then(data => {
		response.json(data);
	});
};