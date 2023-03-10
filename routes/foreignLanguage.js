const express = require('express');
const foreignLangauge = require('../controllers/foreignLanguage');

const router = express.Router();

router.route('/').post(foreignLangauge.createForeignLanguage)

module.exports = router;