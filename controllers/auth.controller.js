const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/hash");
const { createUser, getUserByEmail } = require("../models/user.model");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  getUserByEmail(email, async (err, result) => {
    if (result.length > 0) return res.status(400).json({ msg: "Email already exist"});

    const hashed = await hashPassword(password);
    createUser({ name, email, password: hashed, role }, (err, result) => {
      if (err) return res.status(500).json({ msg: "Registration failed"});
      res.status(201).json({ msg: "user registered successfully" }); 
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  getUserByEmail(email, async (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ msg: "User not found"});

    const user = result[0];
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user.id, role: user.role}, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ msg: "Login success", token });
  });
};

