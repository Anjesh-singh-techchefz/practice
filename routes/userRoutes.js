const express = require('express')
const userCtrl = require('../controllers/user')
const router = express.Router();

router.route('/create-user').post(userCtrl.createUser)
// router.post('/create-user', userCtrl.createUser);

module.exports = {
  router
};