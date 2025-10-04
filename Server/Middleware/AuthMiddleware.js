const jwt = require('jsonwebtoken');
const secretKey  = process.env.KEY || 'development';

function AuthMiddleware(req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // check if the header starts with "Bearer " prefix
        const token = authHeader.split(' ')[1]; // split the header and get the token part
        authHeader = token;
    }
    jwt.verify(authHeader, secretKey, (error, data) => {
        if (error) {
            return res.status(400).send({ message: "invalid token" })
        }

        else {
            req.body.userID = data.id;
            next();
        }
    })
}

module.exports = AuthMiddleware;
