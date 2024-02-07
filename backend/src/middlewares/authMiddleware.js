const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
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

  /*try {
    const decoded = jwt.verify(token, config.jwtSecret);
    if (decoded.exp <= Date.now() / 1000) {
      return res
        .status(401)
        .json({ message: 'Token wygasł. Zaloguj się ponownie' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Nieprawidłowy token.' });
  }*/
};
