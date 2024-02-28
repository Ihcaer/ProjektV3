const bcryptUtils = require('../utils/bcryptUtils');
const jwt = require('jsonwebtoken');
const { Employee } = require('../models');
const config = require('../config/config');

exports.checkPermission = async (req, res) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Brak dostępu. Niepodano tokenu.' });
    }

    const decodedToken = jwt.verify(token, config.jwtSecret);
    const employeeId = decodedToken.employeeId;

    const permissionNumber = await Employee.findOne({
      attributes: ['uprawnienia'],
      where: { id: employeeId },
    });

    if (!permissionNumber) {
      return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
    }

    res.json({ permissionNumber: permissionNumber.uprawnienia });
  } catch (error) {
    res.status(500).json({ error: 'Błąd serwera' });
  }
};

exports.getId = async (req, res) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Brak dostępu. Niepodano tokenu.' });
    }

    const decodedToken = jwt.verify(token, config.jwtSecret);
    const employeeId = decodedToken.employeeId;

    const id = await Employee.findOne({
      attributes: ['id'],
      where: { id: employeeId },
    });

    if (!id) {
      return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
    }
    res.json({ id: id.id });
  } catch (error) {
    res.status(500).json({ error: 'Błąd serwera' });
  }
};

exports.loginCMS = async (req, res) => {
  const { login, haslo, nieWylogowuj } = req.body;

  try {
    const employee = await Employee.findOne({
      where: { login },
      attributes: ['id', 'login', 'haslo'],
    });

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

    const expiresIn = nieWylogowuj
      ? 30 * 24 * 60 * 60 * 1000
      : 7 * 60 * 60 * 1000;
    const accessToken = jwt.sign(
      { employeeId: employee.id },
      config.jwtSecret,
      { expiresIn }
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: expiresIn,
      sameSite: 'strict',
      secure: false, //https
    });

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
