const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        minlength: 7,
        maxlength: 10
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1
    }
});

const User = mongoose.model('User', schema);

const validate = user => {
    const schema = Joi.object({
        fullName: Joi.string().required(),
        userName: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.number().min(7).max(10),
        password: Joi.required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validate;