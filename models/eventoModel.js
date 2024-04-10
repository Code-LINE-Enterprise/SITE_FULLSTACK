const Database = require("../utils/database");

const banco = new Database();

class EventoModel {

    #eventoId;
    #dataEvento;
    #localEvento;
    //implementar getter e setter
    get eventoId() {
        return this.#eventoId;
    }
    set eventoId(eventoId) {
        this.#eventoId = eventoId;
    }
    get dataEvento() {
        return this.#dataEvento;
    }
    set dataEvento(dataEvento) {
        this.#dataEvento = dataEvento;
    }

    get localEvento() {
        return this.#localEvento;
    }
    set localEvento(localEvento) {
        this.#localEvento = localEvento;
    }

    //implementar construtor
    constructor(eventoId, dataEvento, localEvento) {
        this.#eventoId = eventoId;
        this.#dataEvento = dataEvento;
        this.#localEvento = localEvento;
    }

    //implementar as funções para manipulação das informações no banco
    async listarEvento() {

        let sql = "select * from Evento";

        let rows = await banco.ExecutaComando(sql);
        let listaEvento = [];

        for(let i = 0; i < rows.length; i++) {
            listaEvento.push(new EventoModel(rows[i]["evento_cad"], rows[i]["data_evento"], rows[i]["local_evento"]));
        }
        return listaEvento;
    }

    async cadastrarEvento() {
            let sql = "insert into Evento (data_evento, local_evento) values (?,?)";

            let valores = [this.#dataEvento, this.#localEvento];
    
            let result = await banco.ExecutaComandoNonQuery(sql, valores);
    
            return result;
    }

    async alterarEvento(){
        
            let sql = "update Evento set data_evento = ?, local_evento = ? where evento_cad = ?";

            let valores = [this.#localEvento, this.#dataEvento, this.#eventoId];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        
    }

    async obterIdEvento(id) {
        let sql = "select * from Evento where evento_cad = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new EventoModel(row["evento_cad"], row["data_evento"], row["local_evento"]);
        }

        return null;
    }

    async excluirEvento(id) {
        let sql = "delete from Evento where evento_cad = ?";

        let valores = [id];
        
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}

module.exports = EventoModel;