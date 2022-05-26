import Role from '../models/Role';

export const createRoles = async ()=>{

        try {
            
            const count = await Role.estimatedDocumentCount();

            if( count > 0) return;

            //Promise.all() ejecuta todoal mismo tiempo
            const values = await Promise.all([
                new Role({name:"User"}).save(),
                new Role({name:"moderator"}).save(),
                new Role({name:"admin"}).save()
            ]);
            console.log(values);
        } catch (error) {
            console.error(error);
        }

};