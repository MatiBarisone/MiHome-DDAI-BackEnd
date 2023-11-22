const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    rating: String,
    comment: String,
    userName: String,
    userPicture: String,
    userID: String,
    realstateID: String,
});

const Comments = mongoose.model('Comments', CommentsSchema);

module.exports = Comments;