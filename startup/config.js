const config = require('config');
// require('dotenv').config();

module.exports = () => {
    // console.log("env " + process.env.REGISTRATION_KEY_TOKEN);
    if (!config.get('jwtPrivateKey')) {
        throw new Error('Jwt Private Key not defined.');
        // console.log("ERROR : Jwt Private Key is not defined.");
        // process.exit(1);
    }
}