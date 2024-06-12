const EventoModel = require("../models/eventoModel");

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
        
        let evento = new EventoModel();
        let eventoStatus = await evento.obterEventoStatus();

        resp.render("admin/eventoAdm/addEvento", {layout: 'admin/layoutAdm', eventoStatus: eventoStatus});
    }

    async cadastrarEvento(req, resp) {
        try {
            // Verifica se todos os parâmetros necessários foram fornecidos e são válidos
            if (req.body.nome && req.body.data && req.body.local && req.body.desc && req.body.eventoStatusId !== '0') {
                // Converte a data do formato string para um objeto Date
                const dataEvento = new Date(req.body.data);
    
                // Validações específicas para dia, mês e ano
                const dia = dataEvento.getDate();
                const mes = dataEvento.getMonth() + 1; // getMonth retorna 0 para janeiro, 1 para fevereiro, etc.
                const ano = dataEvento.getFullYear();
    
                if (dia < 1 || dia > 31) {
                    return resp.status(400).json({ ok: false, msg: 'Dia inválido. Deve estar entre 1 e 31.' });
                }
    
                if (mes < 1 || mes > 12) {
                    return resp.status(400).json({ ok: false, msg: 'Mês inválido. Deve estar entre 1 e 12.' });
                }
    
                if (ano < 2023 || ano > 2026) {
                    return resp.status(400).json({ ok: false, msg: 'Ano inválido. Deve estar entre 2023 e 2026.' });
                }
    
                // Continua com o cadastro do evento se todas as validações foram passadas
                let evento = new EventoModel(0, req.body.nome, req.body.data, req.body.local, req.body.desc, req.body.eventoStatusId);
                let result = await evento.cadastrarEvento();
    
                if (result) {
                    resp.json({ ok: true, msg: 'Evento cadastrado com sucesso!' });
                } else {
                    resp.status(500).json({ ok: false, msg: 'Erro ao cadastrar evento!' });
                }
            } else {
                resp.status(400).json({ ok: false, msg: 'Parâmetros preenchidos incorretamente!' });
            }
        } catch (error) {
            resp.status(500).json({ ok: false, msg: 'Erro ao processar requisição.', error: error.message });
        }
    }

    async obterPossivelStatus(req, res) {
        let eventoStatus = new EventoModel();
        let status = await eventoStatus.obterEventoStatus();
    
        if (status) {
          res.send({
            ok: true,
            data: status,
          });
          return;
        }
        res.send({
          ok: false,
          message: "Erro",
        });
      }

    async alterarEventoView(req, res){
        console.log(req.params.id);

        let evento = new EventoModel();
        let eventoSelecionado = await evento.obterIdEvento(req.params.id);
        
        let statusEvento = new EventoModel();
        let listaStatus = await statusEvento.obterEventoStatus();

        res.render('admin/eventoAdm/alterarEvento', {evento: eventoSelecionado, listaStatus: listaStatus, layout: 'admin/layoutAdm'});
    }

    async alterarEvento(req, resp){
        let msg = "";
        let cor = "";
        let id = req.params.id;

        if(req.body.nome != "" && req.body.data != "" && req.body.local != "" && req.body.desc != "" && req.body.eventoStatusId  != '0') {
            let evento = new EventoModel(id, req.body.nome, req.body.data, req.body.local, req.body.desc, req.body.eventoStatusId);

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
        let evento = new EventoModel(id, null, null, null, null, null, null);

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