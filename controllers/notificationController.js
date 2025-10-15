const Notification = require("../models/notification.model");

const createNotification = async (req, res) => {
  try {
    const { user_id, message } = req.body;
    if (!user_id || !message) {
      return res.status(400).json({
        statuscode: 1,
        Statusmessage: "User ID and message are required",
      });
    }
    const result = await Notification.createNotification(user_id, message);
    res.status(201).json({
      statuscode: 0,
      Statusmessage: "Notification created",
      notificationId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to create notification",
      details: error.message,
    });
  }
};

const getNotificationsByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "User ID is required" });
    }
    const notifications = await Notification.getNotificationsByUser(userId);
    res
      .status(200)
      .json({ statuscode: 0, statusmessage: "Success", notifications });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to fetch notifications",
      details: error.message,
    });
  }
};

const makeNotificationRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    if (!notificationId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Notification ID is required" });
    }
    await Notification.markAsRead(notificationId);
    res
      .status(200)
      .json({ statuscode: 0, Statusmessage: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to update notification",
      details: error.message,
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    if (!notificationId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Notification id is required" });
    }
    await Notification.deleteNotification(notificationId);
    res.status(200).json({
      statuscode: 0,
      Statusmessage: "Notificatin deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to delete notification",
      details: error.message,
    });
  }
};

module.exports = {
  createNotification,
  getNotificationsByUser,
  makeNotificationRead,
  deleteNotification,
};
