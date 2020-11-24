const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
    fId: {
        type: Number,
        required: true,
        unique: true
    },
    yearCode: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1
    }
});

const FiscalYear = mongoose.model('FiscalYear', schema);

const validate = fiscalYear => {
    const schema = Joi.object({
        yearCode: Joi.string().required(),
        year: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        status: Joi.string().min(1).max(1).required()
    });
    return schema.validate(fiscalYear);
}

exports.FiscalYear = FiscalYear;
exports.validate = validate;
