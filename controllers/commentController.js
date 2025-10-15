const Comment = require("../models/comment.model");

const addComment = async (req, res) => {
  try {
    const { ticket_id, comment_text } = req.body;
    const user_id = req.user.id;

    if (!ticket_id || !comment_text) {
      return res.status(400).json({
        statuscode: 1,
        Statusmessage: "Ticket ID And Comment Text Are Required",
      });
    }
    if (!user_id) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "User ID Is Required" });
    }
    const result = await Comment.addComment(ticket_id, user_id, comment_text);
    res.status(201).json({
      statuscode: 0,
      Statusmessage: "Comment Added",
      commentId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed To Add Comment",
      details: error.message,
    });
  }
};

const getCommentsByTicket = async (req, res) => {
  try {
    const ticketId = req.params.ticket_id;
    if (!ticketId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Ticket ID is required" });
    }
    const comments = await Comment.getCommentsByTicket(ticketId);
    res.status(200).json({ statusmessage: "Success", statuscode: 0, comments });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to fetch Comments",
      details: error.message,
    });
  }
};

const editComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { comment_text } = req.body;
    if (!commentId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Comment ID is required" });
    }
    await Comment.editComment(commentId, comment_text);
    res.status(200).json({ statuscode: 0, Statusmessage: "Comment updated" });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to update comment",
      details: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    if (!commentId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Comment ID is required" });
    }
    await Comment.deleteComment(commentId);
    res.status(200).json({ statuscode: 0, Statusmessage: "Comment deleted" });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to delete comment",
      details: error.message,
    });
  }
};

const replyToComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { reply_text } = req.body;
    const user_id = req.user.id;
    if (!commentId || !reply_text) {
      return res.status(400).json({
        statuscode: 1,
        Statusmessage: "Comment ID and Reply Text Are Required",
      });
    }
    if (!user_id) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "User ID Is Required" });
    }
    const result = await Comment.replyToComment(commentId, user_id, reply_text);
    res.status(201).json({
      statuscode: 0,
      Statusmessage: "Reply Added Successfully",
      replyId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to Add Reply",
      details: error.message,
    });
  }
};

const getRepliesByComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    if (!commentId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Comment ID is required" });
    }
    const replies = await Comment.getRepliesByComment(commentId);
    res.status(200).json({ statuscode: 0, statusmessage: "Success", replies });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to fetch replies",
      details: error.message,
    });
  }
};

const editReply = async (req, res) => {
  try {
    const replyId = req.params.id;
    const { reply_text } = req.body;
    if (!replyId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Reply ID is required" });
    }
    await Comment.editReply(replyId, reply_text);
    res.status(200).json({ statuscode: 0, Statusmessage: "Reply updated" });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to update reply",
      details: error.message,
    });
  }
};

const deleteReply = async (req, res) => {
  try {
    const replyId = req.params.id;
    if (!replyId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Reply ID is required" });
    }
    await Comment.deleteReply(replyId);
    res.status(200).json({ statuscode: 0, Statusmessage: "Reply deleted" });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to delete reply",
      details: error.message,
    });
  }
};

module.exports = {
  addComment,
  getCommentsByTicket,
  editComment,
  deleteComment,
  replyToComment,
  getRepliesByComment,
  editReply,
  deleteReply,
};
