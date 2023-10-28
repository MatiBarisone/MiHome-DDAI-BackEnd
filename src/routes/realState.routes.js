const { Router } = require("express");
const { check } = require("express-validator");
const RealStateController = require("../controllers/realState.controller");
const checkFields = require("../middlewares/validateFields");
const jwtValidator = require('../middlewares/jwtValidator');

const router = Router();

router.get("/", RealStateController.getRealStates);         //GET REALSTATES

router.get("/realstate", RealStateController.getRealState); //GET REALSTATE

router.post(                                                //POST REALSTATE
  "/",
  [
    check("name").not().isEmpty(),
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
  ],
  RealStateController.createRealState
);

router.post(                                                //LOGIN REALSTATE
  "/login",
  [
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    checkFields,
  ],
  RealStateController.login
);

//===========================  NOTE  ====================================
//  The Real-State has to be "Logged In" in the app to have permision to 
//  EDIT or DELETE their user info, that's why we need the tokken!
//=======================================================================

router.put('/:id', [
  check('jwt').not().isEmpty(),
  checkFields
], jwtValidator, RealStateController.updateRealState)               //PUT REALSTATE 


router.delete('/:id', [
  check('jwt').not().isEmpty(),
  checkFields
], jwtValidator, RealStateController.deleteRealState)               //DELETE REALSTATE

module.exports = router;
