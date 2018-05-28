const pgp = require('pg-promise')({
    // Initialization Options
});

// Preparing the connection details:
const cn = 'postgres://jojo:bigsky01@localhost:5432/myStuff';

// Creating a new database instance from the connection details:
const db = pgp(cn);

module.exports = db;
