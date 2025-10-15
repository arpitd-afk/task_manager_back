const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authmiddleware");
const TicketController = require("../controllers/ticketController");

router.post("/addticket", authToken, TicketController.createTicket);
router.get("/getalltickets", authToken, TicketController.getAllTickets);
router.get("/getticket/:id", authToken, TicketController.getTicketById);
router.put("/updateticket/:id", authToken, TicketController.updateTicket);
router.delete("/deleteticket/:id", authToken, TicketController.deleteTicket);

module.exports = router;
