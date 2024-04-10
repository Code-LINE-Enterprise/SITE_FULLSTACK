const express = require('express');
const AdmController = require('../controllers/admController');

const router = express.Router();

let ctrl = new AdmController();
router.get('/', ctrl.loginView);
router.post('/validar', ctrl.login);
router.get('/home', ctrl.homeView);

//ROTAS PATRIMONIOS
router.get('/listarPatrimonio', ctrl.listagemPatrimonioView);

//ROTAS DOAÇÕES
router.get('/listarDoacao', ctrl.listagemDoacaoView);

//ROTAS EVENTO
router.get('/listarEvento', ctrl.listagemEventoView);
router.get('/addEvento',ctrl.cadastroEventoView);
router.post('/addEvento',ctrl.cadastrarEvento);
router.get('/alterarEvento', ctrl.alterarEventoView);
router.put('/alterarEvento/:id', ctrl.alterarEvento);

module.exports = router;