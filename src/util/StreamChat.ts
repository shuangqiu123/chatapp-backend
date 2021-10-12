import { Channel, StreamChat } from "stream-chat";
import { ChatAttachment, ChatChannel, ChatMessage, ChatUser } from "../interface/StreamChat";

const API_KEY = process.env.Stream_CHAT_API_KEY;
const SECRET = process.env.Stream_CHAT_SECRET;

const serverClient = StreamChat.getInstance<ChatAttachment, ChatChannel, string, ChatMessage, Record<string, unknown>, Record<string, unknown>, ChatUser>(API_KEY, SECRET);

export const createToken = (userId: string): string => {
	return serverClient.createToken(userId);
};

export const createChannel = async (chatChannel: ChatChannel): Promise<Channel> => {
	const channel: Channel = serverClient.channel(chatChannel.type, chatChannel.id, {
		created_by_id: chatChannel.ownerId
	});
	await channel.create();
	return channel;
};

export const addMembersToChannel = async (members: string[], chatChannel: ChatChannel): Promise<void> => {
	const channel: Channel = serverClient.channel(chatChannel.type, chatChannel.id, chatChannel);
	await channel.addMembers(members);
};

export const addModeratorsToChannel = async (moderators: string[], chatChannel: ChatChannel): Promise<void> => {
	const channel: Channel = serverClient.channel(chatChannel.type, chatChannel.id, chatChannel);
	await channel.addModerators(moderators);
};

export const publishMessageToChannel = async (chatMessage: ChatMessage, userId: string, chatChannel: ChatChannel): Promise<void> => {
	const channel: Channel = serverClient.channel(chatChannel.type, chatChannel.id, chatChannel);
	await channel.sendMessage({
		...chatMessage,
		mentioned_users: [userId]
	});
};