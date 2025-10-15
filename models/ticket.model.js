const db = require("../config/db");

exports.createTicket = async (user_id, title, description, priority) => {
  const query =
    "INSERT INTO tickets (user_id, title, description, priority) VALUES (?, ?, ?, ?)";
  const [result] = await db.query(query, [
    user_id,
    title,
    description,
    priority,
  ]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Creating Ticket");
    }
  });
};

exports.getAllTickets = async () => {
  const [rows] = await db.query("SELECT * FROM tickets");
  return new Promise((resolve, reject) => {
    if (rows) {
      resolve(rows);
    } else {
      reject("Error Fetching All Tickets");
    }
  });
};

exports.getTicketsByRole = async (role, user_id) => {
  if (role === "Admin" || role === "Agent") {
    const [rows] = await db.query("SELECT * FROM tickets");
    return rows;
  } else {
    const [rows] = await db.query("SELECT * FROM tickets WHERE user_id = ?", [
      user_id,
    ]);
    return new Promise((resolve, reject) => {
      if (rows) {
        resolve(rows);
      } else {
        reject("Error Fetching Tickets By Role");
      }
    });
  }
};

exports.getTicketById = async (id) => {
  const [rows] = await db.query("SELECT * FROM tickets WHERE id = ?", [id]);
  return new Promise((resolve, reject) => {
    if (rows) {
      resolve(rows);
    } else {
      reject("Error Fetching Ticket By ID");
    }
  });
};

exports.updateTicket = async (id, title, description, status, priority) => {
  const query =
    "UPDATE tickets SET title = ?, description = ?, status = ?, priority = ? WHERE id = ?";
  const [result] = await db.query(query, [
    title,
    description,
    status,
    priority,
    id,
  ]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Updating Ticket");
    }
  });
};

exports.deleteTicket = async (id) => {
  const [result] = await db.query("DELETE FROM tickets WHERE id = ?", [id]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Deleting Ticket");
    }
  });
};
