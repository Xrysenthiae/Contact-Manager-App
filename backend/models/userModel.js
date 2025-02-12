// User Model Functions

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nano = require('nano')('http://admin:password@localhost:5984');
const usersDb = nano.db.use('_users');

async function registerUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = {
        _id: "org.couchdb.user:" + username,
        name: username,
        type: "user",
        roles: [],
        password: hashedPassword
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
        const validPass = await bcrypt.compare(password, userDoc.password);
        if (!validPass) throw new Error("Invalid Credentials");

        const token = jwt.sign({ id: userDoc.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token };
    } catch (err) {
        throw new Error("Invalid Username or Password");
    }
}

module.exports = { registerUser, loginUser };
