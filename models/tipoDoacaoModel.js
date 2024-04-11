const Database = require('../utils/database');

const banco = new Database();

class TipoDoacaoModel {

    #tipodoacaoId;
    #tipodoacaoNome;

    get tipodoacaoId() {
        return this.#tipodoacaoId
    }

    set tipodoacaoId(tipodoacaoId) {
        this.#tipodoacaoId = tipodoacaoId
    }

    get tipodoacaoNome() {
        return this.#tipodoacaoNome
    }

    set tipodoacaoNome(tipodoacaoNome) {
        this.#tipodoacaoNome = tipodoacaoNome
    }

    constructor(tipodoacaoId, tipodoacaoNome) {
        this.#tipodoacaoId = tipodoacaoId;
        this.#tipodoacaoNome = tipodoacaoNome;
    }

    async listarTipo() {

        let sql = "select * from tipoDoacao";

        let rows = await banco.ExecutaComando(sql);

        let listaTipo = [];

        for(let i = 0; i<rows.length; i++) {
            let tipo = new TipoDoacaoModel()

            tipo.tipodoacaoId = rows[i]["tipodoacao_id"];
            tipo.tipodoacaoNome = rows[i]["tipodoacao_nome"]

            listaTipo.push(tipo);
        }

        return listaTipo;
    }

}

module.exports = TipoDoacaoModel;