const Joi = require('joi');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    docType: {
        type: String,
        minlength: 1,
        maxlength: 3,
        required: true,
        unique: true
    },
    docName: String
});

const DocumentType = mongoose.model('document_type', schema);

const validate = body => {
    const schema = Joi.object({
        docType: Joi.string().min(1).max(3),
        docName: Joi.string().required()
    })
}

exports.DocumentType = DocumentType;
exports.validate = validate;