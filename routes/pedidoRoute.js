const express = require('express');
const PedidoController = require('../controllers/pedidoController')
const AuthMiddleware = require('../middlewares/authMiddleware');

const routerPedido = express.Router();

let auth = new AuthMiddleware();
let ctrl = new PedidoController();

// ROTAS PEDIDO
routerPedido.post('/gravarPedido', ctrl.gravar);

module.exports = routerPedido;