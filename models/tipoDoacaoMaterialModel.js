const Database = require('../utils/database');

const banco = new Database();

class TipoDoacaoMaterialModel {

    #tipoDoacaoMaterialId;
    #tipoDoacaoMaterialNome;

    get tipoDoacaoMaterialId() {
        return this.#tipoDoacaoMaterialId
    }

    set tipoDoacaoMaterialId(tipoDoacaoMaterialId) {
        this.#tipoDoacaoMaterialId = tipoDoacaoMaterialId
    }

    get tipoDoacaoMaterialNome() {
        return this.#tipoDoacaoMaterialNome
    }

    set tipoDoacaoMaterialNome(tipoDoacaoMaterialNome) {
        this.#tipoDoacaoMaterialNome = tipoDoacaoMaterialNome
    }

    constructor(tipoDoacaoMaterialId, tipoDoacaoMaterialNome) {
        this.#tipoDoacaoMaterialId = tipoDoacaoMaterialId;
        this.#tipoDoacaoMaterialNome = tipoDoacaoMaterialNome;
    }

    async listarTipoMaterial() {

        let sql = "select * from tipoDoacao_Material";

        let rows = await banco.ExecutaComando(sql);

        let listaTipoMaterial = [];

        for(let i = 0; i<rows.length; i++) {
            let tipoMaterial = new TipoDoacaoMaterialModel()

            tipoMaterial.tipoDoacaoMaterialId = rows[i]["tipoDoacaoMaterial_id"];
            tipoMaterial.tipoDoacaoMaterialNome = rows[i]["tipoDoacaoMaterial_nome"]

            listaTipoMaterial.push(tipoMaterial);
        }

        return listaTipoMaterial;
    }

}

module.exports = TipoDoacaoMaterialModel;