import { IResponse } from "../interface/response";
import { IChannelPayload } from "../interface/channel";

export const createChannelService = async (data: IChannelPayload, ownerId: string): Promise<IResponse> => {
	const { name, type, coordinate } = data;
	return {};
};