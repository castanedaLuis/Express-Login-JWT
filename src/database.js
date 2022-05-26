import mongoose from "mongoose";

//Metodo para conectar a la base de datos

mongoose.connect("mongodb://Localhost/companydb",{
    useNewUrlParser: true,
    useUnifiedTopology:true
    //useFindAndModify: true 
})
            .then(db => console.log("Database is connected"))
            .catch(error => console.log(error));