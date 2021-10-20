import { Request, Response } from "express";
import {
	createChannelService,
	fetchNearbyService,
	joinChannelService,
} from "../service/ChannelService";
import { IFetchNearbyChannel, IChannelJoinRequest, IChannelPayload } from "../interface/channel";

const BUCKET_NAME = process.env.BUCKET_NAME;

export const createChannel = (request: Request, response: Response): void => {
	const data: IChannelPayload = request.body;
	const userId = response.locals.userId;
	const imageUrl = `https://${BUCKET_NAME}.s3.ap-southeast-2.amazonaws.com/${request.file.filename}`;
	const responseData = createChannelService(data, userId, imageUrl);
	responseData.then((data) => {
		response.statusCode = data.code;
		response.json(data);
	});
};

export const joinChannel = (request: Request, response: Response): void => {
	const data: IChannelJoinRequest = request.body;
	const userId = response.locals.userId;
	const responseData = joinChannelService(data, userId);
	responseData.then((data) => {
		response.statusCode = data.code;
		response.json(data);
	});
};

export const fetchNearbyChannel = (request: Request, response: Response): void => {
	const data: IFetchNearbyChannel = request.body;
	const responseData = fetchNearbyService(data);
	responseData.then((data) => {
		response.statusCode = data.code;
		response.json(data);
	});
};
