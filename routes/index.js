const express = require('express');
const userRoutes = require('./user');
const educationRoutes = require('./education');
const englishProficiencyRoutes = require('./englishProficiency');
const familyDetails = require('./familyDetails');
const foreignLanguage = require('./foreignLanguage');
const authenticateUser = require('../helpers/authentication').authenticateUser
const router = express.Router();


router.use('/user', userRoutes);

router.use(authenticateUser);

router.use('/education', educationRoutes);
router.use('/english-proficiency', englishProficiencyRoutes);
router.use('/family-details', familyDetails);
router.use('/foreign-language', foreignLanguage);


module.exports = router;

