import { model, Schema, Model } from "mongoose";
import { IChannel } from "../interface/channel";

const ChannelSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
	}, 
	ownerId: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 100
	},
	coordinate: {
		type: Array,
		required: true
	},
	range: {
		type: Number
	},
	description: {
		type: String
	},
	image: {
		type: String
	}
});

const ChannelModel: Model<IChannel> = model("Channel", ChannelSchema);

export default ChannelModel;
