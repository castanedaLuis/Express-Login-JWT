import { Router } from "express";
//importar controladores (Funciones)
import * as productsCtrl from '../controllers/products.controller';
//importar el modulo para dar acceso a rutas
import { authJwt } from "../middlewares";

const router = Router();

router.post('/',[authJwt.verifyToken,authJwt.isModerator] ,productsCtrl.creatProducts);

router.get('/', productsCtrl.getProducts);

router.get('/:productId', productsCtrl.getProductById);

router.put('/:productId', [authJwt.verifyToken,authJwt.isModerator],productsCtrl.UpdateProductById);

router.delete('/:productId', [authJwt.verifyToken,authJwt.isModerator],productsCtrl.deleteProductById);





export default router;
