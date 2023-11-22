const { Router } = require("express");
const { check } = require("express-validator");
const CommentsController = require("../controllers/comments.controller");
const checkFields = require("../middlewares/validateFields");

const router = Router();

router.get("/", CommentsController.getComments);                                //GET COMMENTS

router.get("/topCommments/", CommentsController.getTopComments);                   //GET TOP 3 COMMENTS

router.get("/:realstateID", CommentsController.getCommentsOfRealstate);         //GET COMMENTS OF REALSTATE

router.post(                                                                    //POST COMMENTS
  "/",
  [
    check("rating").not().isEmpty(),
    check("comment").not().isEmpty(),
    check("userName").not().isEmpty(),
    check("userPicture").not().isEmpty(),
    check("userID").not().isEmpty(),
    check("realstateID").not().isEmpty(),
    checkFields,
  ],
  CommentsController.createComment
);

module.exports = router;
