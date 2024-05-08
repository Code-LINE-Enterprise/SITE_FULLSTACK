const EventoModel = require("../models/eventoModel");
const PatrimonioModel = require("../models/patrimonioModel");
const DoacaoModel = require("../models/doacaoModel");
const TipoDoacaoModel = require("../models/tipoDoacaoModel");
const UsuarioModel = require("../models/usuarioModel");
const PerfilModel = require("../models/perfilModel");
const CategoriaModel = require("../models/categoriaModel");
const MarcaModel = require("../models/marcaModel");
const ProdutoModel = require("../models/produtoModel");
const fs = require("fs");

class AdmController {

    //LOGIN

    loginView(req, res) {
        res.render('admin/login', { layout: 'admin/login' });
    }

    async login(req, res) {
        let msg = "";
        if(req.body.email != null && req.body.password != null) {
            let usuario = new UsuarioModel();
            usuario = await usuario.obterPorEmailSenha(req.body.email, req.body.password);
            if(usuario != null) {
                res.cookie("usuarioLogado", usuario.usuarioId);
                res.redirect("/admin/home");
            }
            else {
                msg = "Usuário/Senha incorretos!";
            }
        }
        else {
            msg = "Usuário/Senha incorretos!";
        }

        res.render('admin/login', { msg: msg, layout: 'admin/login' });
    }

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

    //HOME
    homeView(req, res){
        res.render('admin/home', {layout: 'admin/layoutAdm'});
    }

    //EVENTO
    async listagemEventoView(req, res){
        let evento = new EventoModel();
        let listaEvento = await evento.listarEvento();

        res.render('admin/eventoAdm/listarEvento', {layout: 'admin/layoutAdm', listaEvento: listaEvento})
    }

    cadastroEventoView(req, resp){
        resp.render("admin/eventoAdm/addEvento", {layout: 'admin/layoutAdm'});
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

        res.render('admin/eventoAdm/alterarEvento', {evento: eventoSelecionado, layout: 'admin/layoutAdm'});
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

        res.render('admin/patrimonioAdm/listarPatrimonio', {layout: 'admin/layoutAdm', listaPatrimonio: listaPatrimonio})
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

    //DOACAO
    async listagemDoacaoView(req, res){

        let doacao = new DoacaoModel();
        let listaDoacao = await doacao.listarDoacao();
        res.render('admin/doacaoAdm/listarDoacaoAdm', {layout: 'admin/layoutAdm', listaDoacao: listaDoacao})
    }

    async cadastroDoacaoView(req, res){
        let tipo = new TipoDoacaoModel();
        let listaTipo = await tipo.listarTipo();

        res.render('admin/doacaoAdm/doacaoAdm', {layout: 'admin/layoutAdm', listaTipo: listaTipo});
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
    
    // PRODUTO

    async listarProdutoView(req, res) {
        let prod = new ProdutoModel();
        let lista = await prod.listarProdutos();
        res.render('admin/produto/listar', {layout: 'admin/layoutAdm' , lista: lista});
    }

    async excluirProduto(req, res){
        var ok = true;
        if(req.body.codigo != "") {
            let produto = new ProdutoModel();
            ok = await produto.excluir(req.body.codigo);
        }
        else{
            ok = false;
        }

        res.send({ok: ok});
    }
    async cadastrarProduto(req, res){
        var ok = true;
        if(req.body.codigo != "" && req.body.nome != "" && 
        req.body.quantidade != "" && req.body.quantidade  != '0' && 
        req.body.marca != '0' && req.body.categoria  != '0' && req.body.valor > 0) {
            let arquivo = req.file != null ? req.file.filename : null;
            let produto = new ProdutoModel(0, req.body.codigo, 
                req.body.nome, req.body.quantidade, 
                req.body.categoria, req.body.marca, "", "", arquivo, req.body.valor);

            ok = await produto.gravar();
        }
        else{
            ok = false;
        }

        res.send({ ok: ok })
    }

    async alterarView(req, res){
        let produto = new ProdutoModel();
        let marca = new MarcaModel();
        
        let categoria = new CategoriaModel();
        if(req.params.id != undefined && req.params.id != ""){
            produto = await produto.buscarProduto(req.params.id);
        }

        let listaMarca = await marca.listarMarcas();
        let listaCategoria = await categoria.listarCategorias();
        res.render("admin/produto/alterar", {layout: 'admin/layoutAdm', produtoAlter: produto, listaMarcas: listaMarca, listaCategorias: listaCategoria});
    }

    async alterarProdutoView(req, res) {
        var ok = true;
        if(req.body.codigo != "" && req.body.nome != "" && req.body.quantidade != "" && req.body.quantidade  != '0' && req.body.marca != '0' && req.body.categoria  != '0' && req.body.valor > 0) {

            let produtoOld = new ProdutoModel();
            produtoOld = await produtoOld.buscarProduto(req.body.id);
            //apagar a imagem do produto se tiver uma nova imagem na alteração e se o antigo tiver imagem
            let imagem = null
            //se o file tiver preenchido, significa que a imagem será alterada
            if(req.file != null) {
                imagem = req.file.filename;
                //se o meu produto já tiver uma imagem cadastrada, faço a deleção com o fs
                if(produtoOld.possuiImagem) {
                    let imagemAntiga = produtoOld.imagem;
                    fs.unlinkSync(global.RAIZ_PROJETO + "/public/" + imagemAntiga);
                }
            }
            else{ //se não, a imagem antiga deve ser mantida, mas apenas se houver
                if(produtoOld.possuiImagem)
                    imagem = produtoOld.imagem.toString().split("/").pop();
            }

            let produto = new ProdutoModel(req.body.id, req.body.codigo, req.body.nome, req.body.quantidade, req.body.categoria, req.body.marca, "", "", imagem, req.body.valor);
            ok = await produto.gravar();
        }
        else{
            ok = false;
        }

        res.send({ ok: ok })
    }

    async cadastroProdutoView(req, res) {

        let listaMarcas = [];
        let listaCategorias = [];

        let marca = new MarcaModel();
        listaMarcas = await marca.listarMarcas();

        let categoria = new CategoriaModel();
        listaCategorias = await categoria.listarCategorias();

        res.render('admin/produto/cadastro', {layout: 'admin/layoutAdm', listaMarcas: listaMarcas, listaCategorias: listaCategorias });
    }

    async obter(req, res) {
        let id = req.params.produto;
        let produto = new ProdutoModel();
        produto = await produto.buscarProduto(id);

        res.send({produtoEncontrado: produto});
    }

    // MARCA
    async listarView(req, res) {
        let marca = new MarcaModel();
        let lista = await marca.listarMarcas();
        res.render('admin/marca/listar', {lista: lista});
    }

    // CATEGORIA

    async listarView(req, res) {
        let cat = new CategoriaModel
        let lista = await cat.listarCategorias();
        res.render('admin/categoria/listar', {lista: lista});
    }
}

module.exports = AdmController;