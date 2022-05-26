import { Router } from "express";

import * as userCtrl from '../controllers/user.controller'
import { authJwt, veryfySignup } from "../middlewares";



const router = Router();

//Rutas
router.post('/',[authJwt.verifyToken,authJwt.isAdmin,veryfySignup.checkRolesExisted],userCtrl.createUser);


export default router;
