import { check, validationResult } from "express-validator";
import { NewToken } from "../../helpers/token.js";
import Usuario from "../../models/Usuarios.js";
import { where } from "sequelize";


function ForlumarioLogin(req,res){
    res.render('auth/login.pug',{
        namePage:'Login'
    });
}

function FormularioRegistro(req,res){
    res.render('auth/register.pug',{
        namePage:'Registro'
    });
}

async function RegistrarUsuario(req,res){
   
    await check('nombre').notEmpty().withMessage("El campo nombre no debe estar vacio.").run(req);
    await check('email').isEmail().withMessage("El 'emai' no es valido.").isEmail().run(req);
    await check('password').isLength({ min: 6 }).withMessage("el password debe tener 6 caracteres").run(req);
    await check('repeatpassword').equals(req.body.password).withMessage("Las contraseñas deben coincidir").run(req);


    let resultValidation = await validationResult(req);

    if(resultValidation.isEmpty() == false){
        res.render('auth/register.pug',{
            namePage:'Registro',
            usuario:{
                nombre:req.body.nombre,
                    email:req.body.email,
                },
        
                listError: resultValidation.array()
            });
            
    }

    const existeUsuario = await Usuario.findOne({
        where:{
            email:req.body.email
        }
    });

    if(existeUsuario){
       return res.render('auth/register.pug',{
            namePage:'Registro',
            usuario:{
                nombre:req.body.nombre,
                    email:req.body.email,
                },
        
                listError: [{msg:"El usuario ya se encuentra registrado."}]
        });
            
    }

    const usuario = await Usuario.create({
        nombre:req.body.nombre,
        email:req.body.email,
        password:req.body.password,
        token:NewToken()
    });
    
}   



function OlvidePassword(req,res){
    res.render('auth/OlvidePassword.pug',{
        namePage:'Haz olvidado tu contraseña?'
    });
}

export{
    RegistrarUsuario, 
    ForlumarioLogin,
    FormularioRegistro,
    OlvidePassword
}