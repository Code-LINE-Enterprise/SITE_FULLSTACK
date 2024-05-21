const express = require('express');
const UsuarioController = require('../controllers/usuarioController')
const AuthMiddleware = require('../middlewares/authMiddleware');

const routerUsuario = express.Router();

let auth = new AuthMiddleware();
let ctrl = new UsuarioController();

//ROTAS USUARIO
routerUsuario.get('/', auth.verificarUsuarioLogado, ctrl.listagemView);
routerUsuario.get('/addUsuario', auth.verificarUsuarioLogado, ctrl.cadastroView);
routerUsuario.post('/addUsuario', auth.verificarUsuarioLogado, ctrl.cadastrar);
routerUsuario.get('/alterarUsuario/:id', auth.verificarUsuarioLogado, ctrl.alterarUsuarioView);
routerUsuario.post("/alterarUsuario", auth.verificarUsuarioLogado, ctrl.alterar);
routerUsuario.post("/excluirUsuario", auth.verificarUsuarioLogado, ctrl.excluir);

//ROTAS PERFIL
routerUsuario.get('/listarPerfil', auth.verificarUsuarioLogado, ctrl.listagemPerfilView);


module.exports = routerUsuario;