import { Router } from "express";
import * as authcontroller from "./auth.controller.js"
import expressAsyncHandler from "express-async-handler";
import { validationmiddleware } from "../../middlewares/validation.middleware.js";
import { signupschema } from "../Admin/user.validation.js";
const router=Router();

router.post('/signup',validationmiddleware(signupschema),expressAsyncHandler(authcontroller.signup));


router.get('/login',expressAsyncHandler(authcontroller.signin));

export default router;