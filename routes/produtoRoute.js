const express = require('express');
const multer = require('multer');
const ProdutoController = require('../controllers/produtoController');
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

const routerProduto = express.Router();

let auth = new AuthMiddleware();
let ctrl = new ProdutoController();

//ROTAS PRODUTO
routerProduto.get('/', auth.verificarUsuarioLogado, ctrl.listarProdutoView);
routerProduto.get('/cadastroProduto', auth.verificarUsuarioLogado, ctrl.cadastroProdutoView);
routerProduto.post("/cadastroProduto", auth.verificarUsuarioLogado, upload.single("imagem"), ctrl.cadastrarProduto);
routerProduto.post("/excluirProduto", auth.verificarUsuarioLogado, ctrl.excluirProduto);
routerProduto.get("/alterarProduto/:id", auth.verificarUsuarioLogado, ctrl.alterarView);
routerProduto.post("/alterarProduto", auth.verificarUsuarioLogado, upload.single("imagem"), ctrl.alterarProdutoView);
routerProduto.get("/obter/:produto", ctrl.obter);


module.exports = routerProduto;