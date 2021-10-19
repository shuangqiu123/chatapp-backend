import express from "express";
import { validateChannelCreation, validateJoinChannel } from "../validation/ChannelValidator";
import { generalRequestBodyValidator } from "../util/Validation";
import { verifyJWT } from "../util/JWT";
import { uploader } from "../util/AWS";
import { createChannel, joinChannel } from "../controller/ChannelController";

const router = express.Router();

// router.get("/list", generalRequestParamValidator(), listChannel);
router.post("/create", verifyJWT, uploader.single("image"), generalRequestBodyValidator(validateChannelCreation), createChannel);
router.post("/join", verifyJWT, generalRequestBodyValidator(validateJoinChannel), joinChannel);

export default router;