// User Model Functions

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nano = require('nano')(process.env.COUCHDB_URL);
const usersDb = nano.db.use('_users');

async function registerUser(username, password) {
    const userDoc = {
        _id: "org.couchdb.user:" + username,
        name: username,
        type: "user",
        roles: [],
        password: password // CouchDB will hash it automatically
    };

    try {
        await usersDb.insert(userDoc);
        return { message: "Registration Successful!" };
    } catch (err) {
        throw new Error("Username Already Exists");
    }
}

async function loginUser(username, password) {
    try {
        const userDoc = await usersDb.get("org.couchdb.user:" + username);

        // Compare plaintext passwords, since CouchDB already hashes internally
        if (userDoc.password !== password) {
            throw new Error("Invalid Credentials");
        }

        const token = jwt.sign({ id: userDoc.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token };
    } catch (err) {
        throw new Error("Invalid Username or Password");
    }
}

module.exports = { registerUser, loginUser };
