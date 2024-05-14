const Database = require('../utils/database');

const banco = new Database();

class TipoDoacaoMonetariaModel {

    #tipoDoacaoMonetariaId;
    #tipoDoacaoMonetariaNome;

    get tipoDoacaoMonetariaId() {
        return this.#tipoDoacaoMonetariaId
    }

    set tipoDoacaoMonetariaId(tipoDoacaoMonetariaId) {
        this.#tipoDoacaoMonetariaId = tipoDoacaoMonetariaId
    }

    get tipoDoacaoMonetariaNome() {
        return this.#tipoDoacaoMonetariaNome
    }

    set tipoDoacaoMonetariaNome(tipoDoacaoMonetariaNome) {
        this.#tipoDoacaoMonetariaNome = tipoDoacaoMonetariaNome
    }

    constructor(tipoDoacaoMonetariaId, tipoDoacaoMonetariaNome) {
        this.#tipoDoacaoMonetariaId = tipoDoacaoMonetariaId;
        this.#tipoDoacaoMonetariaNome = tipoDoacaoMonetariaNome;
    }

    async listarTipoMonetario() {

        let sql = "select * from tipoDoacao_Monetaria";

        let rows = await banco.ExecutaComando(sql);

        let listaTipoMonetaria = [];

        for(let i = 0; i<rows.length; i++) {
            let tipoMonetaria = new TipoDoacaoMonetariaModel()

            tipoMonetaria.tipoDoacaoMonetariaId = rows[i]["tipoDoacaoMonetaria_id"];
            tipoMonetaria.tipoDoacaoMonetariaNome = rows[i]["tipoDoacaoMonetaria_nome"]

            listaTipoMonetaria.push(tipoMonetaria);
        }

        return listaTipoMonetaria;
    }

}

module.exports = TipoDoacaoMonetariaModel;