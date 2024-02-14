const express = require('express');
const CMSauthController = require('../controllers/CMSauthController');

const router = express.Router();

router.post('/login', CMSauthController.loginCMS);
router.post('/register', CMSauthController.registerCMS);

module.exports = router;
