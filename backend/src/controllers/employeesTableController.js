const { Employee } = require('../models');

exports.employeesTable = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: ['id', 'imie', 'nazwisko', 'uprawnienia'],
    });
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployeeData = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findOne({
      where: { id: id },
      attributes: ['id', 'imie', 'nazwisko', 'uprawnienia'],
    });
    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    await Employee.destroy({
      where: { id: id },
    });
    res.status(200).json({ message: `Pracownik o id ${id} został usunięty.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
