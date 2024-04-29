const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

router.get('/', reservasController.homepage);
router.get('/about', reservasController.about);
router.get('/add', reservasController.addReserva);
router.post('/add', reservasController.postReserva);
router.get('/view/:id', reservasController.view);
router.get('/edit/:id', reservasController.edit);
router.put('/edit/:id', reservasController.editPost);
router.delete('/edit/:id', reservasController.deleteReserva);

router.post('/search', reservasController.searchReserva);

module.exports = router;