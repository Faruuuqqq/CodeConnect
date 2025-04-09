const db = require("../config/db");

const createUser = (user, callback) => {
  const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(query, [user.name, user.email, user.password, user.role], callback);
};

const getUserByEmail = (email, callback) => {
  const query = "SELECT * FROM users where email = ?";
  db.query(query, [email], callback);
};

module.exports = { createUser, getUserByEmail};