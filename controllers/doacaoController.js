const DoacaoMaterialModel = require("../models/doacaoMaterialModel");
const DoacaoMonetariaModel = require("../models/doacaoMonetariaModel");
const TipoDoacaoMaterialModel = require("../models/tipoDoacaoMaterialModel");
const TipoDoacaoMonetariaModel = require("../models/tipoDoacaoMonetariaModel");

class DoacaoController {

    //DOACAO
    async escolherDoacaoView(req, res){
        res.render('admin/doacaoAdm/escolherDoacao', {layout: 'admin/layoutAdm'})
    }

    //DOAÇÃO MONETÁRIA
    async listagemDoacaoMonetariaView(req, res){

        let doacaoMonetaria = new DoacaoMonetariaModel();
        let listaDoacaoMonetaria = await doacaoMonetaria.listarDoacaoMonetaria();
        res.render('admin/doacaoAdm/doacaoMonetaria/listarDoacaoMonetaria', {layout: 'admin/layoutAdm', listaDoacaoMonetaria: listaDoacaoMonetaria})
    }

    async cadastroDoacaoMonetariaView(req, res){
        let tipoMonetario = new TipoDoacaoMonetariaModel();
        let listaTipoMonetario = await tipoMonetario.listarTipoMonetario();

        res.render('admin/doacaoAdm/doacaoMonetaria/addDoacaoMonetaria', {layout: 'admin/layoutAdm', listaTipoMonetario: listaTipoMonetario});
    }

    async cadastrarDoacaoMonataria(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.tipoDoacaoMonetariaId != "" && req.body.valorDoacao != '0') {
            let doacaoMonetaria = new DoacaoMonetariaModel(0, req.body.tipoDoacaoMonetariaId, req.body.valorDoacao);

            let result = await doacaoMonetaria.cadastrarDoacaoMonetaria();

            if(result) {
                resp.send({
                    ok: true,
                    msg: "Doação monetária cadastrada com sucesso!"
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

    async alterarDoacaoMonetariaView(req, res){
        console.log(req.params.id);

        let tipoMonetario = new TipoDoacaoMonetariaModel();
        let listaTipoMonetario = await tipoMonetario.listarTipoMonetario();
        let doacaoMonetaria = new DoacaoMonetariaModel();
        let doacaoSelecionado = await doacaoMonetaria.obterIdDoacaoMonetaria(req.params.id);

        res.render('admin/doacaoAdm/doacaoMonetaria/alterarDoacaoMonetaria', {doacaoMonetaria: doacaoSelecionado, listaTipoMonetario: listaTipoMonetario, layout: 'admin/layoutAdm'});
    }

    async alterarDoacaoMonetaria(req, resp){
        let msg = "";
        let cor = "";
        let id = req.params.id;

        if(req.body.tipoDoacaoMonetariaId != "" && req.body.valorDoacao != "") {
            let doacaoMonetaria = new DoacaoMonetariaModel(id, req.body.tipoDoacaoMonetariaId, req.body.valorDoacao);

            let result = await doacaoMonetaria.alterarDoacaoMonetaria();

            if(result){
                resp.send({
                    ok: true,
                    msg: "Doação editada com sucesso!"
                });
            }
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao editar doação!"
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

    async excluirDoacaoMonetaria(req, resp){
        let id = req.params.id;
        let doacaoMonetaria = new DoacaoMonetariaModel(id, null, null, null);

        let result = await doacaoMonetaria.excluirDoacaoMonetaria();
        
        if(result){
            resp.send({
                ok: true,
                msg: "Doação monetária excluida com sucesso!"
            });
        }
        else{
            resp.send({
                ok: false,
                msg: "Erro ao excluir doação!"
            })
        }

    }

    //DOAÇÃO MATERIAL
    async listagemDoacaoMaterialView(req, res){
        let doacao = new DoacaoMaterialModel();
        let listaDoacao = await doacao.listarDoacaoMaterial();
        res.render('admin/doacaoAdm/doacaoMaterial/listarDoacaoMaterial', {layout: 'admin/layoutAdm', listaDoacao: listaDoacao})
    }

    async cadastroDoacaoMaterialView(req, res){
        let tipo = new TipoDoacaoMaterialModel();
        let listaTipo = await tipo.listarTipoMaterial();

        res.render('admin/doacaoAdm/doacaoMaterial/addDoacaoMaterial', {layout: 'admin/layoutAdm', listaTipo: listaTipo});
    }

    async cadastrarDoacaoMaterial(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.tipoDoacaoMaterialId != "" && req.body.quantDoacao != "") {
            let doacao = new DoacaoMaterialModel(0, req.body.tipoDoacaoMaterialId, req.body.quantDoacao);

            let result = await doacao.cadastrarDoacaoMaterial();

            if(result) {
                resp.send({
                    ok: true,
                    msg: "Doação material cadastrada com sucesso!"
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

    async alterarDoacaoMaterialView(req, res){
        console.log(req.params.id);

        let tipo = new TipoDoacaoMaterialModel();
        let listaTipo = await tipo.listarTipoMaterial();
        let doacao = new DoacaoMaterialModel();
        let doacaoSelecionado = await doacao.obterIdDoacaoMaterial(req.params.id);

        res.render('admin/doacaoAdm/doacaoMaterial/alterarDoacaoMaterial', {doacao: doacaoSelecionado, listaTipo: listaTipo, layout: 'admin/layoutAdm'});
    }

    async alterarDoacaoMaterial(req, resp){
        let msg = "";
        let cor = "";
        let id = req.params.id;

        if(req.body.tipoDoacaoMaterialId != "" && req.body.quantDoacao != "") {
            let doacao = new DoacaoMaterialModel(id, req.body.tipoDoacaoMaterialId, req.body.quantDoacao);

            let result = await doacao.alterarDoacaoMaterial();

            if(result){
                resp.send({
                    ok: true,
                    msg: "Doação editada com sucesso!"
                });
            }
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao editar doação!"
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

    async excluirDoacaoMaterial(req, resp){
        let id = req.params.id;
        let doacao = new DoacaoMaterialModel(id, null, null, null);

        let result = await doacao.excluirDoacaoMaterial();
        
        if(result){
            resp.send({
                ok: true,
                msg: "Doação excluida com sucesso!"
            });
        }
        else{
            resp.send({
                ok: false,
                msg: "Erro ao excluir doação!"
            })
        }

    }

}

module.exports = DoacaoController;