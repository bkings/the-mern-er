const _ = require('lodash');
const auth = require('../../middlewares/Authorization');
const express = require('express');
const router = express.Router();
const { RegisterDocument, validate } = require('../../models/services/RegisterDocument');
const { validateReqBody } = require('../../middlewares/Validation');
const { DocumentType } = require('../../models/setup/DocumentType');

router.get('/', [auth], async (req, res) => {
    const registerDocuments = await RegisterDocument.find().sort('-regNo');
    res.send({ "data": registerDocuments });
})

router.post('/', [auth, validateReqBody(validate)], async (req, res) => {
    let regNo, fy, snArr, sn;
    fy = req.body.fiscalYear;
    const documentType = await DocumentType.findById(req.body.documentType).select('docType docName');
    if (!documentType) return res.status(400).send({ "error": "Invalid document type." });
    req.body.documentType = documentType;

    snArr = await RegisterDocument.find({ fiscalYear: fy }).sort('-sn').limit(1);
    if (snArr.length === 0) {
        sn = 1;
    } else {
        sn = snArr[0].sn + 1;
    }
    if (sn < 10) {
        regNo = fy + "00000" + sn;
    } else if (sn < 100) {
        regNo = fy + "0000" + sn;
    } else if (sn < 1000) {
        regNo = fy + "000" + sn;
    } else if (sn < 10000) {
        regNo = fy + "00" + sn;
    } else if (sn < 100000) {
        regNo = fy + "0" + sn;
    } else {
        regNo = fy + sn;
    }
    req.body.regNo = regNo;
    req.body.sn = sn;
    const registerDocument = new RegisterDocument(_.pick(req.body, ['regNo', 'firstName', 'middleName', 'lastName', 'dateOfBirth', 'enterDate', 'phone', 'sn', 'documentType', 'fiscalYear']));
    await registerDocument.save();
    res.send({ "message": "Success" });
});

module.exports = router;