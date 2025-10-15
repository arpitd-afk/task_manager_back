const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const roleRoutes = require("./routes/role.routes");
const taskRoutes = require("./routes/task.routes");
const TicketRoutes = require("./routes/ticket.routes");
const CommentRoutes = require("./routes/comment.routes");
const NotificationRoutes = require("./routes/notification.routes");
const DashboardRoutes = require("./routes/dashboard.routes");
const path = require("path");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", userRoutes);
app.use("/api", roleRoutes);
app.use("/api", TicketRoutes);
app.use("/api", taskRoutes);
app.use("/api", CommentRoutes);
app.use("/api", NotificationRoutes);
app.use("/api", DashboardRoutes);

module.exports = app;
