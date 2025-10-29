const db = require("../config/db");

exports.createUser = async (name, email, role, password) => {
  const query =
    "INSERT INTO users (name, email, role, password) VALUES (?, ?, ?, ?)";
  const result = await db.query(query, [name, email, role, password]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Creating User");
    }
  });
};

exports.getAllUsers = async () => {
  const query = "SELECT id, name, email, role FROM users";
  const [rows] = await db.query(query);
  return new Promise((resolve, reject) => {
    if (rows) {
      resolve(rows);
    } else {
      reject("Error Fetching All Users");
    }
  });
};

exports.getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";
  const [rows] = await db.query(query, [email]);
  return new Promise((resolve, reject) => {
    if (rows) {
      resolve(rows);
    } else {
      reject("Error Fetching User By Email");
    }
  });
};

exports.getUserById = async (id) => {
  const result = await db.query(
    "SELECT id, name, email, role FROM users WHERE id = ?",
    [id]
  );
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Fetching User By ID");
    }
  });
};

exports.getUserBySlug = async (slug) => {
  const result = await db.query(
    "SELECT id, name, email,role FROM users WHERE slug = ?",
    [slug]
  );
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error fetching user by Slug");
    }
  });
};

exports.getUserByRole = async (role) => {
  const result = await db.query(
    "SELECT id, name, email, role FROM users WHERE role = ?",
    [role]
  );
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Fetching User By Role");
    }
  });
};

exports.updateUser = async (id, name, email, role) => {
  const query = "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?";
  const [result] = await db.query(query, [name, email, role, id]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Updating User");
    }
  });
};

exports.deleteUser = async (id) => {
  const query = "DELETE FROM users WHERE id = ?";
  const [result] = await db.query(query, [id]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Deleting User");
    }
  });
};
