import { Router } from "express";

const router = Router();

import * as authCtrl from "../controllers/auth.controller";
import {veryfySignup} from  '../middlewares';

//Rutas
router.post('/signup',[veryfySignup.checkDuplicated, veryfySignup.checkRolesExisted],authCtrl.signUp);
router.post('/signin', authCtrl.signin);



export default router;
