import express from "express";
import { uploadUserPhoto } from "../controller/UserController";
import { uploader } from "../util/AWS";
import { verifyJWT } from "../util/JWT";

const router = express.Router();

router.post("/photo", verifyJWT, uploader.single("photo"), uploadUserPhoto);

export default router;