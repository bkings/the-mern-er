const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
    mongoose.connect(`${config.get('databaseConnection')}`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to mongo ... '))
        .catch(err => console.error('Error ', err));
    mongoose.set('useCreateIndex', true);
}