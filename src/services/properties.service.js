const PropertiesModel = require('../models/properties');
require("dotenv").config();
const axios = require('axios');

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

    async getPropertiesByIds(ids) {
        try {
            const properties = await PropertiesModel.find({ _id: { $in: ids } });
            return properties;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getPropertiesByIds Service");
        }
    }

    //===== Location =====

    async geocodeAddress(address, number, location, province, country) {
        try {
            const fullAddress = `${address} ${number}, ${location}, ${province}, ${country}`;

            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: fullAddress,
                    key: 'AIzaSyDe30EsBSyW4SeNUMnIyHSiSCKBp_ZMhbc',
                },
            });

            // Verifica si la respuesta contiene resultados y tiene la estructura esperada
            if (response.data.results && response.data.results.length > 0 && response.data.results[0].geometry) {
                const locationData = response.data.results[0].geometry.location;
                return { latitude: locationData.lat, longitude: locationData.lng };
            } else {
                console.warn('No se encontró información de ubicación para la dirección proporcionada:', fullAddress);
                return null;
            }
        } catch (error) {
            console.error('Error geocoding address:', error.message);
            throw new Error('Error in geocodeAddress');
        }
    }

    async getPropertiesNearLocation(userLatitude, userLongitude) {
        try {
            const allProperties = await PropertiesModel.find();

            const propertiesWithDistance = await Promise.all(
                allProperties.map(async (property) => {
                    const location = await this.geocodeAddress(
                        property.propertyAddress,
                        property.propertyNumber,
                        property.propertyLocation,
                        property.propertyProvince,
                        property.propertyCountry
                    );

                    if (location) {
                        const { latitude, longitude } = location;
                        const distance = await this.calculateDistance(userLatitude, userLongitude, latitude, longitude);

                        return { property, distance };
                    } else {
                        console.warn(`La propiedad ${property.propertyAddress} ${property.propertyNumber} no tiene información de ubicación.`);
                        return null;
                    }
                })
            );

            // Filtra las propiedades que no tienen información de ubicación
            const validPropertiesWithDistance = propertiesWithDistance.filter((item) => item !== null);

            if (validPropertiesWithDistance.length === 0) {
                console.warn('No hay propiedades con información de ubicación.');
                return [];
            }

            validPropertiesWithDistance.sort((a, b) => a.distance - b.distance);

            const filteredProperties = validPropertiesWithDistance.filter((item) => item.distance < 100);   //manejo de distancia en este caso son 100 kilómetros

            if (filteredProperties.length === 0) {
                console.warn('No hay propiedades a más de 100 unidades de distancia.');
                return [];
            }
            const properties = filteredProperties.map((item) => item.property);

            return properties;
        } catch (err) {
            console.error(err);
            throw new Error('Error in getPropertiesNearLocation Service');
        }
    }

    async calculateDistance(lat1, lon1, lat2, lon2) {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
                params: {
                    origins: `${lat1},${lon1}`,
                    destinations: `${lat2},${lon2}`,
                    key: 'AIzaSyDe30EsBSyW4SeNUMnIyHSiSCKBp_ZMhbc', // Reemplaza con tu propia clave de API de Google
                },
            });

            const distanceMatrix = response.data;

            // Verifica si la respuesta contiene resultados y tiene la estructura esperada
            if (
                distanceMatrix.rows &&
                distanceMatrix.rows.length > 0 &&
                distanceMatrix.rows[0].elements &&
                distanceMatrix.rows[0].elements.length > 0 &&
                distanceMatrix.rows[0].elements[0].distance
            ) {
                return distanceMatrix.rows[0].elements[0].distance.value / 1000; // La distancia se obtiene en metros, la convertimos a kilómetros
            } else {
                console.warn('No se pudo obtener la distancia de la matriz de distancia.');
                return null;
            }
        } catch (error) {
            console.error('Error al calcular la distancia:', error.message);
            throw new Error('Error in calculateDistance');
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