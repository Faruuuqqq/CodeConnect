const db = require("../config/db");

exports.getProfile = async (req, res) => {
  const userId = req.user.id;
  const [rows] = await db.execute("SELECT id, name, email, role, bio FROM users WHERE id = ?", [userId]);
  res.json(rows[0]);
}

exports.updateProfile = async (req, res, next) => {
  const userId = req.user.id;
  const { name, bio } = req.body;

  await db.execute("UPDATE users SET name = ?, bio =? WHERE id = ?", [name, bio, userId]);
  res.json({ message: "Profile updated successfully" });
};
