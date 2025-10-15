const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

// db.query(
//   `ALTER TABLE users
// ADD COLUMN hashed_password VARCHAR(255); -- Or VARBINARY(64) for raw hash bytes`
// );

// db.query(
//   `CREATE TABLE IF NOT EXISTS userlogin (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 name VARCHAR(100) NOT NULL,
//                 email VARCHAR(100) NOT NULL,
//                 password VARCHAR(255) NOT NULL,
//                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//             )`
// );

// create tasks table if not exists
// db.query(
//   `CREATE TABLE IF NOT EXISTS taskslogin (
//               id INT AUTO_INCREMENT PRIMARY KEY,
//                 user_id INT,
//                 subject VARCHAR(100) NOT NULL,
//                 status VARCHAR(50) DEFAULT 'pending' NOT NULL,
//                 description TEXT,
//                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//                 FOREIGN KEY (user_id) REFERENCES userlogin(id) ON DELETE CASCADE
//             )`
// );

db.getConnection()
  .then((conn) => {
    console.log("Connected to MySQL database");
    conn.release();
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err.message);
  });

module.exports = db;
