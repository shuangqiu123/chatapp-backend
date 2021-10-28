import { IResponse } from "../interface/response";
import {
	IChannel,
	IChannelPayload,
	IChannelJoinRequest,
	IFetchNearbyChannel,
	ISortedList,
} from "../interface/channel";
import ChannelModel from "../model/channel";
import {
	createChannel,
	addMembersToChannel,
	calculateDistance,
} from "../util/StreamChat";
import UserModel from "../model/user";
import { IUser } from "../interface/user";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Distance = require("geo-distance");

export const createChannelService = async (
	data: IChannelPayload,
	ownerId: string,
	image: string
): Promise<IResponse<IChannelPayload>> => {
	const { name, description } = data;
	let { coordinate } = data;
	let response;

	if (typeof coordinate === "string") {
		coordinate = JSON.parse(coordinate);
	}

	const channel = new ChannelModel({
		description,
		ownerId,
		image,
		name,
		coordinate,
	});

	await channel.save().then(async (channel: IChannel) => {
		const returnChannel = await createChannel({
			id: channel._id.toString(),
			ownerId,
			name,
			description,
			image,
			coordinate,
		});

		UserModel.findById(ownerId)
			.then((user: IUser) => {
				if (!user.joinedChannels) {
					user.joinedChannels = [];
				}
				user.joinedChannels.push(channel._id.toString());
				user.save();
			});

		response = {
			code: 200,
			data: {
				name,
				ownerId,
				image,
				id: returnChannel.id,
				coordinate,
				description
			},
		};
	});

	return response;
};

export const joinChannelService = async (
	data: IChannelJoinRequest,
	userId: string
): Promise<IResponse<void>> => {
	await addMembersToChannel([userId], {
		id: data.id,
		ownerId: "",
		name: "",
		coordinate: [],
	});
	UserModel.findById(userId)
		.then((user: IUser) => {
			if (!user.joinedChannels) {
				user.joinedChannels = [];
			}
			user.joinedChannels.push(data.id);
			user.save();
		});
	return {
		code: 200,
	};
};

export const fetchNearbyService = async (
	data: IFetchNearbyChannel,
	userId: string
): Promise<IResponse<IChannelPayload[]>> => {
	const validChannelList: IChannelPayload[] = [];
	const sortedList: ISortedList[] = [];
	await UserModel.findById(userId).then(async (user: IUser) => {
		const joinedChannels = new Set(user.joinedChannels);

		await ChannelModel.find().then(async (result: IChannel[]) => {
			for (let i = 0; i < result.length; i++) {
				// check if it is in the joined channels
				if (joinedChannels.has(result[i]._id.toString())) {
					continue;
				}

				const distance = calculateDistance(data.location, result[i].coordinate);
	
				const tempChannelDistance: ISortedList = {
					channelId: "",
					distance: 0,
				};
				if (Distance(data.range + " m") >= distance) {
					tempChannelDistance.channelId = result[i]._id.toString();
					tempChannelDistance.distance = distance;
					sortedList.push(tempChannelDistance);
					validChannelList.push({
						name: result[i].name,
						ownerId: result[i].ownerId,
						image: result[i].image,
						coordinate: result[i].coordinate,
						id: result[i]._id.toString(),
						description: result[i].description
					});
				}
			}
		});
	});

	const response = {
		code: 200,
		data: validChannelList,
	};
	return response;
};
