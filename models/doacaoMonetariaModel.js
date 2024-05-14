const Database = require("../utils/database");

const banco = new Database();

class DoacaoMonetariaModel {

    #doacaoMonetariaId;
    #tipoDoacaoMonetariaId;
    #valorDoacao;

    //implementar getter e setter
    get doacaoMonetariaId() {
        return this.#doacaoMonetariaId;
    }
    set doacaoMonetariaId(doacaoMonetariaId) {
        this.#doacaoMonetariaId = doacaoMonetariaId
    }

    get tipoDoacaoMonetariaId() {
        return this.#tipoDoacaoMonetariaId;
    }
    set tipoDoacaoMonetariaId(tipoDoacaoMonetariaId) {
        this.#tipoDoacaoMonetariaId = tipoDoacaoMonetariaId;
    }

    get valorDoacao() {
        return this.#valorDoacao;
    }
    set valorDoacao(valorDoacao) {
        this.#valorDoacao = valorDoacao;
    }

    //implementar construtor
    constructor(doacaoMonetariaId, tipoDoacaoMonetariaId, valorDoacao) {
        this.#doacaoMonetariaId = doacaoMonetariaId;
        this.#tipoDoacaoMonetariaId = tipoDoacaoMonetariaId;
        this.#valorDoacao = valorDoacao;
    }

    //implementar as funções para manipulação das informações no banco
    async listarDoacaoMonetaria() {

        let sql = "select * from Doacao_Monetaria order by cod_DoacaoMonetaria desc";

        let rows = await banco.ExecutaComando(sql);
        let listaDoacaoMonetaria = [];

        for(let i = 0; i < rows.length; i++) {
            listaDoacaoMonetaria.push(new DoacaoMonetariaModel(rows[i]["cod_DoacaoMonetaria"], rows[i]["tipoDoacaoMonetaria_id"], rows[i]["valor_doacao"]));
        }
        return listaDoacaoMonetaria;
    }

    async cadastrarDoacaoMonetaria() {
            let sql = "insert into Doacao_Monetaria (tipoDoacaoMonetaria_id, valor_doacao) values (?,?)";

            let valores = [this.#tipoDoacaoMonetariaId, this.#valorDoacao];
    
            let result = await banco.ExecutaComandoNonQuery(sql, valores);
    
            return result;
    }

    async alterarDoacaoMonetaria(){
        
        let sql = "update Doacao_Monetaria set tipoDoacaoMonetaria_id = ?, valor_doacao = ? where cod_DoacaoMonetaria = ?";

        let valores = [this.#tipoDoacaoMonetariaId, this.#valorDoacao, this.#doacaoMonetariaId];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);
        return result;
}

    async obterIdDoacaoMonetaria(id) {
        let sql = "select * from Doacao_Monetaria where cod_DoacaoMonetaria = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new DoacaoMonetariaModel(row["cod_DoacaoMonetaria"], row["tipoDoacaoMonetaria_id"], row["valor_doacao"]);
        }
        return null;
    }

    async excluirDoacaoMonetaria() {
        let sql = "delete from Doacao_Monetaria where cod_DoacaoMonetaria = ?";

        let valores = [this.#doacaoMonetariaId];
        
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}

module.exports = DoacaoMonetariaModel;