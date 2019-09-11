const mongoose = require('mongoose');
const Joi = require('joi');

//Model the schema
const serviceName = mongoose.model('serviceName', new mongoose.Schema({
    name: String
}));

function validateService(serviceName) {
    const serviceSchema = {
        name: Joi.string().required()
    };
    return Joi.validate(serviceName,serviceSchema);
}

exports.serviceName = serviceName;
exports.validate = validateService;