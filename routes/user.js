import {RegistrarUsuario,ForlumarioLogin,FormularioRegistro,OlvidePassword} from "../controllers/users/UsersControllers.js";

import express from "express"
const Router = express.Router()

/* Definicion de rutas */
Router.get('/login',ForlumarioLogin);
Router.get('/register',FormularioRegistro);
Router.get('/password',OlvidePassword)

/* POST */
Router.post('/register',RegistrarUsuario);

Router.get('/nosotros',(req,res)=>{
    res.json({
        message:"acerca de nosotros."
    });
});

export default Router 
 