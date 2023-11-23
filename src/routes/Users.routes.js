const { Router } = require("express");
const { check } = require("express-validator");
const UsersController = require("../controllers/users.controller");
const checkFields = require("../middlewares/validateFields");
const jwtValidator = require('../middlewares/jwtValidator');

const router = Router();

router.get("/", UsersController.getUsers);                  //GET USERS

router.get("/user/:email", UsersController.getUser);               //GET USER

router.post(                                                //POST USERS
  "/",
  [
    check("name").not().isEmpty(),
    check("lastname").not().isEmpty(),
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    check("profilePicUrl").not().isEmpty(),
    checkFields,
  ],
  UsersController.createUser
);

router.post(                                                //LOGIN USERS
  "/login",
  [
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    checkFields,
  ],
  UsersController.login
);

//===========================  NOTE  =================================
//  The User has to be "Logged In" in the app to have permision to 
//  EDIT or DELETE their user info, that's why we need the tokken!
//====================================================================

router.put('/:id', UsersController.updateUsers)               //PUT USERS 


router.delete('/:id', [
  check('jwt').not().isEmpty(),
  checkFields
], jwtValidator, UsersController.deleteUsers)               //DELETE USERS

module.exports = router;
