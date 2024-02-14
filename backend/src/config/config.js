require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  token: process.env.TOKEN,
};
