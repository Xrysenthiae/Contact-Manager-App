// JWT Authentication

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    console.log("Received Token:", token); // Debugging

    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        console.log("Verified User:", verified); // Debugging
        req.user = verified;
        next();
    } catch (err) {
        console.log("JWT verification error:", err.message);
        res.status(400).json({ message: "Invalid Token" });
    }
};
