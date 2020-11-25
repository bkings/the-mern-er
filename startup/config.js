const config = require('config');

module.exports = () => {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('Jwt Private Key not defined.');
        // console.log("ERROR : Jwt Private Key is not defined.");
        // process.exit(1);
    }
}