import { Document } from "mongoose";
import { EChannelType } from "../common/StreamChat";

export interface IChannel extends Document {
	name: string;
	ownerId: string;
	description: string;
	image: string;
	coordinate: number[];
}

export interface IChannelPayload {
	id?: string;
	name: string;
	ownerId?: string;
	description: string;
	coordinate: number[];
}

export interface IChannelJoinRequest {
	id: string;
	type: EChannelType;
}

export interface IFetchNearbyChannel {
	id: string;
	range: number;
	location: number[];
}

export interface ISortedList {
	channelId: string;
	distance: number;
}
