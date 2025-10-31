const express = require("express");
const authToken = require("../middleware/authmiddleware.js");
const UserController = require("../controllers/userController.js");

const router = express.Router();

// public routes
router.post("/signup", UserController.signupUser);
router.post("/login", UserController.loginUser);

// protected routes
router.get("/allusers", authToken, UserController.getAllUsers);
router.get("/user/:id", authToken, UserController.getSingleUser);
router.get("/me", authToken, UserController.getCurrentUser);
router.get("/mebyrole", authToken, UserController.getSingleUserByRole);
router.put("/updateuser/:id", authToken, UserController.updateUser);
router.delete("/deleteuser/:id", authToken, UserController.deleteUser);

module.exports = router;
// https://cashkaro.trackier.co/acquisition?
//     click_id=654747
//     &security_token=f11b814723dafa61aeec
//     &sale_amount=819
//     &txn_id=21707
//     &coupon_code=BEYOUNG100
