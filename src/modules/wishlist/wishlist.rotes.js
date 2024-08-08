import { Router } from "express";
import * as wishcontroller from './wishlist.controller.js';
import { authentication } from "../../middlewares/auth.middleware.js";
import { authorization } from "../../middlewares/authorization.js";
import { systemRoles } from "../../utils/system-roles.js";
import expressAsyncHandler from "express-async-handler";
const router=Router();

router.post('/add',authentication(),authorization(systemRoles.USER),
expressAsyncHandler(wishcontroller.addToWishList));

router.get('/',authentication(),authorization(systemRoles.USER),
expressAsyncHandler(wishcontroller.viewWishList));


router.delete('/delete/:productid',authentication(),authorization(systemRoles.USER),
expressAsyncHandler(wishcontroller.deleteFromWishList));



export default router
