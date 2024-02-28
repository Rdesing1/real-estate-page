import Conection from "../config/BBDD.js";
import bcrypt from "bcrypt"
import { DataTypes } from "sequelize";

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
    
},{
    hooks:{
        beforeCreate: async function(usuario) {
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password,salt);
        }
    }
});


export default Usuario
    