import { Router } from "express";

import expressAsyncHandler from "express-async-handler";
import * as usercontroller from './Admin.controller.js';
import { authentication } from "../../middlewares/auth.middleware.js";
import { systemRoles } from "../../utils/system-roles.js";
import { authorization } from "../../middlewares/authorization.js";
const router=Router();

router.delete('/delete-admin',authentication(),authorization(systemRoles.ADMIN),expressAsyncHandler(usercontroller.deleteaccount));

router.put('/update/:adminid',authentication(),authorization(systemRoles.ADMIN),expressAsyncHandler(usercontroller.updateadmin));

router.get('/get-admins',authentication(),authorization(systemRoles.ADMIN),expressAsyncHandler(usercontroller.viewadmin))

router.post('/add',authentication(),authorization(systemRoles.ADMIN),expressAsyncHandler(usercontroller.addadmin))

///user operations
router.delete('/delete-user',authentication(),authorization(systemRoles.ADMIN),expressAsyncHandler(usercontroller.deleteuser))

router.get('/get-users',authentication(),authorization(systemRoles.ADMIN),expressAsyncHandler(usercontroller.viewuser))
export default router;