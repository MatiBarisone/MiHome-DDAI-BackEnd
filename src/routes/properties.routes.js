const { Router } = require("express");
const { check } = require("express-validator");
const PropertiesController = require("../controllers/properties.controller");

const router = Router();

router.get("/", PropertiesController.getProperties);        //GET PROPERTIES


router.get(                                                 //GET PROPERTIES
    "/ofRealstate/:idRealstate",PropertiesController.getPropertiesOfRealstate
);

router.get('/byIds', PropertiesController.getPropertiesByIds);

//===== Location - TODO =====
router.get(
    '/nearUser', PropertiesController.getPropertiesNearLocation
);
//===========================

router.post(                                                //POST PROPERTIES
    "/",
    [
        //General Details
        check("realStateID").not().isEmpty(),
        check("propertyName").not().isEmpty(),
        check("propertyDescription").not().isEmpty(),
        check("propertyType").not().isEmpty(),
        check("propertyState").not().isEmpty(),

        //Location Details
        check("propertyAddress").not().isEmpty(),
        check("propertyNumber").not().isEmpty(),
        check("propertyFloor").not().isEmpty(),
        check("propertyNBHD").not().isEmpty(),
        check("propertyLocation").not().isEmpty(),
        check("propertyProvince").not().isEmpty(),
        check("propertyCountry").not().isEmpty(),

    ],
    PropertiesController.createProperty
);

//===========================  NOTE  ====================================
//  The Real-State has to be "Logged In" in the app to have permision to 
//  EDIT or DELETE their user info, that's why we need the tokken!
//=======================================================================

router.put('/:id', PropertiesController.updateProperty)               //PUT PROPERTIES 

router.delete('/:id', PropertiesController.deleteProperty)               //DELETE USERS

module.exports = router;
