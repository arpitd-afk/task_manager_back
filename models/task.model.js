const db = require("../config/db");

exports.createTask = async (
  ticket_id,
  title,
  description,
  assigned_to,
  status
) => {
  const query = `
      INSERT INTO tasks (ticket_id, title, description, assigned_to, status)
      VALUES (?, ?, ?, ?, ?)
    `;
  const [result] = await db.query(query, [
    ticket_id,
    title,
    description,
    assigned_to,
    status,
  ]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Creating the Task");
    }
  });
};

exports.getalltasks = async () => {
  const query = `SELECT * FROM tasks`;
  const [rows] = await db.query(query);
  return new Promise((resolve, reject) => {
    if (rows) {
      resolve(rows);
    } else {
      reject("Error Fetching All Tasks");
    }
  });
};

exports.getTaskById = async (id) => {
  const query = `SELECT * FROM tasks WHERE id = ?`;
  const [rows] = await db.query(query, [id]);
  return new Promise((resolve, reject) => {
    if (rows) {
      resolve(rows);
    } else {
      reject("Error Fetching Task By ID");
    }
  });
};

exports.getTasksByTicket = async (ticket_id) => {
  const query = `SELECT * FROM tasks WHERE ticket_id = ?`;
  const [rows] = await db.query(query, [ticket_id]);
  return new Promise((resolve, reject) => {
    if (rows) {
      resolve(rows);
    } else {
      reject("Error Fetching Tasks By Ticket ID");
    }
  });
};

exports.updateTask = async (id, title, description, assigned_to, status) => {
  const query = `
      UPDATE tasks
      SET title = ?, description = ?, assigned_to = ?, status = ?
      WHERE id = ?
    `;
  const [result] = await db.query(query, [
    title,
    description,
    assigned_to,
    status,
    id,
  ]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Updating Task");
    }
  });
};

exports.deleteTask = async (id) => {
  const query = `DELETE FROM tasks WHERE id = ?`;
  const [result] = await db.query(query, [id]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Deleting Task");
    }
  });
};
