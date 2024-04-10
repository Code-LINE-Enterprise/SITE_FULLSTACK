const express = require('express');
const AdmController = require('../controllers/admController');

const router = express.Router();

let ctrl = new AdmController();
router.get('/', ctrl.loginView);
router.post('/validar', ctrl.login);
router.get('/home', ctrl.homeView);
router.get('/listarPatrimonio', ctrl.listagemPatrimonioView);
router.get('/listarEvento', ctrl.listagemEventoView);
router.get('/listarDoacao', ctrl.listagemDoacaoView);

module.exports = router;