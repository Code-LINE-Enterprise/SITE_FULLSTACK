const Database = require("../utils/database");

const banco = new Database();

class DoacaoMaterialModel {

    #doacaoMaterialId;
    #tipoDoacaoMaterialId;
    #quantidadeDoacao;

    //implementar getter e setter
    get doacaoMaterialId() {
        return this.#doacaoMaterialId;
    }
    set doacaoMaterialId(doacaoMaterialId) {
        this.#doacaoMaterialId = doacaoMaterialId
    }

    get tipoDoacaoMaterialId() {
        return this.#tipoDoacaoMaterialId;
    }
    set tipoDoacaoMaterialId(tipoDoacaoMaterialId) {
        this.#tipoDoacaoMaterialId = tipoDoacaoMaterialId;
    }

    get quantidadeDoacao() {
        return this.#quantidadeDoacao;
    }
    set quantidadeDoacao(quantidadeDoacao) {
        this.#quantidadeDoacao = quantidadeDoacao;
    }

    //implementar construtor
    constructor(doacaoMaterialId, tipoDoacaoMaterialId, quantidadeDoacao) {
        this.#doacaoMaterialId = doacaoMaterialId;
        this.#tipoDoacaoMaterialId = tipoDoacaoMaterialId;
        this.#quantidadeDoacao = quantidadeDoacao;
    }

    //implementar as funções para manipulação das informações no banco
    async listarDoacaoMaterial() {

        let sql = "select * from Doacao_Material order by cod_DoacaoMaterial desc";

        let rows = await banco.ExecutaComando(sql);
        let listaDoacaoMaterial = [];

        for(let i = 0; i < rows.length; i++) {
            listaDoacaoMaterial.push(new DoacaoMaterialModel(rows[i]["cod_DoacaoMaterial"], rows[i]["tipoDoacaoMaterial_id"], rows[i]["quant_doacao"]));
        }
        return listaDoacaoMaterial;
    }

    async cadastrarDoacaoMaterial() {
            let sql = "insert into Doacao_Material (tipoDoacaoMaterial_id, quant_doacao) values (?,?)";

            let valores = [this.#tipoDoacaoMaterialId, this.#quantidadeDoacao];
    
            let result = await banco.ExecutaComandoNonQuery(sql, valores);
    
            return result;
    }

    async alterarDoacaoMaterial(){
        
        let sql = "update Doacao_Material set tipoDoacaoMaterial_id = ?, quant_doacao = ? where cod_DoacaoMaterial = ?";

        let valores = [this.#tipoDoacaoMaterialId, this.#quantidadeDoacao, this.#doacaoMaterialId];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);
        return result;
    
}

    async obterIdDoacaoMaterial(id) {
        let sql = "select * from Doacao_Material where cod_DoacaoMaterial = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new DoacaoMaterialModel(row["cod_DoacaoMaterial"], row["tipoDoacaoMaterial_id"], row["quant_doacao"]);
        }
        return null;
    }

    async excluirDoacaoMaterial() {
        let sql = "delete from Doacao_Material where cod_DoacaoMaterial = ?";

        let valores = [this.#doacaoMaterialId];
        
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}

module.exports = DoacaoMaterialModel;