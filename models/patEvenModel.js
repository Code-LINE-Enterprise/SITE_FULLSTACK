const Database = require('../utils/database');

const conexao = new Database();

class PatEvenModel {

    #pat_etiqueta;
    #evento_cad;

    get pat_etiqueta(){
        return this.#pat_etiqueta;
    }

    set pat_etiqueta(pat_etiqueta) {
        this.#pat_etiqueta = pat_etiqueta;
    }

    get evento_cad(){
        return this.#evento_cad;
    }

    set evento_cad(evento_cad) {
        this.#evento_cad = evento_cad;
    } 
    
    constructor(pat_etiqueta, evento_cad){
        this.#pat_etiqueta = pat_etiqueta;
        this.#evento_cad = evento_cad;
    }

    async listarFiltro(termo, filtro) {

        let sqlFiltro = "";
        if(termo != "") {
            if(filtro == "2") {
                sqlFiltro = ` where evento_cad = ?`
            }
            else if(filtro == "1") {
                sqlFiltro = ` where vei_id = ?`;
            }
        }

        let sql = `select * from tb_evento_patrimonio ${sqlFiltro}`;
        let valores = [];

        if(sqlFiltro != ""){
            valores.push(termo);
        }

        
        let rows = await conexao.ExecutaComando(sql, valores);
        let lista = [];

        for(var i= 0; i < rows.length; i++){
            let row = rows[i];
            lista.push(new PatEvenModel(row["pat_etiqueta"], row["evento_cad"]));
        }

        return lista;
    }

    async listarInfo() {

        let sql = "select * from tb_evento_patrimonio";
        let lista = [];
        let rows = await conexao.ExecutaComando(sql);

        for(var i= 0; i < rows.length; i++){
            let row = rows[i];
            lista.push(new PatEvenModel(row["pat_etiqueta"], row["evento_cad"]));
        }

        return lista;
    }

    toJSON(){
        return {
            "pat_etiqueta": this.#pat_etiqueta,
            "evento_cad": this.#evento_cad,
        }
    }

}

module.exports = PatEvenModel;