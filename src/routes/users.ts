import express from "express";
import { validateUserUpdate } from "../validation/UserValidator";
import { generalRequestBodyValidator } from "../util/Validation";
import { update } from "../controller/UserController";
import { verifyJWT } from "../util/JWT";

const router = express.Router();

router.post("/update", verifyJWT, generalRequestBodyValidator(validateUserUpdate), update);
 
export default router;