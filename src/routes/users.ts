import express from "express";
import multer from "multer";
import { uploadUserPhoto } from "../controller/UserController";
import CustomStorageEngine from "../util/Multer";

const router = express.Router();
const uploader = multer({
	storage: new CustomStorageEngine()
});

router.post("/photo", uploader.single("photo"), uploadUserPhoto);

export default router;