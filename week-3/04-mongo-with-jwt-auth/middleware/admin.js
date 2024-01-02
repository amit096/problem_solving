const jwt = require('jsonwebtoken');
const jwtPassword = "123456";

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    
    const { headers } = req;

    // Check if the expected headers are present
    if (!headers.authorization) {
        return res.status(401).json({ error: 'Unauthorized - Missing credentials in headers' });
    }
    
    const token = headers.authorization.split(' ')[1];


    // Validate admin credentials
    const isAdminValid = jwt.verify(token, jwtPassword);

    // If admin credentials are not valid, send an unauthorized response
    if (!isAdminValid) {
        return res.status(401).json({ error: 'Unauthorized - Invalid admin credentials' });
    }

    // Admin is valid, proceed to the next middleware or route handler
    next();
}

module.exports = adminMiddleware;