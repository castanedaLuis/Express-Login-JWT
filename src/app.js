import express from "express";
import morgan from "morgan";
import pkg from '../package.json';

import { createRoles } from "./libs/initialSetup";

//Importar rutas
import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';


const app = express();
createRoles();

//Guardar informacion en la variable
app.set('pkg',pkg);
//Para que express entienda los metodos json
app.use(express.json());
//Para que muestre la peticiones en consola
app.use(morgan('dev'));


app.get('/', (req,res) =>{
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);







export default app;