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

module.exports = router;