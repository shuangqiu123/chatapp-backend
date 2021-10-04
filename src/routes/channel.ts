import express from "express";
import { validateChannelCreation, validateJoinChannel } from "../validation/ChannelValidator";
import { generalRequestBodyValidator, generalRequestParamValidator } from "../util/Validation";

const router = express.Router();

router.get("/list", generalRequestParamValidator(), listChannel);
router.post("/create", generalRequestBodyValidator(validateChannelCreation), createChannel);
router.post("/join", generalRequestBodyValidator(validateJoinChannel), joinChannel);

export default router;