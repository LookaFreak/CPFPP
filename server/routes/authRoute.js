const express = require("express");
const {
  LoginController,
  RegisterController,
  AuthController,
  getUserController,
  VerifyEmail,
  EditUserProfile
} = require("../controllers/authController");
const { authenticate } = require("../midelwares/authentication");
const Multer = require("../Utils/Multer")

const router = express.Router();

// Login user
router.post("/login", LoginController);

// Register user
router.post("/register", Multer.single("avatar"), RegisterController);
// verify Email user
router.post("/register/verify", VerifyEmail);

// Home // Auth
router.post("/setUserData", authenticate, AuthController);
// Register user
router.post("/editprofile", Multer.single("avatar"), authenticate, EditUserProfile);

// get user by id
router.get("/getuser", authenticate, getUserController);

module.exports = router;
