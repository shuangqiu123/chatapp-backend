import express from "express";
import { validateUserUpdate } from "../validation/UserValidator";
import { generalRequestBodyValidator } from "../util/Validation";
import { update, uploadUserPhoto } from "../controller/UserController";
import { uploader } from "../util/AWS";
import { verifyJWT } from "../util/JWT";

const router = express.Router();
router.post("/update", verifyJWT, generalRequestBodyValidator(validateUserUpdate), update);
router.post("/photo", verifyJWT, uploader.single("photo"), uploadUserPhoto);

export default router;