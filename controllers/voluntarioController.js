const voluntarioModel = require("../models/voluntarioModel");

class voluntarioController{

    /*
    async listagemView(req, resp){
        let voluntario = new voluntarioModel();
        let listaVoluntarios = await voluntario.listar()
        
        resp.render("voluntarios/listagem", { lista: listaVoluntarios });
    }
    */
    cadastroView(req, resp){
        resp.render("voluntarios/contact");
    }

    async cadastrar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.email != "" && req.body.senha != "" && req.body.nome != "" &&
        req.body.perfil != '0') {
            let voluntario = new voluntarioModel(0, req.body.nome, req.body.email, req.body.senha, req.body.ativo, req.body.perfil);

            let result = await voluntario.cadastrar();

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
/*
    alterarView(req, res) {
        console.log(req.params);
        res.render('voluntarios/alterar');
    }
*/
}

module.exports = voluntarioController;