const db = require("../config/db");

exports.createNotification = async (user_id, message) => {
  const query = `
      INSERT INTO notifications (user_id, message)
      VALUES (?, ?)
    `;
  const [result] = await db.query(query, [user_id, message]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Creating Notification");
    }
  });
};

exports.getNotificationsByUser = async (user_id) => {
  const query = `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC`;
  const [rows] = await db.query(query, [user_id]);
  return new Promise((resolve, reject) => {
    if (rows) {
      resolve(rows);
    } else {
      reject("Error Fetching Notifications");
    }
  });
};

exports.markAsRead = async (id) => {
  const query = `UPDATE notifications SET is_read = 1 WHERE id = ?`;
  const [result] = await db.query(query, [id]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Reading the Notifications");
    }
  });
};

exports.deleteNotification = async (id) => {
  const query = `DELETE FROM notifications WHERE id = ?`;
  const [result] = await db.query(query, [id]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Deleting Notification");
    }
  });
};
