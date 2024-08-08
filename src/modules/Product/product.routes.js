import { Router } from "express";

import {authentication} from '../../middlewares/auth.middleware.js';


import expressAsyncHandler from "express-async-handler";
import * as productcontroller from './product.controller.js';
import {authorization} from '../../middlewares/authorization.js'
import { systemRoles } from "../../utils/system-roles.js";
const router=Router();

router.post('/add',authentication(),authorization(systemRoles.USER),
expressAsyncHandler(productcontroller.addproduct));

router.put('/update/:productid',authentication(),authorization(systemRoles.USER),
expressAsyncHandler(productcontroller.updatedproduct))


router.get('/',authentication(),authorization([systemRoles.USER,systemRoles.ADMIN]),expressAsyncHandler(productcontroller.getallproducts))

router.delete('/delete/:productid',authentication(),authorization([systemRoles.ADMIN,systemRoles.USER]),expressAsyncHandler(productcontroller.deleteproduct))
export default router;