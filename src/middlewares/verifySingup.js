import {ROLES} from '../models/Role';
import User from '../models/User';

//Verifica si el usuario ya existe o si esta duplicado

export const checkDuplicated = async (req,res, next) =>{
    const user = await User.findOne({username: req.body.username})
    if (user) return res.status(400).json({message: 'The user already exits'})

    const email = await User.findOne({email: req.body.email})
    if (email) return res.status(400).json({message: 'The email already exits'})

    next()
}

//Verifica si los roles son correctos
export const checkRolesExisted = (req, res, next) => {
    if( req.body.roles)
    {
        for(let i=0; i<req.body.roles.length; i++)
        {
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({
                    message: `ROLE ${req.body.roles[i]} don't exists`
                })
            }

        }
    }

    next();
}