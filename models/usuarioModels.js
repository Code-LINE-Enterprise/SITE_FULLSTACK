const Database = require("../utils/database");

const banco = new Database();

class UsuarioModel {

    #usuarioId;
    #usuarioNome;
    #usuarioEmail;
    #usuarioTelefone;
    #usuarioCpf;
    #usuarioGenero;
    #usuarioDataNasc;
    #usuarioCEP;
    #usuarioRua;
    #usuarioNum;
    #usuarioBairro;

    //implementar getter e setter
    get usuarioId() {
        return this.#usuarioId;
    }
    set usuarioId(usuarioId) {
        this.#usuarioId = usuarioId
    }
    get usuarioNome() {
        return this.#usuarioNome;
    }
    set usuarioNome(usuarioNome) {
        this.#usuarioNome = usuarioNome;
    }

    get usuarioEmail() {
        return this.#usuarioEmail;
    }
    set usuarioEmail(usuarioEmail) {
        this.#usuarioEmail = usuarioEmail;
    }

    get usuarioTelefone() {
        return this.#usuarioTelefone;
    }

    set usuarioTelefone(usuarioTelefone) {
        this.#usuarioTelefone = usuarioTelefone;
    }
    get usuarioGenero() {
        return this.#usuarioGenero;
    }

    set usuarioGenero(usuarioGenero){
        this.#usuarioGenero = usuarioGenero;
    }

    get usuarioCpf() {
        return this.#usuarioCpf;
    }
    set usuarioCpf(usuarioCpf) {
        this.#usuarioCpf = usuarioCpf;
    }

    get usuarioDataNasc() {
        return this.#usuarioDataNasc;
    }
    set usuarioDataNasc(usuarioDataNasc) {
        this.#usuarioDataNasc = usuarioDataNasc;
    }

    get usuarioCEP() {
        return this.#usuarioCEP;
    }
    set usuarioCEP(usuarioCEP) {
        this.#usuarioCEP = usuarioCEP;
    }

    get usuarioRua() {
        return this.#usuarioRua;
    }
    set usuarioRua(usuarioRua) {
        this.#usuarioRua = usuarioRua;
    }

    get usuarioNum() {
        return this.#usuarioNum;
    }
    set usuarioNum(usuarioNum) {
        this.#usuarioNum = usuarioNum;
    }

    get usuarioBairro() {
        return this.#usuarioBairro;
    }
    set usuarioBairro(usuarioBairro) {
        this.#usuarioBairro = usuarioBairro;
    }

    //implementar construtor
    constructor(usuarioId, usuarioNome, usuarioEmail, usuarioTelefone, usuarioCpf, usuarioGenero, usuarioDataNasc, usuarioCEP, usuarioRua, usuarioNum, usuarioBairro) {
        this.#usuarioId = usuarioId;
        this.#usuarioNome = usuarioNome;
        this.#usuarioEmail = usuarioEmail;
        this.#usuarioTelefone = usuarioTelefone;
        this.#usuarioCpf = usuarioCpf;
        this.#usuarioGenero = usuarioGenero;
        this.#usuarioDataNasc = usuarioDataNasc;
        this.#usuarioCEP = usuarioCEP;
        this.#usuarioRua = usuarioRua;
        this.#usuarioNum = usuarioNum;
        this.#usuarioBairro = usuarioBairro;
    }

    //implementar as funções para manipulação das informações no banco
    async listar() {

        let sql = "select * from tb_usuario";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for(let i = 0; i < rows.length; i++) {
            lista.push(new UsuarioModel(rows[i]["usu_id"], rows[i]["usu_nome"], rows[i]["usu_email"], rows[i]["usu_tel"], rows[i]["usu_cpf"], rows[i]["usu_gen"], rows[i]["usu_dataNasc"], rows[i]["usu_cep"], rows[i]["usu_rua"], rows[i]["usu_num"], rows[i]["usu_bairro"]));
        }
        return lista;
    }

    async cadastrar() {
        if(this.#usuarioId == 0) {
            let sql = "insert into tb_usuario (usu_email, usu_nome, usu_tel, usu_cpf, usu_gen, usu_dataNasc, usu_cep, usu_rua, usu_num, usu_bairro) values (?,?,?,?,?,?,?,?,?,?)";

            let valores = [this.#usuarioEmail, this.#usuarioNome, this.#usuarioTelefone, this.#usuarioCpf, this.#usuarioGenero, this.#usuarioDataNasc, this.#usuarioCEP, this.#usuarioRua, this.#usuarioNum, this.#usuarioBairro];
    
            let result = await banco.ExecutaComandoNonQuery(sql, valores);
    
            return result;
        }
        else{
            let sql = "update tb_usuario set usu_email = ?, usu_nome = ?, usu_tel = ?, usu_cpf = ?, usu_gen = ?, usu_dataNasc = ?, usu_cep = ?, usu_rua = ?, usu_num = ?, usu_bairro = ? where usu_id = ?";

            let valores = [this.#usuarioEmail, this.#usuarioNome, this.#usuarioTelefone, this.#usuarioCpf, this.#usuarioGenero, this.#usuarioDataNasc, this.#usuarioCEP, this.#usuarioRua, this.#usuarioNum, this.#usuarioBairro, this.#usuarioId];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
    }

    async obter(id) {
        let sql = "select * from tb_usuario where usu_id = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new UsuarioModel(row["usu_id"], row["usu_nome"], row["usu_email"], row["usu_tel"], row["usu_cpf"], row["usu_gen"], row["usu_dataNasc"], row["usu_cep"], row["usu_rua"], row["usu_num"], row["usu_bairro"]);
        }

        return null;
    }

    async excluir(id) {
        let sql = "delete from tb_usuario where usu_id = ?";

        let valores = [id];
        
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}

module.exports = UsuarioModel;