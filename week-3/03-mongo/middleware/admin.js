const { Admin } = require('../db/index');


async function userExists(username, password) {
    // should check in the database
    const user = await Admin.findOne({ username });

    if (user && user.password === password) {
        return true;
    }
    return false;
}

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin 
    // from the admin DB. Check readme for the exact headers to be expected

    const { headers } = req;

    // Check if the expected headers are present
    if (!headers.username || !headers.password) {
        return res.status(401).json({ error: 'Unauthorized - Missing credentials in headers' });
    }

    // Validate admin credentials
    const isAdminValid = userExists(headers.username, headers.password);

    // If admin credentials are not valid, send an unauthorized response
    if (!isAdminValid) {
        return res.status(401).json({ error: 'Unauthorized - Invalid admin credentials' });
    }

    // Admin is valid, proceed to the next middleware or route handler
    next();
}

module.exports = adminMiddleware;
