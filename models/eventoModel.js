const Database = require("../utils/database");

const banco = new Database();

class EventoModel {

    
    #eventoId;
    #nomeEvento;
    #dataEvento;
    #localEvento;
    #descEvento;
    #statusEventoId;
    #statusNome;
    
    //implementar getter e setter
    get eventoId() {
        return this.#eventoId;
    }
    set eventoId(eventoId) {
        this.#eventoId = eventoId;
    }

    get nomeEvento() {
        return this.#nomeEvento;
    }
    set nomeEvento(nomeEvento) {
        this.#nomeEvento = nomeEvento;
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

    get descEvento() {
        return this.#descEvento;
    }
    set descEvento(descEvento) {
        this.#descEvento = descEvento;
    }

    get statusEventoId() {
        return this.#statusEventoId;
    }
    set statusEventoId(statusEventoId) {
        this.#statusEventoId = statusEventoId;
    }

    get statusNome() {
        return this.#statusNome;
    }
    set statusNome(statusNome) {
        this.#statusNome = statusNome;
    }

    //implementar construtor
    constructor(eventoId, nomeEvento, dataEvento, localEvento, descEvento, statusEventoId,statusNome) {
        this.#eventoId = eventoId;
        this.#nomeEvento = nomeEvento;
        this.#dataEvento = dataEvento;
        this.#localEvento = localEvento;
        this.#descEvento = descEvento;
        this.#statusEventoId = statusEventoId;
        this.#statusNome = statusNome;
    }

    //implementar as funções para manipulação das informações no banco
    async listarEvento(termo, filtro) {

        let sqlFiltro = "";
        if(termo != "") {
            if(filtro == "1") {
                termo = "%" + termo + "%"
                sqlFiltro = ` where nome_evento like ?`
            }
            else if(filtro == "2"){
                console.log(termo)
                sqlFiltro = ` where data_evento >= ?`;
            }
            else if(filtro == "3"){
                termo = "%" + termo + "%"
                sqlFiltro = ` where local_evento like ?`;
            };
        }

        let sql = `select * from Evento ${sqlFiltro} `  // retirado order by evento_cad desc
        
        let valores = [termo];

        if(sqlFiltro != ""){
            valores.push(termo);
        }

        let rows = await banco.ExecutaComando(sql, valores);
        
        let listaEvento = [];

        for(let i = 0; i < rows.length; i++) {
            listaEvento.push(new EventoModel(rows[i]["evento_cad"], rows[i]["nome_evento"], rows[i]["data_evento"], rows[i]["local_evento"], rows[i]["desc_evento"], rows[i]["EventoStatusId"], rows[i]["EventoStatusDescricao"]));
        }
        return listaEvento;
    }

    async cadastrarEvento() {
            let sql = "insert into Evento (data_evento, nome_evento, local_evento, desc_evento, EventoStatusId) values (?,?,?,?,?)";

            let valores = [this.#dataEvento, this.#nomeEvento, this.#localEvento, this.#descEvento, this.#statusEventoId];
    
            let result = await banco.ExecutaComandoNonQuery(sql, valores);
    
            return result;
    }

    async alterarEvento(){
        
            let sql = "update Evento set data_evento = ?, nome_evento = ?, local_evento = ?, desc_evento = ?, EventoStatusId = ? where evento_cad = ?";

            let valores = [this.#dataEvento, this.nomeEvento, this.#localEvento, this.#descEvento, this.#statusEventoId, this.#eventoId];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        
    }

    async obterEventoStatus() {
        let sql = "select * from tb_evento_status";
    
        let rows = await banco.ExecutaComando(sql);
    
        return rows.map((row) => ({
          statusEventoId: row.EventoStatusId,
          statusNome: row.EventoStatusDescricao,
        }));
      }

    async obterIdEvento(id) {
        let sql = "SELECT * FROM Evento p INNER JOIN tb_evento_status c1 ON p.EventoStatusId = c1.EventoStatusId WHERE evento_cad = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new EventoModel(row["evento_cad"], row["nome_evento"], row["data_evento"], row["local_evento"], row["desc_evento"], row["EventoStatusDescricao"]);
        }

        return null;
    }

    async excluirEvento() {
        let sql = "delete from Evento where evento_cad = ?";

        let valores = [this.#eventoId];
        
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    toJSON() {
        return {
            "eventoId": this.#eventoId,
            "dataEvento": this.#dataEvento,
            "nomeEvento": this.#nomeEvento,
            "localEvento": this.#localEvento,
            "descEvento": this.#descEvento,
            "statusEventoId": this.#statusEventoId,
            "statusNome": this.#statusNome,           
        }
    }
    
}

module.exports = EventoModel;