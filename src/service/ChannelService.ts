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
	queryChannels,
} from "../util/StreamChat";
import { Channel } from "stream-chat/dist/types/channel";

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
		response = {
			code: 200,
			data: {
				name,
				ownerId,
				image,
				id: returnChannel.id,
				coordinate,
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

	return {
		code: 200,
	};
};

export const fetchNearbyService = async (
	data: IFetchNearbyChannel,
	userId: string
): Promise<IResponse<Channel[]>> => {
	const validChannelList: string[] = [];
	const sortedList: ISortedList[] = [];

	await ChannelModel.find({}).then(async (result: IChannel[]) => {
		for (let i = 0; i < result.length; i++) {
			const distance = calculateDistance(data.location, result[i].coordinate);

			const tempChannelDistance: ISortedList = {
				channelId: "",
				distance: 0,
			};
			if (data.range >= distance) {
				tempChannelDistance.channelId = result[i]._id.toString();
				tempChannelDistance.distance = distance;
				sortedList.push(tempChannelDistance);
				validChannelList.push(result[i]._id.toString());
			}
		}
	});

	sortedList.sort((fl, sl) => fl.distance - sl.distance);
	const streamList = await queryChannels(validChannelList, userId);
	// TODO: The resultList will the sorted list with raw channel data.
	// let resultList = [];
	// console.log(streamList);
	// for (let x = 0; x < sortedList.length; x++) {
	// 	for(let y = 0;y<streamList.length; y++){
	// 		// Not sure whether is called "id" for raw channel data.
	// 		if(streamList[y].id = sortedList[x].channelId){
	// 			resultList.push(streamList[y])
	// 		}
	// 	}
	// }
	const response = {
		code: 200,
		data: streamList,
	};
	return response;
};
