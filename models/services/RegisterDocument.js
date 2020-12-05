const Joi = require('joi');
const mongoose = require('mongoose');

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
    documentType: {
        type: new mongoose.Schema({
            docType: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 3
            },
            docName: String
        }),
        required: true
    },
    phone: {
        type: String
    },
    fiscalYear: {
        type: Number,
        required: true
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
        documentType: Joi.objectId().required(),
        phone: Joi.string(),
        fiscalYear: Joi.number().required()
    });
    return schema.validate(req);
}

exports.RegisterDocument = RegisterDocument;
exports.validate = validate;