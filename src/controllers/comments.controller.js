let instance = null;
require('dotenv').config();
const CommentsService = require("../services/comments.service");

class CommentsController {

  static getInstance() {
    if (!instance) {
      return new CommentsController();
    }
    return instance;
  }

  async getComments(req, res) {
    try {
      const comments = await CommentsService.getComments();
      return res.status(200).json(comments);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getComments",
        message: err,
      });
    }
  }

  async getTopComments(req, res) {
    try {
      const comments = await CommentsService.getComments();
      const topComments = comments.slice(comments.length - 3);
      return res.status(200).json(topComments);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getComments",
        message: err,
      });
    }
  }

  async getCommentsOfRealstate(req, res) {
    try {
      const { realstateID } = req.params;
      const comments = await CommentsService.getCommentByRealstateID(realstateID);
      return res.status(200).json(comments);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getCommentByRealstateID",
        message: err,
      });
    }
  }

  async createComment(req, res) {
    try {
      let newComment = await CommentsService.createComment(req.body);

      return res.status(201).json({
        message: "Created!",
        user: newComment,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "createComment",
        message: err.message,
      });
    }
  }


}

module.exports = CommentsController.getInstance();