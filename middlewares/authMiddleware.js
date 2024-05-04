const UsuarioModel = require("../models/usuarioModel");

class AuthMiddleware {

    async verificarUsuarioLogado(req, res, next) {
        if(req.cookies != undefined && req.cookies.usuarioLogado != null){
            let usuarioId = req.cookies.usuarioLogado;
            let usuario = new UsuarioModel();
            usuario = await usuario.obter(usuarioId);
            if(usuario != null && usuario.usuarioAtivo == 1) {
                next();
            }
            else{
                res.redirect("/admin");
            }
        }
        else{
            res.redirect("/admin");
        }
    }

}

module.exports = AuthMiddleware;