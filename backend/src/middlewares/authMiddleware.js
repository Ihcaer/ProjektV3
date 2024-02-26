const jwt = require('jsonwebtoken');
const config = require('../config/config');

/*module.exports = (req, res, next) => {
  const token = req.header(config.token);

  if (!token) {
    return res.status(401).json({ message: 'Brak dostępu. Niepodano tokenu.' });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Nieprawidłowy token' });
    }

    req.employee = decoded;
    next();
  });
};*/
module.exports = (req, res, next) => {
  const token = req.cookies && req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'Brak dostępu. Niepodano tokenu.' });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Nieprawidłowy token' });
    }

    req.employee = decoded;
    next();
  });
};
