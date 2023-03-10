const express = require('express');
const userCtrl = require('../controllers/user');
const router = express.Router();

router.route('/create-user').post(userCtrl.createUser);
router.route('/login').post(userCtrl.login);

module.exports = router;

