const { Router } = require('express');
const ContactosController = require('../controllers/contactos.controller');
const jwtValidator = require('../middlewares/jwtValidator');
const checkFields = require('../middlewares/validateFields');
const { check } = require("express-validator");

const router = Router();

router.get('/',
    [
        check('jwt').not().isEmpty(),
        checkFields
    ],
    jwtValidator, ContactosController.getContactos);    //GET CONTACTOS


router.post('/', [
    check("name").not().isEmpty(),
    check("lastname").not().isEmpty(),
    check("email").not().isEmpty(),
    check("phone").not().isEmpty(),
    checkFields
], ContactosController.createContactos);  //POST CONTACTOS


router.put('/:id', [
    check('jwt').not().isEmpty(),
    checkFields
], jwtValidator, ContactosController.updateContacto)    //PUT CONTACTOS 


router.delete('/:id', [
    check('jwt').not().isEmpty(),
    checkFields
], jwtValidator, ContactosController.deleteContacto)    //DELETE CONTACTOS 

module.exports = router;