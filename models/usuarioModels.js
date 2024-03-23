const Database = require("../utils/database");

const banco = new Database();

class voluntarioModel {

    #voluntarioId;
    #voluntarioNome;
    #voluntarioEmail;
    #voluntarioTelefone;
    #voluntarioCpf;
    #voluntarioGenero;
    #voluntarioDataNasc;
    #voluntarioCEP;
    #voluntarioRua;
    #voluntarioNum;
    #voluntarioBairro;
    #voluntarioEstado;

    //implementar getter e setter
    get voluntarioId() {
        return this.#voluntarioId;
    }
    set voluntarioId(voluntarioId) {
        this.#voluntarioId = voluntarioId
    }
    get voluntarioNome() {
        return this.#voluntarioNome;
    }
    set voluntarioNome(voluntarioNome) {
        this.#voluntarioNome = voluntarioNome;
    }

    get voluntarioEmail() {
        return this.#voluntarioEmail;
    }
    set voluntarioEmail(voluntarioEmail) {
        this.#voluntarioEmail = voluntarioEmail;
    }

    get voluntarioTelefone() {
        return this.#voluntarioTelefone;
    }

    set voluntarioTelefone(voluntarioTelefone) {
        this.#voluntarioTelefone = voluntarioTelefone;
    }
    get voluntarioGenero() {
        return this.#voluntarioGenero;
    }

    set voluntarioGenero(voluntarioGenero){
        this.#voluntarioGenero = voluntarioGenero;
    }

    get voluntarioCpf() {
        return this.#voluntarioCpf;
    }
    set voluntarioCpf(voluntarioCpf) {
        this.#voluntarioCpf = voluntarioCpf;
    }

    get voluntarioDataNasc() {
        return this.#voluntarioDataNasc;
    }
    set voluntarioDataNasc(voluntarioDataNasc) {
        this.#voluntarioDataNasc = voluntarioDataNasc;
    }

    get voluntarioCEP() {
        return this.#voluntarioCEP;
    }
    set voluntarioCEP(voluntarioCEP) {
        this.#voluntarioCEP = voluntarioCEP;
    }

    get voluntarioRua() {
        return this.#voluntarioRua;
    }
    set voluntarioRua(voluntarioRua) {
        this.#voluntarioRua = voluntarioRua;
    }

    get voluntarioNum() {
        return this.#voluntarioNum;
    }
    set voluntarioNum(voluntarioNum) {
        this.#voluntarioNum = voluntarioNum;
    }

    get voluntarioBairro() {
        return this.#voluntarioBairro;
    }
    set voluntarioBairro(voluntarioBairro) {
        this.#voluntarioBairro = voluntarioBairro;
    }

    get voluntarioEstado() {
        return this.#voluntarioEstado;
    }
    set voluntarioEstado(voluntarioEstado) {
        this.#voluntarioEstado = voluntarioEstado;
    }

    //implementar construtor
    constructor(voluntarioId, voluntarioNome, voluntarioEmail, voluntarioTelefone, voluntarioCpf, voluntarioGenero, voluntarioDataNasc, voluntarioCEP, voluntarioRua, voluntarioNum, voluntarioBairro, voluntarioEstado) {
        this.#voluntarioId = voluntarioId;
        this.#voluntarioNome = voluntarioNome;
        this.#voluntarioEmail = voluntarioEmail;
        this.#voluntarioTelefone = voluntarioTelefone;
        this.#voluntarioCpf = voluntarioCpf;
        this.#voluntarioGenero = voluntarioGenero;
        this.#voluntarioDataNasc = voluntarioDataNasc;
        this.#voluntarioCEP = voluntarioCEP;
        this.#voluntarioRua = voluntarioRua;
        this.#voluntarioNum = voluntarioNum;
        this.#voluntarioBairro = voluntarioBairro;
        this.#voluntarioEstado = voluntarioEstado;
    }

    //implementar as funções para manipulação das informações no banco
    async listar() {

        let sql = "select * from tb_voluntario";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for(let i = 0; i < rows.length; i++) {
            lista.push(new voluntarioModel(rows[i]["vol_id"], rows[i]["vol_nome"], rows[i]["vol_email"], rows[i]["vol_tel"], rows[i]["vol_cpf"], rows[i]["vol_gen"], rows[i]["vol_dataNasc"], rows[i]["vol_cep"], rows[i]["vol_rua"], rows[i]["vol_num"], rows[i]["vol_bairro"], rows[i]["vol_estado"]));
        }
        return lista;
    }

    async cadastrar() {
        if(this.#voluntarioId == 0) {
            let sql = "insert into tb_voluntario (vol_email, vol_nome, vol_tel, vol_cpf, vol_gen, vol_dataNasc, vol_cep, vol_rua, vol_num, vol_bairro, vol_estado) values (?,?,?,?,?,?,?,?,?,?,?)";

            let valores = [this.#voluntarioEmail, this.#voluntarioNome, this.#voluntarioTelefone, this.#voluntarioCpf, this.#voluntarioGenero, this.#voluntarioDataNasc, this.#voluntarioCEP, this.#voluntarioRua, this.#voluntarioNum, this.#voluntarioBairro, this.#voluntarioEstado];
    
            let result = await banco.ExecutaComandoNonQuery(sql, valores);
    
            return result;
        }
        else{
            let sql = "update tb_voluntario set vol_email = ?, vol_nome = ?, vol_tel = ?, vol_cpf = ?, vol_gen = ?, vol_dataNasc = ?, vol_cep = ?, vol_rua = ?, vol_num = ?, vol_bairro = ?, vol_estado = ? where vol_id = ?";

            let valores = [this.#voluntarioEmail, this.#voluntarioNome, this.#voluntarioTelefone, this.#voluntarioCpf, this.#voluntarioGenero, this.#voluntarioDataNasc, this.#voluntarioCEP, this.#voluntarioRua, this.#voluntarioNum, this.#voluntarioBairro, this.#voluntarioEstado, this.#voluntarioId];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
    }

    async obter(id) {
        let sql = "select * from tb_voluntario where vol_id = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new voluntarioModel(row["vol_id"], row["vol_nome"], row["vol_email"], row["vol_tel"], row["vol_cpf"], row["vol_gen"], row["vol_dataNasc"], row["vol_cep"], row["vol_rua"], row["vol_num"], row["vol_bairro"], row["vol_estado"]);
        }

        return null;
    }

    async excluir(id) {
        let sql = "delete from tb_voluntario where vol_id = ?";

        let valores = [id];
        
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}

module.exports = voluntarioModel;