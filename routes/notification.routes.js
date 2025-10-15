const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/notificationController");
const authToken = require("../middleware/authmiddleware");

router.post(
  "/addnotification",
  authToken,
  NotificationController.createNotification
);
router.get(
  "/getnotification",
  authToken,
  NotificationController.getNotificationsByUser
);
router.put(
  "/updatenotification/:id",
  authToken,
  NotificationController.makeNotificationRead
);
router.delete(
  "/deletenotification/:id",
  authToken,
  NotificationController.deleteNotification
);

module.exports = router;
