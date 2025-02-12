// Contact Model Functions

const db = require('../config/database');

async function createContact(user, contact) {
    contact.owner = user;
    contact.type = "contact";
    return await db.insert(contact);
}

async function getContacts(user) {
    const contacts = await db.find({ selector: { owner: user, type: "contact" } });
    return contacts.docs;
}

async function updateContact(user, contactId, updatedContact) {
    const contact = await db.get(contactId);
    if (contact.owner !== user) throw new Error("Unauthorized");
    updatedContact._id = contactId;
    updatedContact._rev = contact._rev;
    updatedContact.owner = user;
    return await db.insert(updatedContact);
}

async function deleteContact(user, contactId) {
    const contact = await db.get(contactId);
    if (contact.owner !== user) throw new Error("Unauthorized");
    return await db.destroy(contactId, contact._rev);
}

module.exports = { createContact, getContacts, updateContact, deleteContact };
