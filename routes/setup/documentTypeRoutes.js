const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/Authorization');
const { DocumentType, validate } = require('../../models/setup/DocumentType');

router.get('/', async (req, res) => {
    const documentType = await DocumentType.find().sort('docName');
    res.status(200).send({ "documentTypes": documentType });
})

router.post('/', auth, async (req, res) => {
    res.send();
})

module.exports = router;