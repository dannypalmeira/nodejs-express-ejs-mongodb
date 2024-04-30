const express = require('express');
const router = express.Router();

const espacosController = require('../controllers/espacosController');

router.get('/espacos', espacosController.espacos);
router.get('/item/:id', espacosController.espacosViewNote);
router.put('/item/:id', espacosController.espacosUpdateNote);
router.delete('/item-delete/:id', espacosController.espacosDeleteNote);
router.get('/add', espacosController.espacosAddNote);
router.post('/add', espacosController.espacosAddNoteSubmit);
router.get('/search', espacosController.espacosSearch);
router.post('/search', espacosController.espacosSearchSubmit);

module.exports = router;