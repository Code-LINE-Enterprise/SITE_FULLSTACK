const Database = require('../utils/database');

const conexao = new Database();

class PatEvenModel {

    #pat_etiqueta;
    #evento_cad;
    #nomeEvento;
    #nomePatrimonio;

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
    get nomeEvento(){
        return this.#nomeEvento;
    }

    set nomeEvento(nomeEvento) {
        this.#nomeEvento = nomeEvento;
    } 
    
    get nomePatrimonio(){
        return this.#nomePatrimonio;
    }

    set nomePatrimonio(nomePatrimonio) {
        this.#nomePatrimonio = nomePatrimonio;
    } 

    constructor(pat_etiqueta, evento_cad, nomeEvento, nomePatrimonio){
        this.#pat_etiqueta = pat_etiqueta;
        this.#evento_cad = evento_cad;
        this.#nomeEvento = nomeEvento;
        this.#nomePatrimonio = nomePatrimonio;
    }

    async listarInfo() {

        let sql = `select * from tb_evento_patrimonio p inner join Patrimonio m on p.pat_etiqueta = m.pat_etiqueta inner join Evento c on p.evento_cad = c.evento_cad `;
        let lista = [];
        let rows = await conexao.ExecutaComando(sql);

        for(var i= 0; i < rows.length; i++){
            let row = rows[i];
            lista.push(new PatEvenModel(row["pat_etiqueta"], row["evento_cad"], row["nome_evento"], row["pat_nclatura"]));
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