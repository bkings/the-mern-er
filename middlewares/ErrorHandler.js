module.exports = (err,req,res,next) => {
    console.log('err ' + err);
    res.status(500).send('Server error detected.');
}