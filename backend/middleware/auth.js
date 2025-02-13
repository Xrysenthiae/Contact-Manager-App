// JWT Authentication

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    console.log("🔹 Authentication Middleware Triggered");

    const authHeader = req.header("Authorization");
    console.log("🔹 Authorization Header:", authHeader);

    if (!authHeader) {
        console.log("⛔ No Authorization Header");
        return res.status(401).json({ message: "Access Denied" });
    }

    const token = authHeader.split(" ")[1];
    console.log("🔹 Extracted Token:", token);

    if (!token) {
        console.log("⛔ No Token Found");
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token Verified:", verified);
        req.user = verified;
        next();
    } catch (err) {
        console.log("⛔ JWT Verification Error:", err.message);
        res.status(400).json({ message: "Invalid Token" });
    }
};



