// Middleware for user authentication
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authenticateUser = (req, res, next) => {
    // Check for token in headers, cookies, or request body
    const token = req.headers.authorization || req.cookies.token || req.body.token;

    // Respond if no token found
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Decode the token 
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Attach user object to request object for future
        req.user = decoded.user;
        // Pass object to the caller
        next();
    } catch (error) {
        // Send message
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Export module
module.exports = { authenticateUser };
