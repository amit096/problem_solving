const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';

function signJwt(username, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username) || password.length < 6) {
        return null;
    }
    return jwt.sign({ username: username, password: password }, jwtPassword);
}


function verifyJwt(token) {
    try {
        jwt.verify(token, jwtPassword);
        return true;
    } catch (error) {
        return false;
    }
}

function decodeJwt(token) {
    try {
        jwt.verify(token, jwtPassword);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword,
};
