// "use strict";
// /** Database setup for summify. */
// const { Client } = require("pg");

// let DB_URI;

// if (process.env.NODE_ENV === "test") {
//   DB_URI = "postgresql:///summify_test";
// } else {
//   DB_URI = "postgresql:///summify";
// }
// const db = new Client({
//   connectionString: DB_URI
// });

// db.connect()
//   .then(() => console.log("Connected to the database"))
//   .catch(err => {
//     console.error("Error connecting to the database:", err.message);
//     process.exit(1); // Exit the process if unable to connect to the database
//   });

// module.exports = db;

"use strict";
/** Database setup for summify. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    connectionString: getDatabaseUri()
  });
}

db.connect();

module.exports = db;