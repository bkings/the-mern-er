const _ = require('lodash');
const auth = require('../../middlewares/Authorization');
const express = require('express');
const router = express.Router();
const { RegisterDocument, validate } = require('../../models/services/RegisterDocument');
const { FiscalYear } = require('../../models/setup/FiscalYear');
const { validateReqBody } = require('../../middlewares/Validation');

router.post('/', [auth, validateReqBody(validate)], async (req, res) => {
    let regNo, fy, snArr, sn;
    fy = (await FiscalYear.findOne({ status: 'Y' }).select('yearCode')).yearCode;
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
    const registerDocument = new RegisterDocument(_.pick(req.body, ['regNo', 'firstName', 'middleName', 'lastName', 'dateOfBirth', 'enterDate', 'phone','sn']));
    await registerDocument.save();
    res.send({ "message": "Success" });
});

module.exports = router;