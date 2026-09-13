const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    // Step 1: Look for the token in the request headers
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // Step 2: The header looks like "Bearer <token>" - we only want the token part
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Invalid token format' });
    }

    // Step 3: Check if the token is real and not expired
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // save the user info so the next function can use it
        next(); // let the request continue to the actual route
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = verifyToken;