import { IResponse } from "../interface/response";
import { IChannel, IChannelPayload, IChannelJoinRequest } from "../interface/channel";
import ChannelModel from "../model/channel";
import { createChannel, addMembersToChannel } from "../util/StreamChat";

export const createChannelService = async (data: IChannelPayload, ownerId: string): Promise<IResponse<IChannelPayload>> => {
	const { name, type, coordinate } = data;
	let response;
	const channel = new ChannelModel({
		type,
		ownerId,
		name,
		coordinate
	});

	await channel.save().then(async (channel: IChannel) => {
		const returnChannel = await createChannel({
			id: channel._id.toString(),
			type,
			ownerId,
			name,
			coordinate
		});
		response = {
			code: 200,
			data: {
				name,
				ownerId,
				id: returnChannel.id,
				type: returnChannel.type,
				coordinate
			}
		};
	});

	return response;
};

export const joinChannelService = async (data: IChannelJoinRequest, userId: string): Promise<IResponse<void>> => {
	await addMembersToChannel([userId], {
		id: data.id,
		type: data.type,
		ownerId: "",
		name: "",
		coordinate: []
	});

	return {
		code: 200
	};
};