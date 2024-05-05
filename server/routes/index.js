const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const espacosController = require('../controllers/espacosController');

router.get('/', mainController.homepage);
router.get('/about', mainController.about);
router.get('/login', mainController.login);
router.get('/signup', mainController.signup);
router.get('/espacos', espacosController.espacos);

module.exports = router;