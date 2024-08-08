import { Router } from "express";

import { authentication } from "../../middlewares/auth.middleware.js";
import { authorization } from "../../middlewares/authorization.js";
import expressAsyncHandler from "express-async-handler";
import * as categorycontroller from './category.contoller.js'
import { systemRoles } from "../../utils/system-roles.js";


const router=Router();

router.post('/add',authentication(),authorization(systemRoles.ADMIN),expressAsyncHandler(categorycontroller.addcategory));

router.put('/update/:categoryid',authentication(),authorization(systemRoles.ADMIN),
expressAsyncHandler(categorycontroller.updatecategory));

router.get('/',authentication(),authorization(systemRoles.ADMIN),expressAsyncHandler(categorycontroller.gettcategorys));

router.delete('/delete/:categoryid',authentication(),authorization(systemRoles.ADMIN),expressAsyncHandler(categorycontroller.deletecategory))
export default router;