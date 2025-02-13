// LogIn/Register Routes

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../models/userModel');

router.post('/register', async (req, res) => {
    try {
        const response = await registerUser(req.body.username, req.body.password);
        res.status(201).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await loginUser(username, password);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
