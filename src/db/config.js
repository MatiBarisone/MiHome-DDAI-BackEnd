const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () =>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('Date Base online :)');
    }
    catch(err){
        console.error(err);
        throw new Error ('Error en la conexión de la Base de Datos');
    }
}

module.exports = {dbConnection};