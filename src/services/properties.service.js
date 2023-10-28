const PropertiesModel = require('../models/properties');
require("dotenv").config();

class PropertiesService {

    async getProperties() {
        try {
            const properties = await PropertiesModel.find();
            return properties;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getProperties Service");
        }
    }

    async getPropertiesOfRealstate(id) {
        try {
            let properties = await PropertiesModel.find({ realStateID: id });
            return properties;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getPropertiesOfRealstate Service");
        }
    }

    //===== Location - TODO =====
    async getPropertiesNearLocation(location) {
        try {
            let properties = await PropertiesModel.findOne({ email: location });
            return properties;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getPropertiesNearLocation Service");
        }
    }
    //===========================

    async createProperty(property) {
        try {
            let isPropertyRegistered = await PropertiesModel.findOne({ Name: property.propertyName, Address: property.propertyAddress, Number: property.propertyNumber });
            if (isPropertyRegistered) {
                throw new Error("Property already registered");
            }
            else {
                await PropertiesModel.create(property);
                return property;
            }
        } catch (err) {
            console.error(err);
            throw new Error("Error in createRealState Service");
        }
    }

    async getPropertyById(id) {
        try {
            let property = await PropertiesModel.findOne({ _id: id });
            return property;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getPropertyById Service");
        }
    }

    async updateProperty(id, fields) {
        try {
            const property = await PropertiesModel.findOneAndUpdate({ _id: id }, fields);
            return property;
        } catch (err) {
            console.error(err);
            throw new Error("Error in updateProperty Service");
        }
    }

    async deleteProperty(id) {
        try {
            await PropertiesModel.findOneAndDelete({ _id: id });
        } catch (err) {
            console.error(err);
            throw new Error("Error in delete Service");
        }
    }


}

module.exports = new PropertiesService();