const express = require('express');
const fiscalYear = require('../routes/setup/fiscalYearRoutes');
const errorHandler = require('../middlewares/ErrorHandler');

module.exports = app => {
    app.use(express.json());
    app.use('/api/fiscalYear', fiscalYear);
    app.use(errorHandler);
}