const express = require('express');
const voluntarioController = require('../controllers/voluntarioController');

let ctrl = new voluntarioController();

let router = express.Router();
//router.get('/',ctrl.listagemView);
router.get('/contact',ctrl.cadastroView);
router.post('/contact',ctrl.cadastrar);
//router.get('/alterar/:id', ctrl.alterarView);

module.exports = router;