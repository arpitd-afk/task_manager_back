const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const SECRET_KEY = process.env.SECRET_KEY_ID || "test@123";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        statuscode: 1,
        statusmessage: "Email and password are required",
        data: {},
      });
    }
    let user = await User.getUserByEmail(email);
    if (user.length <= 0 || !user[0].id || !user[0].email) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    user = user[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        statuscode: 1,
        statusmessage: "Invalid email or password.",
      });
    }

    // Generate JWT
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });

    // console.log("User ID being signed:", user.id);

    // Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    // console.log(`Token passed from backend login controller ${token}`);
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      statusmessage: "Login failed",
      details: error.message,
      data: {},
    });
  }
};

const signupUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    if (!name || !email || !role || !password) {
      return res.status(400).json({
        statuscode: 1,
        statusmessage: "All fields are required",
        data: {},
      });
    }

    const existingUser = await User.getUserByEmail(email);
    console.log("signupdata", existingUser);
    if (existingUser.length > 0) {
      return res.status(409).json({
        statuscode: 1,
        statusmessage: "Email already in use",
        data: {},
      });
    }

    const hashedPassword = await bcrypt.hash(password, 2);
    const result = await User.createUser(name, email, role, hashedPassword);

    res.status(201).json({
      statuscode: 0,
      statusmessage: "User added",
      data: {
        id: result.insertId,
        name,
        email,
        role,
      },
    });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      statusmessage: "Signup failed",
      details: error.message,
      data: {},
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json({
      statuscode: 0,
      statusmessage: "Success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to fetch users",
      details: error.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const email = req.user.email;
    if (!email) {
      return res.status(404).json({
        statuscode: 1,
        statusmessage: "Email Not Found",
      });
    }
    let user = await User.getUserByEmail(email);
    if (user.length <= 0 || !user[0].id || !user[0].email) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    user = user[0];
    return res.status(200).json({
      statuscode: 0,
      statusmessage: "User retrieved successfully",
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      statusmessage: "Failed to retrieve user",
      details: error.message,
      data: {},
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(404).send("User Id not found");
    }
    const mydata = await User.getUserById(userId);
    res.status(200).json(mydata[0]);
    // res.status(200).json({
    //   statuscode: 0,
    //   statusmessage: "Success",
    //   data: mydata[0],
    // });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to fetch user",
      details: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(404).json({
        statuscode: 1,
        statusmessage: "User Id not found",
      });
    }
    const { name, email, role } = req.body;
    if (!userId || !name || !role || !email) {
      return res.status(400).send("Invalid input fields");
    }
    // const hashedPassword = await bcrypt.hash(password, 2);
    await User.updateUser(userId, name, email, role);
    res.status(200).send(`User Updated With ID: ${userId}`);
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to Update User",
      details: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Deleting user with ID:", userId);
    if (!userId) {
      return res.status(400).send("User Id not found");
    }
    await User.deleteUser(userId);
    res.status(200).send(`User deleted with ID: ${userId}`);
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to delete user",
      details: error.message,
    });
  }
};

const getSingleUserByRole = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (!userRole) {
      return res.status(404).send("User Role not found");
    }
    const mydata = await User.getUserByRole(userRole);
    res.status(200).json({
      statuscode: 0,
      statusmessage: "Success",
      data: mydata,
    });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to Fetch User By Role",
      details: error.message,
    });
  }
};

module.exports = {
  loginUser,
  getSingleUser,
  signupUser,
  getAllUsers,
  getCurrentUser,
  updateUser,
  deleteUser,
  getSingleUserByRole,
};
