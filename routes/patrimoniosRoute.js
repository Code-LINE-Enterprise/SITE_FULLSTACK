const express = require('express');
const PatrimonioController = require('../controllers/patrimonioController')
const AuthMiddleware = require('../middlewares/authMiddleware');

const routerPatrimonio = express.Router();

let auth = new AuthMiddleware();
let ctrl = new PatrimonioController();

//ROTAS PATRIMONIOS
routerPatrimonio.get('/', auth.verificarUsuarioLogado, ctrl.listagemPatrimonioView);
routerPatrimonio.get("/filtrar/:termo/:filtro", auth.verificarUsuarioLogado, ctrl.filtrar);
routerPatrimonio.get('/addPatrimonio', auth.verificarUsuarioLogado, ctrl.cadastroPatrimonioView);
routerPatrimonio.post('/addPatrimonio', auth.verificarUsuarioLogado, ctrl.cadastrarPatrimonio);
routerPatrimonio.get('/alterarPatrimonio/:id', auth.verificarUsuarioLogado, ctrl.alterarPatrimonioView);
routerPatrimonio.put('/alterarPatrimonio/:id', auth.verificarUsuarioLogado, ctrl.alterarPatrimonio);
routerPatrimonio.delete('/excluirPatrimonio/:id', auth.verificarUsuarioLogado, ctrl.excluirPatrimonio);
routerPatrimonio.get('/alocacao', auth.verificarUsuarioLogado, ctrl.alocarView);
routerPatrimonio.get('/listar', auth.verificarUsuarioLogado, ctrl.listarAlocacaoView);
routerPatrimonio.post('/alocacao', auth.verificarUsuarioLogado, ctrl.alocarPatrimonio);

module.exports = routerPatrimonio;