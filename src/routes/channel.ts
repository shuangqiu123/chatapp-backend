import express from "express";
import {
	validateChannelCreation,
	validateFetchNearbyChannel,
	validateJoinChannel,
} from "../validation/ChannelValidator";
import { generalRequestBodyValidator } from "../util/Validation";
import { verifyJWT } from "../util/JWT";
import { uploader } from "../util/AWS";

// router.get("/list", generalRequestParamValidator(), listChannel);

import { createChannel, fetchNearbyChannel, joinChannel } from "../controller/ChannelController";

const router = express.Router();

router.post(
	"/fetchnearby",
	verifyJWT,
	generalRequestBodyValidator(validateFetchNearbyChannel),
	fetchNearbyChannel
);
router.post(
	"/create",
	verifyJWT,
	uploader.single("image"),
	generalRequestBodyValidator(validateChannelCreation),
	createChannel
);
router.post("/join", verifyJWT, generalRequestBodyValidator(validateJoinChannel), joinChannel);

export default router;
