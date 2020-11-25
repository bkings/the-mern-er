const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { User, validate } = require('../../models/utility/User');

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ "error": error.details[0].message });

    let user = await User
        .findOne()
        .or([{ userName: req.body.userName }, { email: req.body.email }]);
    if (user) return res.status(400).send({ "error": "Username or email exists." });

    user = new User(_.pick(req.body, ['fullName', 'userName', 'email', 'phone', 'password', 'status']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.status(200).send({ "message": "Success" });
});

module.exports = router;