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
}

module.exports = PatrimonioController;