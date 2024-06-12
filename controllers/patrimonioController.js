const EventoModel = require("../models/eventoModel");
const PatEvenModel = require("../models/patEvenModel");
const PatrimonioModel = require("../models/patrimonioModel");

class PatrimonioController {
    
    //PATRIMONIOS
async listagemPatrimonioView(req, res){
    let patrimonio = new PatrimonioModel();
    let listaPatrimonio = await patrimonio.listarPatrimonio();
    res.render('admin/patrimonioAdm/listarPatrimonio', {layout: 'admin/layoutAdm', listaPatrimonio: listaPatrimonio})
}

async filtrar(req, res) {
    let termo = req.params.termo;
    let filtro = req.params.filtro;
    console.log(termo)
    let PatrimonioFiltro = new PatrimonioModel();
    var lista = await PatrimonioFiltro.listarPatrimonio(termo, filtro);

    res.send(lista);
}

cadastroPatrimonioView(req, resp){
    resp.render("admin/patrimonioAdm/addPatrimonio", {layout: 'admin/layoutAdm'});
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

    res.render('admin/patrimonioAdm/alterarPatrimonio', {patrimonio: patrimonioSelecionado, layout: 'admin/layoutAdm'});
}

async alterarPatrimonio(req, resp){
    let msg = "";
    let cor = "";
    let id = req.params.id;

    if(req.body.quantidadePatrimonio != "" && req.body.tipoPatrimonio != "" && req.body.nomePatrimonio != "") {
        let patrimonio = new PatrimonioModel(id, req.body.quantidadePatrimonio, req.body.tipoPatrimonio, req.body.nomePatrimonio);

        let result = await patrimonio.updatePatrimonioPorId();

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

async alocarPatrimonio(req, res) {
    const { patrimonio, evento } = req.body;

    if (patrimonio !== "0" && evento !== "0") {
      let patri = new PatrimonioModel();
      let alocado = await patri.alocarPatrimonio(patrimonio, evento);

      if (alocado) {
        res.send({
          ok: true,
          message: "Patrimonio alocado com sucesso!",
        });
        return;
      }
      res.send({
        ok: false,
        message: "Não foi possível alocar patrimonio!",
      });
      return;
    }
    res.send({
      ok: false,
      message: "Patrimonio e Evento obrigatórios para alocação!",
    });
  }

  async alocarView(req, res) {
    let patrimonio = new PatrimonioModel();
    let evenModel = new EventoModel();

    const patrimoniosDisponiveis = await patrimonio.listarPatrimonio()
      .then((r) => r.filter((patrimonio) => !Boolean(patrimonio.alocado)));

      const eventosNaoFinalizados = await evenModel.listarEvento()
      .then((r) => {
        console.log("Eventos retornados:", r); // Verifica se a função está retornando eventos
        const filtrados = r.filter((evento) => {
          console.log("Estrutura do evento:", evento); // Verifica a estrutura de cada evento
          return evento.statusEventoId === 1 || evento.statusEventoId === 2;
        });
        console.log("Eventos filtrados:", filtrados); // Verifica os eventos que foram filtrados
        return filtrados;
      });

    res.render("./admin/alocacao/alocar", {layout: 'admin/layoutAdm', patrimonios: patrimoniosDisponiveis, eventos: eventosNaoFinalizados});
  }

async listarAlocacaoView(req, res){

    var patEven = new PatEvenModel();
    var lista = await patEven.listarInfo();

    res.render('admin/alocacao/listar', {layout: 'admin/layoutAdm', lista: lista  });
}
}

module.exports = PatrimonioController;