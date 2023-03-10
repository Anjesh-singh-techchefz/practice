const express = require('express');
const familyDetails = require('../controllers/familyDetails');
const router = express.Router();

router.route('/').post(familyDetails.createFamilyDetails);

module.exports = router;