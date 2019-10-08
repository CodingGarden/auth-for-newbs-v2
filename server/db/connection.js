const monk = require('monk');
const db = monk('localhost/auth-from-scratch');

module.exports = db;