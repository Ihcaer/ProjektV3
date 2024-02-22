const express = require('express');
const CMSauthController = require('../controllers/CMSauthController');

const router = express.Router();

router.post('/login', CMSauthController.loginCMS);
router.get('/generateUniqueCode', CMSauthController.generateUniqueCode);
router.post('/checkCodeUniq/:verCode', CMSauthController.checkVerCode);
router.post('/creatingEmployee', CMSauthController.creatingEmployee);
router.post('/register', CMSauthController.registerCMS);

module.exports = router;
