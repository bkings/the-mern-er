const express = require('express');
const fiscalYear = require('../routes/setup/fiscalYearRoutes');
const user = require('../routes/utility/userRoutes');
const authentication = require('../routes/authentication/authentication');
const errorHandler = require('../middlewares/ErrorHandler');

module.exports = app => {
    app.use(express.json());
    app.use('/api/fiscalYear', fiscalYear);
    app.use('/api/users', user);
    app.use('/api/authenticate', authentication);
    app.use(errorHandler);
}