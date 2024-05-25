const EventoModel = require("../models/eventoModel");
const PatrimonioModel = require("../models/patrimonioModel");

class EventoController {

    //EVENTO

    async relatorioEventoView(req, res){
        console.log(req.params.id);

        let evento = new EventoModel();
        let eventoSelecionado = await evento.obterIdEvento(req.params.id);

        res.render('admin/eventoAdm/relatorioEvento', {evento: eventoSelecionado, layout: 'admin/layoutAdm'});
    }

    async listagemEventoView(req, res){
        let evento = new EventoModel();
        let listaEvento = await evento.listarEvento();

        res.render('admin/eventoAdm/listarEvento', {layout: 'admin/layoutAdm', listaEvento: listaEvento})
    }

    async filtrar(req, res) {
        let termo = req.params.termo;
        let filtro = req.params.filtro;
        console.log(termo)
        let EventoFiltro = new EventoModel();
        var lista = await EventoFiltro.listarEvento(termo, filtro);

        res.send(lista);
    }

    async cadastroEventoView(req, resp){
        let listaPatrimonio = [];
        let patrimonio = new PatrimonioModel();
        listaPatrimonio = await patrimonio.listarPatrimonio();

        resp.render("admin/eventoAdm/addEvento", {layout: 'admin/layoutAdm', listaPatrimonio: listaPatrimonio});
    }

    async cadastrarEvento(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.nome != "" && req.body.data != "" && req.body.local != "" && req.body.desc != "" && req.body.patrimonio  != '0' && req.body.quantidade > '0') {
            let evento = new EventoModel(0, req.body.nome, req.body.data, req.body.local, req.body.desc, req.body.patrimonio, req.body.quantidade);

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

        let patrimonio = new PatrimonioModel();
        let evento = new EventoModel();
        let eventoSelecionado = await evento.obterIdEvento(req.params.id);

        let listaPatrimonio = await patrimonio.listarPatrimonio();

        res.render('admin/eventoAdm/alterarEvento', {evento: eventoSelecionado, listaPatrimonio: listaPatrimonio, layout: 'admin/layoutAdm'});
    }

    async alterarEvento(req, resp){
        let msg = "";
        let cor = "";
        let id = req.params.id;

        if(req.body.nome != "" && req.body.data != "" && req.body.local != "" && req.body.desc != "" && req.body.patrimonio  != '0' && req.body.quantidade > '0') {
            let evento = new EventoModel(0, req.body.nome, req.body.data, req.body.local, req.body.desc, req.body.patrimonio, req.body.quantidade);

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
        let evento = new EventoModel(id, null, null, null, null, null, null, null);

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

module.exports = EventoController;