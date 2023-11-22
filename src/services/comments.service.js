const CommentsModel = require('../models/comments');
require("dotenv").config();

class CommentsService {

    async getComments() {
        try {
            const comments = await CommentsModel.find();
            return comments;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getComments Service");
        }
    }

    async getCommentByRealstateID(realstateID) {
        try {
          let comments = await CommentsModel.find({ realstateID }); //find everyone
          return comments;
        } catch (err) {
          console.error(err);
          throw new Error("Error in getCommentByRealstateID Service");
        }
      }

    async createComment(comment) {
        try {
            await CommentsModel.create(comment);
            return comment;
        } catch (err) {
            console.error(err);
            throw new Error("Error in createComment Service");
        }
    }

}

module.exports = new CommentsService();