import { Router } from "express";
import { signIn, signUp } from "../controller/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { signInSchema, signUpSchema } from "../validator/user.validation.js";


const authRouter = Router();

authRouter.post("/signup",validate(signUpSchema),signUp);
authRouter.post("/signin",validate(signInSchema),signIn);

export default authRouter