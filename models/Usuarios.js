import Conection from "../config/BBDD.js";
import {DataTypes } from "sequelize";

const Usuario = Conection.define("users",{
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },

    email:{
        type:DataTypes.STRING,
        allowNull:false
    },

    password:{
        type:DataTypes.STRING,
        allowNull:false
    },

    token: DataTypes.TEXT
    
});


export default Usuario
    