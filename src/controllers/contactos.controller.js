const ContactosService = require("../services/contactos.service");
let instance = null;

class ContactosController {
    static getInstance() {
        if (!instance) {
            return new ContactosController();
        }
        return instance;
    }

    async getContactos(req, res) {
        try {
            const contactos = await ContactosService.getContactos();
            return res.status(200).json(contactos);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "getContactos",
                message: err,
            });
        }
    }

    async createContactos(req, res) {
        try {
            const contacto = req.body;
            contacto.state = false;
            
            let isRegistered = await ContactosService.isContactoRegistered(
                contacto.name,
                contacto.lastname,
                contacto.email,
                contacto.phone
            );
            if (!isRegistered) {
                let newContacto = await ContactosService.createContacto(contacto);

                return res.status(201).json({
                    message: "Created!",
                    product: newContacto,
                });
            }
            return res.status(400).json({
                message: "The person is already registered",
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "createProduct",
                message: err.message,
            });
        }
    }

    async updateContacto(req, res) {
        try {
            let contacto = await ContactosService.getContactoById(req.params.id);
            if (!contacto) {
                return res
                    .status(404)
                    .json({ method: "updateProduct", message: "Not Found" });
            }
            
            const state = true;
            const modifiedProduct = await ContactosService.updateContacto(
                req.params.id,
                {state}
            );
            return res.status(200).json(modifiedProduct);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "updateProduct",
                message: err,
            });
        }
    }

    async deleteContacto(req, res) {
        try {
            let isContacto = await ContactosService.getContactoById(req.params.id);
            if (isContacto) {
                await ContactosService.deleteContacto(req.params.id);
                return res.status(204).json({ message: "No Content" });
            }
            return res.status(404).json({ message: "Not Found" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "deleteProduct",
                message: err,
            });
        }
    }
}

module.exports = new ContactosController();