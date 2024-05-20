const express = require('express');
const multer = require('multer');
const AdmController = require('../controllers/admController');
const AuthMiddleware = require('../middlewares/authMiddleware');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/img/produtos");
    },
    filename: function(req, file, cb) {
        let ext = file.originalname.split(".").pop();
        //ou
        //
        //let ext = file.originalname.split(".").slice(-1)[0]
        let novoNome = Date.now().toString() + "." + ext;
        cb(null, novoNome);
    }
})

let upload = multer({storage});

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

//ROTA DOAÇÃO
router.get('/escolherDoacao', auth.verificarUsuarioLogado, ctrl.escolherDoacaoView);

//ROTAS DOAÇÕES MONETÁRIAS
router.get('/listarDoacaoMonetaria', auth.verificarUsuarioLogado, ctrl.listagemDoacaoMonetariaView);
router.get('/doacaoMonetariaAdm', auth.verificarUsuarioLogado, ctrl.cadastroDoacaoMonetariaView);
router.post('/doacaoMonetariaAdm', auth.verificarUsuarioLogado, ctrl.cadastrarDoacaoMonataria);
router.get('/alterarDoacaoMonetaria/:id', auth.verificarUsuarioLogado, ctrl.alterarDoacaoMonetariaView);
router.put('/alterarDoacaoMonetaria/:id', auth.verificarUsuarioLogado, ctrl.alterarDoacaoMonetaria);
router.delete('/excluirDoacaoMonetaria/:id', auth.verificarUsuarioLogado, ctrl.excluirDoacaoMonetaria);

//ROTAS DOAÇÕES MATERIAIS
router.get('/listarDoacaoMaterial', auth.verificarUsuarioLogado, ctrl.listagemDoacaoMaterialView);
router.get('/doacaoMaterialAdm', auth.verificarUsuarioLogado, ctrl.cadastroDoacaoMaterialView);
router.post('/doacaoMaterialAdm', auth.verificarUsuarioLogado, ctrl.cadastrarDoacaoMaterial);
router.get('/alterarDoacaoMaterial/:id', auth.verificarUsuarioLogado, ctrl.alterarDoacaoMaterialView);
router.put('/alterarDoacaoMaterial/:id', auth.verificarUsuarioLogado, ctrl.alterarDoacaoMaterial);
router.delete('/excluirDoacaoMaterial/:id', auth.verificarUsuarioLogado, ctrl.excluirDoacaoMaterial);

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
router.get('/alterarUsuario/:id', auth.verificarUsuarioLogado, ctrl.alterarUsuarioView);
router.post("/alterarUsuario", auth.verificarUsuarioLogado, ctrl.alterar);
router.post("/excluirUsuario", auth.verificarUsuarioLogado, ctrl.excluir);

//ROTAS PERFIL
router.get('/listarPerfil', auth.verificarUsuarioLogado, ctrl.listagemPerfilView);

//ROTAS PRODUTO
router.get('/listarProduto', auth.verificarUsuarioLogado, ctrl.listarProdutoView);
router.get('/cadastroProduto', auth.verificarUsuarioLogado, ctrl.cadastroProdutoView);
router.post("/cadastroProduto", auth.verificarUsuarioLogado, upload.single("imagem"), ctrl.cadastrarProduto);
router.post("/excluirProduto", auth.verificarUsuarioLogado, ctrl.excluirProduto);
router.get("/alterarProduto/:id", auth.verificarUsuarioLogado, ctrl.alterarView);
router.post("/alterarProduto", auth.verificarUsuarioLogado, upload.single("imagem"), ctrl.alterarProdutoView);
router.get("/obter/:produto", ctrl.obter);

// ROTAS PEDIDO
router.post('/gravarPedido', ctrl.gravar);

module.exports = router;