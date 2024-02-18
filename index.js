import RouterUser  from "./routes/user.js";
import Conection from "./config/BBDD.js";
import express from "express";

let app = express()
let port = 3000

app.set('view engine','pug');
app.set('views','./views');

/* BBDD */
try {
    Conection.authenticate();
    Conection.sync();
    console.log("Se ha conectado correctamente!");
} catch (error) {
    console.log("err en la conexion a BBDD", error);
}

/* leer datos de los form */
app.use(express.urlencoded({extended:true}));

/* public */
app.use(express.static('public'));

/* Definicion de rutas */
app.use('/auth',RouterUser);

app.listen(port);

