const express = require('express');
const DoacaoController = require('../controllers/doacaoController')
const AuthMiddleware = require('../middlewares/authMiddleware');

const routerDoacao = express.Router();

let auth = new AuthMiddleware();
let ctrl = new DoacaoController();

//ROTA DOAÇÃO
routerDoacao.get('/', auth.verificarUsuarioLogado, ctrl.escolherDoacaoView);

//ROTAS DOAÇÕES MONETÁRIAS
routerDoacao.get('/listarDoacaoMonetaria', auth.verificarUsuarioLogado, ctrl.listagemDoacaoMonetariaView);
routerDoacao.get('/doacaoMonetariaAdm', auth.verificarUsuarioLogado, ctrl.cadastroDoacaoMonetariaView);
routerDoacao.post('/doacaoMonetariaAdm', auth.verificarUsuarioLogado, ctrl.cadastrarDoacaoMonataria);
routerDoacao.get('/alterarDoacaoMonetaria/:id', auth.verificarUsuarioLogado, ctrl.alterarDoacaoMonetariaView);
routerDoacao.put('/alterarDoacaoMonetaria/:id', auth.verificarUsuarioLogado, ctrl.alterarDoacaoMonetaria);
routerDoacao.delete('/excluirDoacaoMonetaria/:id', auth.verificarUsuarioLogado, ctrl.excluirDoacaoMonetaria);

//ROTAS DOAÇÕES MATERIAIS
routerDoacao.get('/listarDoacaoMaterial', auth.verificarUsuarioLogado, ctrl.listagemDoacaoMaterialView);
routerDoacao.get('/doacaoMaterialAdm', auth.verificarUsuarioLogado, ctrl.cadastroDoacaoMaterialView);
routerDoacao.post('/doacaoMaterialAdm', auth.verificarUsuarioLogado, ctrl.cadastrarDoacaoMaterial);
routerDoacao.get('/alterarDoacaoMaterial/:id', auth.verificarUsuarioLogado, ctrl.alterarDoacaoMaterialView);
routerDoacao.put('/alterarDoacaoMaterial/:id', auth.verificarUsuarioLogado, ctrl.alterarDoacaoMaterial);
routerDoacao.delete('/excluirDoacaoMaterial/:id', auth.verificarUsuarioLogado, ctrl.excluirDoacaoMaterial);

module.exports = routerDoacao;