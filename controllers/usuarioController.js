const PerfilModel = require("../models/perfilModel");
const UsuarioModel = require("../models/usuarioModel");

class UsuarioController {

//PERFIL
async listagemPerfilView(req, res) {
    let perfilModel = new PerfilModel();
    let lista = await perfilModel.listar();

    res.render('admin/perfilAdm/listarPerfil', { layout: 'admin/layoutAdm', listaPerfil: lista })
}

//USUARIO
async listagemView(req, resp){
    let usuario = new UsuarioModel();
    let listaUsuarios = await usuario.listar()
    
    resp.render("admin/usuariosAdm/listarUsuario", { layout: 'admin/layoutAdm', lista: listaUsuarios });
}

async cadastroView(req, resp){
    let perfil = new PerfilModel(); 
    let listaPerfil = await perfil.listar();
    resp.render("admin/usuariosAdm/addUsuario", {layout: 'admin/layoutAdm', listaPerfil: listaPerfil});
}

async cadastrar(req, resp){
    let msg = "";
    let cor = "";
    if(req.body.email != "" && req.body.senha != "" && req.body.nome != "" &&
    req.body.perfil != '0') {
        let usuario = new UsuarioModel(0, req.body.nome, req.body.email, req.body.senha, req.body.ativo, req.body.perfil);

        let result = await usuario.cadastrar();

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

async alterarUsuarioView(req, res) {
    console.log(req.params);
    let perfil = new PerfilModel(); 
    let listaPerfil = await perfil.listar();
    let usuario = new UsuarioModel();
    usuario = await usuario.obter(req.params.id);
    res.render('admin/usuariosAdm/alterarUsuario', { layout: 'admin/layoutAdm', usuario: usuario, listaPerfil: listaPerfil });
}

async excluir(req, res) {
    if(req.body.id != null) {
        let usuario = new UsuarioModel();
        let ok = await usuario.excluir(req.body.id);
        if(ok) {
            res.send({ok: true});
        }
        else{
            res.send({ok: false, msg: "Erro ao excluir usuário"})
        }
    }
    else{
        res.send({ok: false, msg: "O id para exclusão não foi enviado"})
    }
}

async alterar(req, res) {
    let msg = "";
    let cor = "";
    if(req.body.id > 0 && req.body.email != "" && req.body.senha != "" && req.body.nome != "" &&
    req.body.perfil != '0') {
        let usuario = new UsuarioModel(req.body.id, req.body.nome, req.body.email, req.body.senha, req.body.ativo, req.body.perfil);

        let result = await usuario.cadastrar();

        if(result) {
            res.send({
                ok: true,
                msg: "Usuário alterado com sucesso!"
            });
        }   
        else{
            res.send({
                ok: false,
                msg: "Erro ao alterar usuário!"
            });
        }
    }
    else
    {
        res.send({
            ok: false,
            msg: "Parâmetros preenchidos incorretamente!"
        });
    }
}
}

module.exports = UsuarioController;