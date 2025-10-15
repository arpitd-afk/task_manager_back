const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY_ID || "test@123";

const authToken = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["token"] || req.cookies?.token;
  const token = authHeader && authHeader.split(" ")[1];
  console.log(`Token coming From Frontend ${token}`);

  if (!token) {
    return res.status(401).json({
      statuscode: 1,
      statusmessage: "Access Denied. Please LogIn first to continue.",
      data: {},
    });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded JWT Payload:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({
      statuscode: 1,
      statusmessage: "Invalid or expired token. Please LogIn again.",
      data: {},
    });
  }
};

module.exports = authToken;
