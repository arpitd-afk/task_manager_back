const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authmiddleware");
const TaskController = require("../controllers/taskController");

router.post("/addtask", authToken, TaskController.createTask);
router.get("/getalltasks", authToken, TaskController.getAllTasks);
router.get("/gettask/:id", authToken, TaskController.getTaskById);
router.get(
  "/taskbyticket/:ticket_id",
  authToken,
  TaskController.getTasksByTicket
);
router.put("/updatetask/:id", authToken, TaskController.updateTask);
router.delete("/deletetask/:id", authToken, TaskController.deleteTask);

module.exports = router;
