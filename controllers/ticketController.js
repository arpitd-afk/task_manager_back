const Ticket = require("../models/ticket.model");

const createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const userId = req.user.id;
    if (!userId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "User ID is required" });
    }

    if (!title || !description || !priority) {
      return res.status(400).json({
        statuscode: 1,
        Statusmessage: "Title , description , Priority are required",
      });
    }

    const result = await Ticket.createTicket(
      userId,
      title,
      description,
      priority
    );
    res.status(201).json({
      statuscode: 0,
      Statusmessage: "Ticket created successfully",
      ticketId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Ticket creation failed",
      details: error.message,
    });
  }
};

// const getAllTickets = async (req, res) => {
//   try {
//     const role = req.user.role;
//     const userId = req.user.id;
//     if (!role || !userId) {
//       return res.status(400).json({
//         statuscode: 1,
//         Statusmessage: "User role and ID are required",
//       });
//     }
//     const tickets = await Ticket.getTicketsByRole(role, userId);
//     res.status(200).json({ statuscode: 0, statusmessage: "Success", tickets });
//   } catch (error) {
//     res.status(500).json({
//       statuscode: 1,
//       error: "Failed to fetch tickets",
//       details: error.message,
//     });
//   }
// };

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.getAllTickets();
    res.status(200).json({ statuscode: 0, statusmessage: "Success", tickets });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to fetch tickets",
      details: error.message,
    });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticketId = req.params.id;
    if (!ticketId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Ticket ID is required" });
    }
    const ticket = await Ticket.getTicketById(ticketId);
    if (!ticket.length) {
      return res
        .status(404)
        .json({ statuscode: 1, Statusmessage: "Ticket not found" });
    }
    res.status(200).json(ticket[0]);
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to fetch ticket",
      details: error.message,
    });
  }
};

const updateTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    if (!ticketId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Ticket ID is required" });
    }
    const { title, description, status, priority } = req.body;
    await Ticket.updateTicket(ticketId, title, description, status, priority);
    res.status(200).json({ statuscode: 0, Statusmessage: "Ticket updated" });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Update failed",
      details: error.message,
    });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    if (!ticketId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Ticket ID is required" });
    }
    await Ticket.deleteTicket(ticketId);
    res.status(200).json({ statuscode: 0, Statusmessage: "Ticket deleted" });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Delete failed",
      details: error.message,
    });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
