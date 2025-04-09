const bycrypt = require("bcrypt");

const hashPassword = async (password) => {
  return await bycrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return await bycrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };