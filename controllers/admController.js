class AdmController {

    loginView(req, res) {
        res.render('admin/login', {layout: 'admin/login'});
    }

    login(req, res) {
        let msg = "";
        if(req.body.AdmEmail == "admin@teste.br" && req.body.AdmPassword == "123abc") {
            res.redirect('home');
        }
        else {
            msg = "Usuário/Senha incorretos!";
        }
        res.render('admin/login', {msg: msg, layout: 'admin/login'});
    }

    homeView(req, res){
        res.render('admin/home', {layout: 'admin/home'});
    }

    listagemPatrimonioView(req, res){
        res.render('admin/patrimonioAdm/listarPatrimonio', {layout: 'admin/patrimonioAdm/listarPatrimonio'})
    }

    listagemEventoView(req, res){
        res.render('admin/eventoAdm/listarEvento', {layout: 'admin/eventoAdm/listarEvento'})
    }

    listagemDoacaoView(req, res){
        res.render('admin/doacaoAdm/listarDoacaoAdm', {layout: 'admin/doacaoAdm/listarDoacaoAdm'})
    }
}

module.exports = AdmController;