const _ = require('lodash');
const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/Authorization');
const { DocumentType, validate } = require('../../models/setup/DocumentType');

router.get('/', auth, async (req, res) => {
    const documentType = await DocumentType.find().sort('docName');
    res.status(200).send({ "documentTypes": documentType });
})

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ "error": error.details[0].message });

    const docType = await DocumentType.find({ docType: req.body.docType }).select('docType');
    if (docType.length !== 0) return res.status(400).send({ "error": "Document Type already exists." });

    const documentType = new DocumentType(_.pick(req.body, ['docType', 'docName']));
    await documentType.save();

    res.send({ "message": "Success" });
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ "error": error.details[0].message });

    const documentType = await DocumentType.findByIdAndUpdate(req.params.id, _.pick(req.body, ['docType', 'docName']));
    if (!documentType) return res.status(404).send({ "error": "Document Type not found." });

    res.send({ "message": "Success" });
});

router.delete('/:id', auth, async (req, res) => {
    const documentType = await DocumentType.findByIdAndRemove(req.params.id);
    if (!documentType) return res.status(404).send({ "error": "Document Type not found." });
    res.send({ "message": "Success" });
})

module.exports = router;