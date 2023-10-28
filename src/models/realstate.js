const mongoose = require('mongoose');

const RealStateSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profilePicUrl: String,
});

const RealState = mongoose.model('RealState', RealStateSchema);

module.exports = RealState;