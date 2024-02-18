import { check, validationResult } from "express-validator";
import Usuario from "../../models/Usuarios.js";


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
        return res.render('auth/register.pug',{
            namePage:'Registro',
            usuario:{
                nombre:req.body.nombre,
                email:req.body.email,
            },

            listError: resultValidation.array()
        });

    }else{
        validarEmailUsuario(req,res);
        const usuario = await Usuario.create({
            nombre:req.body.nombre,
            email:req.body.email,
            password:req.body.password
    
        });
        
    }
    


   
}

let validarEmailUsuario = async (req,res)=>{
    let {email} = req.body;
    let result = await Usuario.findOne({email: email});

    if(result){
        return res.render('auth/register.pug',{
            namePage:'Registro',
            usuario:{
                nombre:req.body.nombre,
                email:req.body.email,
            },

            listError: [
                {msg:"El usuario ya existe"}
            ]
        });
    }

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