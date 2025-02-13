// User Model Functions

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nano = require('nano')(process.env.COUCHDB_URL);
const usersDb = nano.db.use('_users');
const crypto = require('crypto');

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
        if (!userDoc || !userDoc.derived_key || !userDoc.salt) {
            console.log("User not found or missing password fields");
            throw new Error("Invalid Username or Password");
        }

        console.log("Stored Derived Key:", userDoc.derived_key);
        console.log("Stored Salt:", userDoc.salt);

        const hashedInputPassword = crypto.pbkdf2Sync(
            password,
            userDoc.salt,
            userDoc.iterations,
            32,
            userDoc.pbkdf2_prf
        ).toString('hex');

        console.log("Computed Hash:", hashedInputPassword);

        if (hashedInputPassword !== userDoc.derived_key) {
            console.log("Password mismatch");
            throw new Error("Invalid Username or Password");
        }

        const token = jwt.sign({ id: userDoc.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token };

    } catch (err) {
        console.log("Login error:", err.message);
        throw new Error("Invalid Username or Password");
    }
}


module.exports = { registerUser, loginUser };
