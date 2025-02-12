// CouchDB Connection
const nano = require('nano')(process.env.COUCHDB_URL);
const db = nano.db.use('contacts');

module.exports = db;
