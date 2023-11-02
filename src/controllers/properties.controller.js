let instance = null;
require('dotenv').config();
const PropertyService = require("../services/properties.service");

class PropertyController {

    static getInstance() {
        if (!instance) {
            return new PropertyController();
        }
        return instance;
    }

    async getProperties(req, res) {
        try {
            const property = await PropertyService.getProperties();
            return res.status(200).json(property);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "getProperties",
                message: err,
            });
        }
    }

    async getPropertiesOfRealstate(req, res) {
        try {
            const { idRealstate } = req.params;
            let properties = await PropertyService.getPropertiesOfRealstate(idRealstate);
            return res.status(200).json(properties);
        } catch (err) {
            console.error(err);
            throw new Error("Error in getPropertiesOfRealstate Service");
        }
    }

    //===== Location - TODO =====
    async getPropertiesNearLocation(req, res) {
        try {
            const property = await PropertyService.getPropertiesNearLocation();
            return res.status(200).json(property);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "getgetPropertiesNearLocation",
                message: err,
            });
        }
    }
    //===========================

    async createProperty(req, res) {
        try {
            let newProperty = await PropertyService.createProperty(req.body);

            return res.status(201).json({
                message: "Created!",
                user: newProperty,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "createProperty",
                message: err.message,
            });
        }
    }

    async updateProperty(req, res) {
        try {
            let property = await PropertyService.getPropertyById(req.params.id);
            if (!property) {
                return res
                    .status(404)
                    .json({ method: "updateProperty", message: "Not Found" });
            }

            //Find the properties for one Real-State
            const realStateID = req.body.realStateID;

            //General Details
            const propertyName = req.body.propertyName;
            const propertyImages = req.body.propertyImages;
            const propertyVideos = req.body.propertyVideos;
            const propertyDescription = req.body.propertyDescription;
            const propertyType = req.body.propertyType;
            const propertyState = req.body.propertyState;

            //Location Details
            const propertyAddress = req.body.propertyAddress;
            const propertyNumber = req.body.propertyNumber;
            const propertyFloor = req.body.propertyFloor;
            const propertyNBHD = req.body.propertyNBHD;
            const propertyLocation = req.body.propertyLocation;
            const propertyProvince = req.body.propertyProvince;
            const propertyCountry = req.body.propertyCountry;

            //Price Detail
            const propertyPriceRent = req.body.propertyPriceRent;
            const propertyExpenses = req.body.propertyExpenses;
            const propertyPriceSale = req.body.propertyPriceSale;
            const isDolar = req.body.isDolar;

            //Property Details
            const propertyEnvironment = req.body.propertyEnvironment;
            const propertyRooms = req.body.propertyRooms;
            const propertyBathrooms = req.body.propertyBathrooms;
            const propertyBalcony = req.body.propertyBalcony;
            const propertyGarage = req.body.propertyGarage;
            const hasStorage = req.body.hasStorage;
            const hasTerrace = req.body.hasTerrace;

            //M2 and orientation Details
            const propertyTotalM2 = req.body.propertyTotalM2;
            const propertyCoveredM2 = req.body.propertyCoveredM2;
            const propertySemiCoveredM2 = req.body.propertySemiCoveredM2;
            const propertyUncoveredM2 = req.body.propertyUncoveredM2;
            const propertyAntiquity = req.body.propertyAntiquity;
            const propertyOrientation = req.body.propertyOrientation;
            const isFront = req.body.isFront;

            //Amenities Details
            const amenities = req.body.amenities;

            const modifiedProduct = await PropertyService.updateProperty(
                req.params.id,
                {
                    //Find the properties for one Real-State
                    realStateID,

                    //General Details
                    propertyName,
                    propertyImages,
                    propertyVideos,
                    propertyDescription,
                    propertyType,
                    propertyState,

                    //Location Details
                    propertyAddress,
                    propertyNumber,
                    propertyFloor,
                    propertyNBHD,
                    propertyLocation,
                    propertyProvince,
                    propertyCountry,

                    //Price Detail
                    propertyPriceRent,
                    propertyExpenses,
                    propertyPriceSale,
                    isDolar,

                    //Property Details
                    propertyEnvironment,
                    propertyRooms,
                    propertyBathrooms,
                    propertyBalcony,
                    propertyGarage,
                    hasStorage,
                    hasTerrace,

                    //M2 and orientation Details
                    propertyTotalM2,
                    propertyCoveredM2,
                    propertySemiCoveredM2,
                    propertyUncoveredM2,
                    propertyAntiquity,
                    propertyOrientation,
                    isFront,

                    //Amenities Details
                    amenities,
                }
            );

            return res.status(200).json(modifiedProduct);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "updateProperty",
                message: err,
            });
        }
    }

    async deleteProperty(req, res) {
        try {
            let isProperty = await PropertyService.getPropertyById(req.params.id);
            if (isProperty) {
                await PropertyService.deleteProperty(req.params.id);
                return res.status(204).json({ message: "No Content" });
            }
            return res.status(404).json({ message: "Not Found" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "deleteProperty",
                message: err,
            });
        }
    }



}

module.exports = PropertyController.getInstance();