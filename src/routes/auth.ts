import express from "express";
import { login, signup } from "../controller/AuthController";
import { generalRequestBodyValidator } from "../util/Validation";
import { validateUserSignup, validateUserLogin } from "../validation/UserValidator";

const router = express.Router();

router.post("/signup", generalRequestBodyValidator(validateUserSignup), signup);
router.post("/login", generalRequestBodyValidator(validateUserLogin), login);

export default router;