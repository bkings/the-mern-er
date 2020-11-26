const Joi = require('joi');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    regNo: {
        type: Number,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
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
        type: String,
        minlength: 1,
        maxlength: 3,
        required: true
    },
    phone: {
        type: String
    }
});

const RegisterDocument = mongoose.model('Register Document', schema);

const validate = (req) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        middleName: Joi.string(),
        lastName: Joi.string().required(),
        dateOfBirth: Joi.string().required(),
        enterDate: Joi.string().required(),
        documentType: Joi.string().min(1).max(3).required(),
        phone: Joi.string()
    });
    return schema.validate(req);
}

exports.RegisterDocument = RegisterDocument;
exports.validate = validate;