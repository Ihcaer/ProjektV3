const bcryptUtils = require('../utils/bcryptUtils');
const jwt = require('jsonwebtoken');
const { Employee } = require('../models');
const config = require('../config/config');

exports.loginCMS = async (req, res) => {
  const { login, haslo, nieWylogowuj } = req.body;

  try {
    const employee = await Employee.findOne({ where: { login } });

    if (!employee) {
      return res.status(404).json({ message: 'Login lub hasło nieprawidłowe' });
    }

    const passwordMatch = await bcryptUtils.comparePassword(
      haslo,
      employee.haslo
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Login lub hasło nieprawidłowe' });
    }

    const expiresIn = nieWylogowuj ? '30d' : '2m';
    const accessToken = jwt.sign(
      { employeeId: employee.id },
      config.jwtSecret,
      { expiresIn }
    );

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

exports.registerCMS = async (req, res) => {
  const { imie, uprawnienia, login, haslo } = req.body;

  try {
    const existingUser = await Employee.findOne({ where: { login } });

    if (existingUser) {
      return res.status(400).json({ message: 'Ten login jest zajęty' });
    }

    const hashedPassword = await bcryptUtils.hashPassword(haslo);
    const newEmployee = await Employee.create({
      imie,
      uprawnienia,
      login,
      haslo: hashedPassword,
    });

    res.status(201).json({ message: 'Pracownik dodany pomyślnie' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};
