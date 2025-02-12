// CRUD routes for contacts

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createContact, getContacts, updateContact, deleteContact } = require('../models/contactModel');

router.post('/', auth, async (req, res) => {
    try {
        const contact = await createContact(req.user.id, req.body);
        res.status(201).json(contact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const contacts = await getContacts(req.user.id);
        res.json(contacts);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const updated = await updateContact(req.user.id, req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const response = await deleteContact(req.user.id, req.params.id);
        res.json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
