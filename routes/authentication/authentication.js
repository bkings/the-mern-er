const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../../models/utility/User');
const router = express.Router();

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ "error": error.details[0].message });

    const user = await User.findOne().or([{ userName: req.body.userName }, { email: req.body.userName }]);
    if (!user) return res.status(400).send({ "error": "Invalid username or password." });

    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if (!validPwd) return res.status(400).send({ "error": "Invalid username or password." });

    const token = user.generateToken();
    res.status(200).send({ "message": "Login Success.", "token": token });

});

const validate = body => {
    const schema = Joi.object({
        userName: Joi.string().required(),
        password: Joi.required()
    });
    return schema.validate(body);
}

module.exports = router;