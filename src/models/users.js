const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    profilePicUrl: String,
});

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;