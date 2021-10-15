import { IResponse } from "../interface/response";
import { IChannel, IChannelPayload, IChannelJoinRequest } from "../interface/channel";
import ChannelModel from "../model/channel";
import { createChannel, addMembersToChannel } from "../util/StreamChat";

export const createChannelService = async (data: IChannelPayload, ownerId: string): Promise<IResponse<IChannelPayload>> => {
	const { name, description, image, coordinate } = data;
	let response;
	const channel = new ChannelModel({
		description,
		image,
		ownerId,
		name,
		coordinate
	});

	await channel.save().then(async (channel: IChannel) => {
		const returnChannel = await createChannel({
			id: channel._id.toString(),
			ownerId,
			name,
			description,
			image,
			coordinate
		});
		response = {
			code: 200,
			data: {
				name,
				ownerId,
				id: returnChannel.id,
				coordinate
			}
		};
	});

	return response;
};

export const joinChannelService = async (data: IChannelJoinRequest, userId: string): Promise<IResponse<void>> => {
	await addMembersToChannel([userId], {
		id: data.id,
		ownerId: "",
		name: "",
		coordinate: []
	});

	return {
		code: 200
	};
};