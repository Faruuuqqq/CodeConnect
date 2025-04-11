const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.get("/", authMiddleware, (req, res) => {
  const role = req.user.role;
  res.json({
    message: `Welcome to your dashboard, ${role}!`,
    user: req.user,
  });
});

router.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.json({ message: "Admin Dashboard - You have full access." });
});

router.get("/mentor", authMiddleware, roleMiddleware("mentor"), (req, res) => {
  res.json({ message: "Mentor Dashboard - Manage your mentoring sessions here." });
});

router.get("/mentee", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.json({ message: "Mentee Dashboard - Browse and book sessions." });
});

module.exports = router;