const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authmiddleware");
const CommentController = require("../controllers/commentController");

router.post("/addcomment", authToken, CommentController.addComment);
router.get(
  "/getcommbyticket/:ticket_id",
  authToken,
  CommentController.getCommentsByTicket
);
router.put("/editcomment/:id", authToken, CommentController.editComment);
router.delete("/deletecomment/:id", authToken, CommentController.deleteComment);

// reply routes
router.post("/replycomment/:id", authToken, CommentController.replyToComment);
router.get(
  "/getrepliesbycomment/:id",
  authToken,
  CommentController.getRepliesByComment
);
router.put("/editreply/:id", authToken, CommentController.editReply);
router.delete("/deletereply/:id", authToken, CommentController.deleteReply);

module.exports = router;
