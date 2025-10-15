const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authmiddleware");
const DashboardController = require("../controllers/dashboardController");

router.get("/tickets/summary", authToken, DashboardController.getTicketSummary);
router.get(
  "/tickets/priority",
  authToken,
  DashboardController.getTicketsByPriority
);
router.get("/tasks/status", authToken, DashboardController.getTasksByStatus);

module.exports = router;
