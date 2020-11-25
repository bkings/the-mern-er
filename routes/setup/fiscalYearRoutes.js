const express = require('express');
const router = express.Router();
const { FiscalYear, validate } = require('../../models/setup/FiscalYear');
const auth = require('../../middlewares/Authorization');

router.get("/", async (req, res) => {
    const allFiscalYear = await FiscalYear.find();
    res.send(allFiscalYear);
});

router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ "error": error.details[0].message });

    let nextId = await FiscalYear.find().sort('-fId').limit(1);
    let nextFyId;
    if (!nextId || nextId.length == 0) {
        nextFyId = 1;
    } else {
        nextFyId = nextId[0].fId + 1;
    }
    let fiscalYear = new FiscalYear({
        fId: nextFyId,
        yearCode: req.body.yearCode,
        year: req.body.year,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status
    })

    await fiscalYear.save();
    return res.status(200).send({ "message": "Success" });
});

router.put("/:id", async (req, res) => {
    await FiscalYear.updateOne({ fId: req.params.id }, {
        $set: {
            yearCode: req.body.yearCode,
            year: req.body.year,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status
        }
    });
    res.status(200).send({ "message": "Success" });
});

router.delete("/:id", async (req, res) => {
    await FiscalYear.deleteOne({ fId: req.params.id });
    res.status(200).send({ "message": "Success" });
});

module.exports = router;