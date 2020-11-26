const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
    const db = config.get('databaseConnection');
    mongoose.connect(`${db}`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`Connected to mongo through ${db} ... `))
        .catch(err => console.error('Error ', err));
    mongoose.set('useCreateIndex', true);
}