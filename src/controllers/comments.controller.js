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

  async getRatingRealstate(req, res) {
    try {
      const { realstateID } = req.params;
      const comments = await CommentsService.getCommentByRealstateID(realstateID);

      if (comments.length === 0) {
        return res.status(404).json({
          message: "No comments found for the specified real estate ID.",
        });
      }

      let sumRatings = 0;

      for (const comment of comments) {
        sumRatings += parseFloat(comment.rating);
      }
  
      const averageRating = sumRatings / comments.length;

      const promedio = averageRating.toString();
      const total = comments.length.toString();
      
      return res.status(200).json({
        promedio,
        totalComments: total,
      });

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