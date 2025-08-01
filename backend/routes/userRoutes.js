const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, getProfile);
router.put("/me", authMiddleware, updateProfile);

module.exports = router;
