const mongoose = require('mongoose');

const PropertiesSchema = new mongoose.Schema({
    //Find the properties for one Real-State
    realStateID: String,

    //General Details
    propertyName: String,
    propertyImages: [String],
    propertyVideos: [String],
    propertyDescription: String,
    propertyType: String,
    propertyState: String,

    //Location Details
    propertyAddress: String,
    propertyNumber: String,
    propertyFloor: String,
    propertyNBHD: String,
    propertyLocation: String,
    propertyProvince: String,
    propertyCountry: String,

    //Price Detail                      //====================================
    propertyPriceRent: String,          //  If this is a Sales, the Rent and the Expenses 
    propertyExpenses: String,           //  are 0 or Null. Same goes on line 20.       
    propertyPriceSale: String,          //====================================
    isDolar: Boolean,

    //Property Details
    propertyEnvironment: String,
    propertyRooms: String,
    propertyBathrooms: String,
    propertyBalcony: String,
    propertyGarage: String,
    hasStorage: Boolean,
    hasTerrace: Boolean,

    //M2 and orientation Details
    propertyTotalM2: String,
    propertyCoveredM2: String,
    propertySemiCoveredM2: String,
    propertyUncoveredM2: String,
    propertyAntiquity: String,
    propertyOrientation: String,
    isFront: Boolean,

    //Amenities Details
    amenities: [String],
});

const Properties = mongoose.model('Properties', PropertiesSchema);

module.exports = Properties;