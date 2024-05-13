const Database = require("../utils/database");

const banco = new Database();

class DoacaoModel {

    #doacaoId;
    #tipoDoacaoId;
    #quantDoacao;
    #valorDoacao;
    #descDoacao;
    //implementar getter e setter
    get doacaoId() {
        return this.#doacaoId;
    }
    set doacaoId(doacaoId) {
        this.#doacaoId = doacaoId
    }
    get tipoDoacaoId() {
        return this.#tipoDoacaoId;
    }
    set tipoDoacaoId(tipoDoacaoId) {
        this.#tipoDoacaoId = tipoDoacaoId;
    }

    get quantDoacao() {
        return this.#quantDoacao;
    }
    set quantDoacao(quantDoacao) {
        this.#quantDoacao = quantDoacao;
    }

    get valorDoacao() {
        return this.#valorDoacao;
    }

    set valorDoacao(valorDoacao) {
        this.#valorDoacao = valorDoacao;
    }

    get descDoacao() {
        return this.#descDoacao;
    }
    set descDoacao(descDoacao) {
        this.#descDoacao = descDoacao;
    }

    //implementar construtor
    constructor(doacaoId, tipoDoacaoId, quantDoacao, valorDoacao, descDoacao) {
        this.#doacaoId = doacaoId;
        this.#tipoDoacaoId = tipoDoacaoId;
        this.#quantDoacao = quantDoacao;
        this.#valorDoacao = valorDoacao;
        this.#descDoacao = descDoacao;

    }

    //implementar as funções para manipulação das informações no banco
    async listarDoacao() {

        let sql = "select * from Doacao order by cod_doacao desc";

        let rows = await banco.ExecutaComando(sql);
        let listaDoacao = [];

        for(let i = 0; i < rows.length; i++) {
            listaDoacao.push(new DoacaoModel(rows[i]["cod_doacao"], rows[i]["tipodoacao_id"], rows[i]["quant_doacao"], rows[i]["valor_doacao"], rows[i]["desc_doacao"]));
        }
        return listaDoacao;
    }

    async cadastrarDoacao() {
            let sql = "insert into Doacao (tipodoacao_id, quant_doacao, valor_doacao, desc_doacao) values (?,?,?,?)";

            let valores = [this.#tipoDoacaoId, this.#quantDoacao, this.#valorDoacao, this.#descDoacao];
    
            let result = await banco.ExecutaComandoNonQuery(sql, valores);
    
            return result;
    }

    async alterarDoacao(){
        
        let sql = "update Doacao set tipodoacao_id = ?, quant_doacao = ?, valor_doacao = ?, desc_doacao = ? where cod_doacao = ?";

        let valores = [this.#tipoDoacaoId, this.#quantDoacao, this.#valorDoacao, this.#descDoacao, this.#doacaoId];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);
        return result;
    
}

    async obterIdDoacao(id) {
        let sql = "select * from Doacao where cod_doacao = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new DoacaoModel(row["cod_doacao"], row["tipodoacao_id"], row["quant_doacao"], row["valor_doacao"], row["desc_doacao"]);
        }

        return null;
    }

    async excluirDoacao() {
        let sql = "delete from Doacao where cod_doacao = ?";

        let valores = [this.#doacaoId];
        
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}

module.exports = DoacaoModel;