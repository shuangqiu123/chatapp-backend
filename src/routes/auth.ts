import express from "express";
import { login, signup } from "../controller/AuthController";
import { generalRequestBodyValidator, validateUserSignup, validateUserLogin } from "../util/Validation";

const router = express.Router();

router.post("/signup", generalRequestBodyValidator(validateUserSignup), signup);
router.post("/login", generalRequestBodyValidator(validateUserLogin), login);

export default router;