const Joi = require('joi');
const mongoose = require('mongoose');
const { DocumentType } = require('../../models/setup/DocumentType');

const schema = new mongoose.Schema({
    regNo: {
        type: Number,
        unique: true,
        required: true
    },
    sn: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: String,
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    enterDate: {
        type: Date,
        required: true
    },
    // documentType: DocumentType,
    phone: {
        type: String
    },
    fiscalYear: {

    }
});

const RegisterDocument = mongoose.model('register_document', schema);

const validate = (req) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        middleName: Joi.string(),
        lastName: Joi.string().required(),
        dateOfBirth: Joi.string().required(),
        enterDate: Joi.string().required(),
        // documentType: Joi.objectId().required(),
        phone: Joi.string()
    });
    return schema.validate(req);
}

exports.RegisterDocument = RegisterDocument;
exports.validate = validate;