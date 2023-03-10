const express = require('express');
const englishProficiency = require('../controllers/englishProficiency');

const router = express.Router();

router.route('/').post(englishProficiency.createEnglishProficiency);

module.exports = router;