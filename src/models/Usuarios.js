const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema ({
    name:String,
    lastname:String,
    email:String,
    password:String,
});

const Usuarios = mongoose.model('Usuarios', UsuariosSchema);

module.exports = Usuarios;