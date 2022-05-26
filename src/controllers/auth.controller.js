import User from '../models/User'
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';


export const signUp = async (req, res) =>{
    
    //Recogemos los datos enviados
    const {username, email, password, roles} = req.body;
    console.log(req.body);
    
    //Creamos un usuario nuevo con contraseña cifrada
    const newUser = new User({
        username,
        email,
        password: password//User.encryptPassword(password)
    })

    //comprobando si nos manda roles.
    if(roles){
        const foundRoles = await Role.find({name:{$in:roles}})
        newUser.roles = foundRoles.map(role => role._id);
    }else{
        const role = await Role.findOne({name:"User"})
        newUser.roles = [role._id];
    }

    //Guardamos el Usuario
    const saveUser = await newUser.save();
    console.log(newUser);

    //Token
    const token = jwt.sign({id: saveUser._id},config.SECRET,{
        expiresIn:86400 //24 HORAS (segundos)
    })
    
    res.status(200).json({token});
}


export const signin = async (req, res) =>{

    const userFound = await User.findOne({email: req.body.email}).populate("roles");

    if( !userFound ) return res.status(400).json({message: "User not Found"});

    //const matchPassword = await User.comparePassword(req.body.password, userFound.password)
    const matchPassword = await User.password;

    if(matchPassword == req.body.password) return res.status(400).json({token: null, message:'Invalid password'})   

    console.log(userFound);

    const token = jwt.sign({id: userFound._id},config.SECRET,{
        expiresIn:86400
    })

    res.json({token});



}

