const Database = require("../utils/database");

const banco = new Database();

class PatrimonioModel {

    #patrimonioId;
    #quantidadePatrimonio;
    #tipoPatrimonio;
    #nomePatrimonio;
    //implementar getter e setter
    get patrimonioId() {
        return this.#patrimonioId;
    }
    set patrimonioId(patrimonioId) {
        this.#patrimonioId = patrimonioId;
    }
    get quantidadePatrimonio() {
        return this.#quantidadePatrimonio;
    }
    set quantidadePatrimonio(quantidadePatrimonio) {
        this.#quantidadePatrimonio = quantidadePatrimonio;
    }

    get tipoPatrimonio() {
        return this.#tipoPatrimonio;
    }
    set tipoPatrimonio(tipoPatrimonio) {
        this.#tipoPatrimonio = tipoPatrimonio;
    }

    get nomePatrimonio() {
        return this.#nomePatrimonio;
    }
    set nomePatrimonio(nomePatrimonio) {
        this.#nomePatrimonio = nomePatrimonio;
    }

    //implementar construtor
    constructor(patrimonioId, quantidadePatrimonio, tipoPatrimonio, nomePatrimonio) {
        this.#patrimonioId = patrimonioId;
        this.#quantidadePatrimonio = quantidadePatrimonio;
        this.#tipoPatrimonio = tipoPatrimonio;
        this.#nomePatrimonio = nomePatrimonio;
    }

    //implementar as funções para manipulação das informações no banco
    async listarPatrimonio() {

        let sql = "select * from Patrimonio order by pat_etiqueta desc";

        let rows = await banco.ExecutaComando(sql);
        let listaPatrimonio = [];

        for(let i = 0; i < rows.length; i++) {
            listaPatrimonio.push(new PatrimonioModel(rows[i]["pat_etiqueta"], rows[i]["pat_quant"], rows[i]["pat_tipo"], rows[i]["pat_nclatura"]));
        }
        return listaPatrimonio;
    }

    async cadastrarPatrimonio() {
            let sql = "insert into Patrimonio (pat_quant, pat_tipo, pat_nclatura) values (?,?,?)";

            let valores = [this.#quantidadePatrimonio, this.#tipoPatrimonio, this.#nomePatrimonio];
    
            let result = await banco.ExecutaComandoNonQuery(sql, valores);
    
            return result;
    }

    async alterarPatrimonio(){
        
            let sql = "update Patrimonio set pat_quant = ?, pat_tipo = ?, pat_nclatura = ? where pat_etiqueta = ?";

            let valores = [this.#quantidadePatrimonio, this.#tipoPatrimonio, this.#nomePatrimonio, this.#patrimonioId];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        
    }

    async obterIdPatrimonio(id) {
        let sql = "select * from Patrimonio where pat_etiqueta = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new PatrimonioModel(row["pat_etiqueta"], row["pat_quant"], row["pat_tipo"], row["pat_nclatura"]);
        }

        return null;
    }

    async excluirPatrimonio() {
        let sql = "delete from Patrimonio where pat_etiqueta = ?";

        let valores = [this.#patrimonioId];
        
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}

module.exports = PatrimonioModel;