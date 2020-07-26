const jwt = require('jsonwebtoken')
const config = require('../config/config.json')

module.exports = (req,res,next) => {
    let token = req.get('Authorization')
    // decode token
    if (token) {
        // verifies secret and checks exp
        token=token.split(' ')[1];
        console.log(token)
        jwt.verify(token, config.jwt.secret, function(err, decoded) {
            if (err) {
                return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
            }
            req.userId = decoded.userId;
            next();
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
}
