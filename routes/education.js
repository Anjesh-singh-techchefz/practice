const express = require('express');
const education = require('../controllers/education');
const router = express.Router();

router.route('/').post(education.addEducation);

module.exports = router;
