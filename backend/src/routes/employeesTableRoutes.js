const express = require('express');
const employeesTableController = require('../controllers/employeesTableController');
const router = express.Router();

router.get('/employeesTable', employeesTableController.employeesTable);
router.get('/employeeData/:id', employeesTableController.getEmployeeData);
router.delete('/deleteEmployee/:id', employeesTableController.deleteEmployee);

module.exports = router;
