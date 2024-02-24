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

    const expiresIn = nieWylogowuj ? '30d' : '7h';
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

exports.creatingEmployee = async (req, res) => {
  const credentials = req.body;
  try {
    const employee = await Employee.create(credentials);
    res.status(200).send({ message: 'Pracownik zarejestrowany pomyślnie' });
  } catch (error) {
    res.status(500).send('Błąd serwera');
  }
};

exports.registerCMS = async (req, res) => {
  /*const { login, haslo } = req.body;

  try {
    const existingUser = await Employee.findOne({ where: { login } });

    if (existingUser) {
      return res.status(400).json({ message: 'Ten login jest zajęty' });
    }

    const hashedPassword = await bcryptUtils.hashPassword(haslo);
    const newEmployee = await Employee.create({
      login,
      haslo: hashedPassword,
    });

    res.status(201).json({ message: 'Pracownik dodany pomyślnie' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Błąd serwera' });
  }*/
  const { login, haslo, kodWeryfikacyjny } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ where: { login } });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Ten login jest zajęty' });
    }

    const hashedPassword = await bcryptUtils.hashPassword(haslo);
    const authEmployee = await Employee.update(
      {
        login: login,
        haslo: hashedPassword,
        kodWeryfikacyjny: null,
      },
      { where: { kodWeryfikacyjny: kodWeryfikacyjny } }
    );
  } catch (error) {
    console.error('Błąd podczas rejestracji: ', error);
  }
};

exports.generateUniqueCode = async (req, res) => {
  const kodWeryfikacyjny = Math.floor(10000 + Math.random() * 90000);
  res.status(200).send(kodWeryfikacyjny.toString());
};

exports.checkVerCode = async (req, res) => {
  const verCode = req.params.verCode;
  try {
    const employee = await Employee.findOne({
      where: { kodWeryfikacyjny: verCode },
    });
    const isUnique = !employee;
    res.status(200).send(isUnique);
  } catch (error) {
    res.status(500).send('Błąd serwera');
  }
};
