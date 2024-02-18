
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({path: ".env"});

const Conection = new Sequelize(process.env.NAMEBBDD,
                                process.env.USERBBDD,
                                process.env.PASSWORDBBDD ?? "",
                                {
    host:"localhost",
    dialect:'mysql', 
    port:3306,
    define:{
        timestamps:true
    },

    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});

export default Conection