const db = require("../config/db");

exports.createRole = async (name) => {
  const query = `
      INSERT INTO roles (name)
      VALUES (?)
    `;
  const [result] = await db.query(query, [name]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Creating Role");
    }
  });
};

exports.getRoleByID = async (id) => {
  const query = `SELECT * FROM roles WHERE id = ?`;
  const [rows] = await db.query(query, [id]);
  return new Promise((resolve, reject) => {
    if (rows) {
      resolve(rows);
    } else {
      reject("Error Fetching Role By ID");
    }
  });
};

exports.updateRole = async (id, name) => {
  const query = `
      UPDATE roles
      SET name = ?
      WHERE id = ?
    `;
  const [result] = await db.query(query, [name, id]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Updating Role");
    }
  });
};

exports.deleteRole = async (id) => {
  const query = `DELETE FROM roles WHERE id = ?`;
  const [result] = await db.query(query, [id]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Deleting Role");
    }
  });
};
