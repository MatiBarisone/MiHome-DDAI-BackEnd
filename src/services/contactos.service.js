const ContactosModel = require("../models/contactos");

class ContactosService {
    async getContactos() {
        try {
            const contacto = await ContactosModel.find();
            return contacto;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getContactos Service");
        }
    }

    async isContactoRegistered(name, lastname, email, phone) {
        try {
            let contactoName = await ContactosModel.exists({ name });
            let contactoLastname = await ContactosModel.exists({ lastname });
            let contactoEmail = await ContactosModel.exists({ email });
            let contactoPhone = await ContactosModel.exists({ phone });
            if (contactoName && contactoLastname && contactoEmail && contactoPhone) {
                return true;
            }
            return false;
        } catch (err) {
            console.error(err);
            throw new Error("Error in isContactoRegistered Service");
        }
    }

    async getContactoById(id) {
        try {
            let contacto = await ContactosModel.findOne({ _id: id });
            return contacto;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getContactoById Service");
        }
    }

    async createContacto(contacto) {
        try {
            let savedContacto = await ContactosModel.create(contacto);
            return savedContacto;
        } catch (err) {
            console.error(err);
            throw new Error("Error in createContacto Service", err);
        }
    }

    async updateContacto(id, fields) {
        try {
            const contacto = await ContactosModel.findOneAndUpdate({ _id: id }, fields);
            return contacto;
        } catch (err) {
            console.error(err);
            throw new Error("Error in updateContacto Service");
        }
    }

    async deleteContacto(id) {
        try {
            await ContactosModel.findOneAndDelete({ _id: id });
        } catch (err) {
            console.error(err);
            throw new Error("Error in delete Service");
        }
    }
}

module.exports = new ContactosService();
