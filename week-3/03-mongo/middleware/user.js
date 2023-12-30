const { User } = require('../db/index');

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const { username, password } = req.headers;

    // Check if the user exists and credentials are valid
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user=user;
    next();
}

module.exports = userMiddleware;