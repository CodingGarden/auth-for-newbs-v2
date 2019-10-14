const db = require('./../db/connection');

const users = db.get('users');
users.createIndex('username', { unique: true });

module.exports = users;
