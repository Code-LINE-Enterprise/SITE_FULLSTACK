const express = require('express');
const EventoController = require('../controllers/eventoController')
const AuthMiddleware = require('../middlewares/authMiddleware');

const routerEvento = express.Router();

let auth = new AuthMiddleware();
let ctrl = new EventoController();

//ROTAS EVENTO
routerEvento.get('/', auth.verificarUsuarioLogado, ctrl.listagemEventoView);
routerEvento.get("/filtrar/:termo/:filtro", auth.verificarUsuarioLogado, ctrl.filtrar);
routerEvento.get('/addEvento', auth.verificarUsuarioLogado, ctrl.cadastroEventoView);
routerEvento.post('/addEvento', auth.verificarUsuarioLogado, ctrl.cadastrarEvento);
routerEvento.get('/possivelStatus', auth.verificarUsuarioLogado, ctrl.obterPossivelStatus);
routerEvento.get('/alterarEvento/:id', auth.verificarUsuarioLogado, ctrl.alterarEventoView);
routerEvento.put('/alterarEvento/:id', auth.verificarUsuarioLogado, ctrl.alterarEvento);
routerEvento.delete('/excluirEvento/:id', auth.verificarUsuarioLogado, ctrl.excluirEvento);
routerEvento.get('/relatorioEvento/:id', auth.verificarUsuarioLogado, ctrl.relatorioEventoView);

module.exports = routerEvento;