const path = require('path');
const express = require('express');
const fiscalYear = require('../routes/setup/fiscalYearRoutes');
const user = require('../routes/utility/userRoutes');
const authentication = require('../routes/authentication/authentication');
const documentType = require('../routes/setup/documentTypeRoutes');
const registerDocument = require('../routes/services/RegisterDocumentRoutes');
const errorHandler = require('../middlewares/ErrorHandler');
const cors = require('../middlewares/Cors-config');

module.exports = app => {
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.json());
    app.use(cors);
    app.use('/api/fiscalYear', fiscalYear);
    app.use('/api/documentType', documentType);
    app.use('/api/registerDocument', registerDocument);
    app.use('/api/users', user);
    app.use('/api/authenticate', authentication);
    app.use(errorHandler);
}