const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

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
        type: String,
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

schema.methods.generateToken = function () {
    const payload = {
        userName: this.userName,
        status: this.status
    }
    const token = jwt.sign(payload, config.get("jwtPrivateKey"), {
        expiresIn: 3600
    });
    return token;
}

const User = mongoose.model('User', schema);

const validate = user => {
    const schema = Joi.object({
        fullName: Joi.string().required(),
        userName: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().min(7).max(10),
        password: Joi.required(),
        status: Joi.string().length(1).required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validate;