const mongoose = require('mongoose');
const {Schema} = mongoose;

const ContactosSchema = new Schema ({
    name:String,
    lastname:String,
    email:String,
    phone:String,
    state:String,                  // Estado me permite verificar si confirmo o no confirmo el email -- VER DESP PARA MAIL
});

const Contactos = mongoose.model('Contactos',ContactosSchema);

module.exports = Contactos;