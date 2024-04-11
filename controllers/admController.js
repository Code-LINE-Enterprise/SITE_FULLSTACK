const EventoModel = require("../models/eventoModel");
const PatrimonioModel = require("../models/patrimonioModel");
const DoacaoModel = require("../models/doacaoModel");
const TipoDoacaoModel = require("../models/tipoDoacaoModel");

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

    //EVENTO

    async listagemEventoView(req, res){
        let evento = new EventoModel();
        let listaEvento = await evento.listarEvento();

        res.render('admin/eventoAdm/listarEvento', {layout: 'admin/eventoAdm/listarEvento', listaEvento: listaEvento})
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
                    msg: "Evento cadastrado com sucesso!"
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


    //PATRIMONIOS

    async listagemPatrimonioView(req, res){
        let patrimonio = new PatrimonioModel();
        let listaPatrimonio = await patrimonio.listarPatrimonio();

        res.render('admin/patrimonioAdm/listarPatrimonio', {layout: 'admin/patrimonioAdm/listarPatrimonio', listaPatrimonio: listaPatrimonio})
    }

    cadastroPatrimonioView(req, resp){
        resp.render("admin/patrimonioAdm/addPatrimonio", {layout: 'admin/patrimonioAdm/addPatrimonio'});
    }

    async cadastrarPatrimonio(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.quantidadePatrimonio != "" && req.body.tipoPatrimonio != "" && req.body.nomePatrimonio != "") {
            let patrimonio = new PatrimonioModel(0, req.body.quantidadePatrimonio, req.body.tipoPatrimonio, req.body.nomePatrimonio);

            let result = await patrimonio.cadastrarPatrimonio();

            if(result) {
                resp.send({
                    ok: true,
                    msg: "Patrimonio cadastrado com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao cadastrar patrimonio!"
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

    async alterarPatrimonioView(req, res){
        console.log(req.params.id);

        let patrimonio = new PatrimonioModel();
        let patrimonioSelecionado = await patrimonio.obterIdPatrimonio(req.params.id);

        res.render('admin/patrimonioAdm/alterarPatrimonio', {patrimonio: patrimonioSelecionado, layout: 'admin/patrimonioAdm/alterarPatrimonio'});
    }

    async alterarPatrimonio(req, resp){
        let msg = "";
        let cor = "";
        let id = req.params.id;

        if(req.body.quantidadePatrimonio != "" && req.body.tipoPatrimonio != "" && req.body.nomePatrimonio != "") {
            let patrimonio = new PatrimonioModel(id, req.body.quantidadePatrimonio, req.body.tipoPatrimonio, req.body.nomePatrimonio);

            let result = await patrimonio.alterarPatrimonio();

            if(result){
                resp.send({
                    ok: true,
                    msg: "Patrimonio editado com sucesso!"
                });
            }
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao editar patrimonio!"
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

    async excluirPatrimonio(req, resp){
        let id = req.params.id;
        let patrimonio = new PatrimonioModel(id, null, null, null, null);

        let result = await patrimonio.excluirPatrimonio();
        
        if(result){
            resp.send({
                ok: true,
                msg: "Patrimonio excluido com sucesso!"
            });
        }
        else{
            resp.send({
                ok: false,
                msg: "Erro ao excluir patrimonio!"
            })
        }

    }

    //DOACAO

    async listagemDoacaoView(req, res){

        let doacao = new DoacaoModel();
        let listaDoacao = await doacao.listarDoacao();
        res.render('admin/doacaoAdm/listarDoacaoAdm', {layout: 'admin/doacaoAdm/listarDoacaoAdm', listaDoacao: listaDoacao})
    }

    async cadastroDoacaoView(req, res){
        let tipo = new TipoDoacaoModel();
        let listaTipo = await tipo.listarTipo();

        res.render('admin/doacaoAdm/doacaoAdm', {layout: 'admin/doacaoAdm/doacaoAdm', listaTipo: listaTipo});
    }

    async cadastrarDoacao(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.tipoDoacaoId != "" && req.body.quantDoacao != "" && req.body.valorDoacao != '0' &&
        req.body.descDoacao != '0') {
            let doacao = new DoacaoModel(0, req.body.tipoDoacaoId, req.body.quantDoacao, req.body.valorDoacao, req.body.descDoacao);

            let result = await doacao.cadastrarDoacao();

            if(result) {
                resp.send({
                    ok: true,
                    msg: "Doação cadastrada com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao cadastrar doação!"
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
}

module.exports = AdmController;