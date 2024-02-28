const express = require('express');
const CMSauthController = require('../controllers/CMSauthController');
//const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//router.use(authMiddleware);

router.get('/permission', CMSauthController.checkPermission);
router.get('/getId', CMSauthController.getId);
router.post('/login', CMSauthController.loginCMS);
router.get('/generateUniqueCode', CMSauthController.generateUniqueCode);
router.post('/checkCodeUniq/:verCode', CMSauthController.checkVerCode);
router.post('/creatingEmployee', CMSauthController.creatingEmployee);
router.post('/register', CMSauthController.registerCMS);

module.exports = router;
