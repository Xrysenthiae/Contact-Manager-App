// LogIn/Register Routes

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../models/userModel');

router.post('/api/auth/register', async (req, res) => {
    try {
        const response = await registerUser(req.body.username, req.body.password);
        res.status(201).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const response = await loginUser(req.body.username, req.body.password);
        res.json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
