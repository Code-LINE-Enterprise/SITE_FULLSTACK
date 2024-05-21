const UsuarioModel = require("../models/usuarioModel");


class AdmController {

    //LOGIN

    loginView(req, res) {
        res.render('admin/login', { layout: 'admin/login' });
    }

    async login(req, res) {
        let msg = "";
        if(req.body.email != null && req.body.password != null) {
            let usuario = new UsuarioModel();
            usuario = await usuario.obterPorEmailSenha(req.body.email, req.body.password);
            if(usuario != null) {
                res.cookie("usuarioLogado", usuario.usuarioId);
                res.redirect("/admin/home");
            }
            else {
                msg = "Usuário/Senha incorretos!";
            }
        }
        else {
            msg = "Usuário/Senha incorretos!";
        }

        res.render('admin/login', { msg: msg, layout: 'admin/login' });
    }

    //HOME
    homeView(req, res){
        res.render('admin/home', {layout: 'admin/layoutAdm'});
    }
}

module.exports = AdmController;