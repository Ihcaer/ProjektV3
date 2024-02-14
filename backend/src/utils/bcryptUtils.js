const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (haslo) => {
  return bcrypt.hash(haslo, saltRounds);
};

const comparePassword = async (haslo, hashedPassword) => {
  return bcrypt.compare(haslo, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
