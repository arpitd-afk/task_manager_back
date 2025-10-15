const Task = require("../models/task.model");

const createTask = async (req, res) => {
  try {
    const { ticket_id, title, description, assigned_to, status } = req.body;
    if (!ticket_id || !title || !description || !assigned_to) {
      return res.status(400).json({
        statuscode: 1,
        Statusmessage:
          "Ticket ID , Task title, Description and Assigned to are required",
      });
    }

    const result = await Task.createTask(
      ticket_id,
      title,
      description,
      assigned_to,
      status || "Open"
    );
    res.status(201).json({
      statuscode: 0,
      Statusmessage: "Task created",
      taskId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to create task",
      details: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getalltasks();
    res.status(200).json({ statuscode: 0, statusmessage: "Success", tasks });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to fetch tasks",
      details: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Task ID is required" });
    }

    const task = await Task.getTaskById(taskId);
    if (task.length === 0) {
      return res
        .status(404)
        .json({ statuscode: 1, Statusmessage: "Task not found" });
    }
    res.status(200).json(task[0]);
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to fetch task",
      details: error.message,
    });
  }
};

const getTasksByTicket = async (req, res) => {
  try {
    const ticketId = req.params.ticket_id;
    if (!ticketId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Ticket ID is required" });
    }

    const tasks = await Task.getTasksByTicket(ticketId);
    res.status(200).json({ statuscode: 0, statusmessage: "Success", tasks });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to fetch tasks",
      details: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Task ID is required" });
    }
    const { title, description, assigned_to, status } = req.body;
    await Task.updateTask(taskId, title, description, assigned_to, status);
    res.status(200).json({ statuscode: 0, Statusmessage: "Task updated" });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to update task",
      details: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Task ID is required" });
    }
    await Task.deleteTask(taskId);
    res.status(200).json({ statuscode: 0, Statusmessage: "Task deleted" });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to delete task",
      details: error.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  getTasksByTicket,
  updateTask,
  deleteTask,
};
