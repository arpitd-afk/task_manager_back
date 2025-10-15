const db = require("../config/db");

const getTicketSummary = async (req, res) => {
  try {
    const query = `
      SELECT 
        status,
        COUNT(*) as count
      FROM tickets
      GROUP BY status
    `;
    const [rows] = await db.query(query);
    res
      .status(200)
      .json({ statusmessage: "Success", statuscode: 0, summary: rows });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to get ticket summary",
      details: error.message,
    });
  }
};

const getTicketsByPriority = async (req, res) => {
  try {
    const query = `
      SELECT 
        priority,
        COUNT(*) as count
      FROM tickets
      GROUP BY priority
    `;
    const [rows] = await db.query(query);
    res.status(200).json({
      statuscode: 0,
      statusmessage: "Success",
      ticketsByPriority: rows,
    });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to get tickets by priority",
      details: error.message,
    });
  }
};

const getTasksByStatus = async (req, res) => {
  try {
    const query = `
      SELECT 
        status,
        COUNT(*) as count
      FROM tasks
      GROUP BY status
    `;
    const [rows] = await db.query(query);
    res
      .status(200)
      .json({ statuscode: 0, statusmessage: "Success", tasksByStatus: rows });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to get tasks by status",
      details: error.message,
    });
  }
};

module.exports = {
  getTicketSummary,
  getTicketsByPriority,
  getTasksByStatus,
};
