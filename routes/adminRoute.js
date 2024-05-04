const express = require('express');
const AdmController = require('../controllers/admController');
const AuthMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

let auth = new AuthMiddleware();
let ctrl = new AdmController();

//ROTAS LOGIN
router.get('/', ctrl.loginView);
router.post('/validar', ctrl.login);

//HOME
router.get('/home', auth.verificarUsuarioLogado, ctrl.homeView);

//ROTAS PATRIMONIOS
router.get('/listarPatrimonio', auth.verificarUsuarioLogado, ctrl.listagemPatrimonioView);
router.get('/addPatrimonio', auth.verificarUsuarioLogado, ctrl.cadastroPatrimonioView);
router.post('/addPatrimonio', auth.verificarUsuarioLogado, ctrl.cadastrarPatrimonio);
router.get('/alterarPatrimonio/:id', auth.verificarUsuarioLogado, ctrl.alterarPatrimonioView);
router.put('/alterarPatrimonio/:id', auth.verificarUsuarioLogado, ctrl.alterarPatrimonio);
router.delete('/excluirPatrimonio/:id', auth.verificarUsuarioLogado, ctrl.excluirPatrimonio);

//ROTAS DOAÇÕES
router.get('/listarDoacao', auth.verificarUsuarioLogado, ctrl.listagemDoacaoView);
router.get('/doacaoAdm', auth.verificarUsuarioLogado, ctrl.cadastroDoacaoView);
router.post('/doacaoAdm', auth.verificarUsuarioLogado, ctrl.cadastrarDoacao);

//ROTAS EVENTO
router.get('/listarEvento', auth.verificarUsuarioLogado, ctrl.listagemEventoView);
router.get('/addEvento', auth.verificarUsuarioLogado, ctrl.cadastroEventoView);
router.post('/addEvento', auth.verificarUsuarioLogado, ctrl.cadastrarEvento);
router.get('/alterarEvento/:id', auth.verificarUsuarioLogado, ctrl.alterarEventoView);
router.put('/alterarEvento/:id', auth.verificarUsuarioLogado, ctrl.alterarEvento);
router.delete('/excluirEvento/:id', auth.verificarUsuarioLogado, ctrl.excluirEvento);

//ROTAS USUARIO
router.get('/listarUsuario', auth.verificarUsuarioLogado, ctrl.listagemView);
router.get('/addUsuario', auth.verificarUsuarioLogado, ctrl.cadastroView);
router.post('/addUsuario', auth.verificarUsuarioLogado, ctrl.cadastrar);
router.get('/alterarUsuario/:id', auth.verificarUsuarioLogado, ctrl.alterarView);
router.post("/alterarUsuario", auth.verificarUsuarioLogado, ctrl.alterar);
router.post("/excluirUsuario", auth.verificarUsuarioLogado, ctrl.excluir);

//ROTAS PERFIL
router.get('/listarPerfil', auth.verificarUsuarioLogado, ctrl.listagemPerfilView);

module.exports = router;