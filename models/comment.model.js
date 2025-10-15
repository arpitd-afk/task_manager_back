const db = require("../config/db");

exports.addComment = async (ticket_id, user_id, comment_text) => {
  const query = `
      INSERT INTO comments (ticket_id, user_id, comment_text)
      VALUES (?, ?, ?)
    `;
  const [result] = await db.query(query, [ticket_id, user_id, comment_text]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Adding Comment");
    }
  });
};

exports.getCommentsByTicket = async (ticket_id) => {
  const query = `
      SELECT c.id, c.comment_text, c.created_at, u.name AS user_name, u.role
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.ticket_id = ?
      ORDER BY c.created_at ASC
    `;
  const [rows] = await db.query(query, [ticket_id]);
  return new Promise((resolve, reject) => {
    if (rows) {
      resolve(rows);
    } else {
      reject("Error Fetching Comments");
    }
  });
};

exports.getCommentsByUserId = async (user_id) => {
  const query = `
     SELECT c.id, c.comment_text, c.created_at, t.title AS ticket_title, t.id AS ticket_id FROM comments c 
     JOIN tickets t ON c.ticket_id = t.id
     WHERE c.user_id = ?
     ORDER BY c.created_at DESC
    `;
  const [rows] = await db.query(query, [user_id]);
  return new Promise((resolve, reject) => {
    if (rows) {
      resolve(rows);
    } else {
      reject("Error Fetching Comments By User ID");
    }
  });
};

exports.deleteComment = async (id) => {
  const query = `DELETE FROM comments WHERE id = ?`;
  const [result] = await db.query(query, [id]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Deleting Comment");
    }
  });
};

exports.editComment = async (id, comment_text) => {
  const query = `
      UPDATE comments
      SET comment_text = ?
      WHERE id = ?
    `;
  const [result] = await db.query(query, [comment_text, id]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Updating Comment");
    }
  });
};

exports.replyToComment = async (comment_id, user_id, reply_text) => {
  const query = `
      INSERT INTO comment_replies (comment_id, user_id, reply_text)
      VALUES (?, ?, ?)
    `;
  const [result] = await db.query(query, [comment_id, user_id, reply_text]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Adding Reply to Comment");
    }
  });
};

exports.getRepliesByComment = async (comment_id) => {
  const query = `
      SELECT r.id, r.reply_text, r.created_at, u.name AS user_name, u.role
      FROM comment_replies r
      JOIN users u ON r.user_id = u.id
      WHERE r.comment_id = ?
      ORDER BY r.created_at ASC
    `;
  const [rows] = await db.query(query, [comment_id]);
  return new Promise((resolve, reject) => {
    if (rows) {
      resolve(rows);
    } else {
      reject("Error Fetching Replies");
    }
  });
};

exports.editReply = async (id, reply_text) => {
  const query = `
      UPDATE comment_replies
      SET reply_text = ?
      WHERE id = ?
    `;
  const [result] = await db.query(query, [reply_text, id]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Updating Reply");
    }
  });
};

exports.deleteReply = async (id) => {
  const query = `DELETE FROM comment_replies WHERE id = ?`;
  const [result] = await db.query(query, [id]);
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject("Error Deleting Reply");
    }
  });
};
