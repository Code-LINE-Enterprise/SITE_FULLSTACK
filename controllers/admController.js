const EventoModel = require("../models/eventoModel");

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

    async listagemEventoView(req, res){
        let evento = new EventoModel();
        let listaEvento = await evento.listarEvento();

        res.render('admin/eventoAdm/listarEvento', {layout: 'admin/eventoAdm/listarEvento', listaEvento: listaEvento})
    }

    listagemDoacaoView(req, res){
        res.render('admin/doacaoAdm/listarDoacaoAdm', {layout: 'admin/doacaoAdm/listarDoacaoAdm'})
    }

    cadastroEventoView(req, resp){
        resp.render("admin/eventoAdm/addEvento", {layout: 'admin/eventoAdm/addEvento'});
    }

    async cadastrarEvento(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.data != "" && req.body.local != "") {
            let evento = new EventoModel(0, req.body.data, req.body.local);

            let result = await evento.cadastrarEvento();

            if(result) {
                resp.send({
                    ok: true,
                    msg: "Usuário cadastrado com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao cadastrar usuário!"
                });
            }
        }
        else
        {
            resp.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }

    }

    async alterarEventoView(req, res){
        console.log(req.params.id);

        let evento = new EventoModel();
        let eventoSelecionado = await evento.obterIdEvento(req.params.id);

        res.render('admin/eventoAdm/alterarEvento', {evento: eventoSelecionado, layout: 'admin/eventoAdm/alterarEvento'});
    }

    async alterarEvento(req, resp){
        let msg = "";
        let cor = "";
        let id = req.params.id;

        if(req.body.data != "" && req.body.local != "") {
            let evento = new EventoModel (id, req.body.data, req.body.local);

            let result = await evento.alterarEvento();

            if(result){
                resp.send({
                    ok: true,
                    msg: "Evento editado com sucesso!"
                });
            }
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao editar evento!"
                })
            }
        }
        else
        {
            resp.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }

    async excluirEvento(req, resp){
        let id = req.params.id;
        let evento = new EventoModel(id, null, null, null);

        let result = await evento.excluirEvento();
        
        if(result){
            resp.send({
                ok: true,
                msg: "Evento excluido com sucesso!"
            });
        }
        else{
            resp.send({
                ok: false,
                msg: "Erro ao excluir evento!"
            })
        }

    }
}

module.exports = AdmController;