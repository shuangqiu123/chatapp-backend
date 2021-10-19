import { Channel, StreamChat } from "stream-chat";
import { ChatAttachment, ChatChannel, ChatMessage, ChatUser } from "../interface/StreamChat";

const API_KEY = process.env.Stream_CHAT_API_KEY;
const SECRET = process.env.Stream_CHAT_SECRET;

const serverClient = StreamChat.getInstance<
ChatAttachment,
ChatChannel,
string,
ChatMessage,
Record<string, unknown>,
Record<string, unknown>,
ChatUser
>(API_KEY, SECRET);

export const createToken = (userId: string): string => {
	return serverClient.createToken(userId);
};

export const connectUser = async (userId: string): Promise<void> => {
	await serverClient.connectUser(
		{
			id: userId,
			name: userId,
			isAdmin: false,
		},
		createToken(userId)
	);
};

export const createChannel = async (chatChannel: ChatChannel): Promise<Channel> => {
	const member: string[] = new Array(chatChannel.ownerId);

	const channel: Channel = serverClient.channel("messaging", chatChannel.id, {
		members: member,
		created_by_id: chatChannel.ownerId,
		name: chatChannel.name,
		image: chatChannel.image,
		description: chatChannel.description,
	});
	await channel.create();
	return channel;
};

export const addMembersToChannel = async (
	members: string[],
	chatChannel: ChatChannel
): Promise<void> => {
	const channel: Channel = serverClient.channel("messaging", chatChannel.id, chatChannel);
	await channel.addMembers(members);
};

export const addModeratorsToChannel = async (
	moderators: string[],
	chatChannel: ChatChannel
): Promise<void> => {
	const channel: Channel = serverClient.channel("messaging", chatChannel.id, chatChannel);
	await channel.addModerators(moderators);
};

export const publishMessageToChannel = async (
	chatMessage: ChatMessage,
	userId: string,
	chatChannel: ChatChannel
): Promise<void> => {
	const channel: Channel = serverClient.channel("messaging", chatChannel.id, chatChannel);
	await channel.sendMessage({
		...chatMessage,
		mentioned_users: [userId],
	});
};

export const updateUserAvatar = async (avatarUrl: string, userId: string): Promise<void> => {
	await serverClient.upsertUser({
		id: userId,
		isAdmin: false,
		image: avatarUrl,
	});
};

export const queryChannels = async (
	channelIdList: string[],
	userId: string
): Promise<Channel[]> => {
	const filter = {
		type: "messaging",
		members: { $in: [userId] },
		id: { $in: channelIdList },
		joined: false,
	};

	const result = await serverClient.queryChannels(filter);
	return result;
};

export const calculateDistance = (point1: number[], point2: number[]): number => {
	const la = point1[0] - point2[0];
	const lo = point1[1] - point2[1];

	return Math.sqrt(la * la + lo * lo);
};
