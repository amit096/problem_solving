const jwt = require('jsonwebtoken');
const jwtPassword = "123456";

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const { authorization } = req.headers;

    // Check if the user exists and credentials are valid
    const token = authorization.split(' ')[1];
    const user = jwt.verify(token,jwtPassword);

    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user=user;
    next();
}

module.exports = userMiddleware;