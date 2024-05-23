const Database = require("../utils/database");

const banco = new Database();

class EventoModel {

    
    #eventoId;
    #nomeEvento;
    #dataEvento;
    #localEvento;
    #patrimonioId;
    #patrimonioQuantidade;
    #descEvento;
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

    get patrimonioId() {
        return this.#patrimonioId;
    }
    set patrimonioId(patrimonioId) {
        this.#patrimonioId = patrimonioId;
    }

    get patrimonioQuantidade() {
        return this.#patrimonioQuantidade;
    }
    set patrimonioQuantidade(patrimonioQuantidade) {
        this.#patrimonioQuantidade = patrimonioQuantidade;
    }

    get descEvento() {
        return this.#descEvento;
    }
    set descEvento(descEvento) {
        this.#descEvento = descEvento;
    }

    //implementar construtor
    constructor(eventoId, nomeEvento, dataEvento, localEvento, patrimonioId,patrimonioQuantidade, descEvento) {
        this.#eventoId = eventoId;
        this.#nomeEvento = nomeEvento;
        this.#dataEvento = dataEvento;
        this.#localEvento = localEvento;
        this.#patrimonioId = patrimonioId;
        this.#patrimonioQuantidade = patrimonioQuantidade;
        this.#descEvento = descEvento;
    }

    //implementar as funções para manipulação das informações no banco
    async listarEvento(termo, filtro) {

        let sqlFiltro = "";
        if(termo != "") {
            if(filtro == "1") {
                sqlFiltro = ` where nome_evento like ?`
            }
            else if(filtro == "2") {
                sqlFiltro = ` where data_evento like %?%`;
            }
            else if(filtro == "3"){
                sqlFiltro = ` where local_evento like %?%`;
            };
        }

        let sql = `select * from Evento  inner join Patrimonio on Evento.pat_etiqueta = Patrimonio.pat_etiqueta ${sqlFiltro} `  // retirado order by evento_cad desc
        
        let valores = [];

        if(sqlFiltro != ""){
            valores.push(termo);
        }

        let rows = await banco.ExecutaComando(sql, valores);
        
        let listaEvento = [];

        for(let i = 0; i < rows.length; i++) {
            listaEvento.push(new EventoModel(rows[i]["evento_cad"], rows[i]["nome_evento"], rows[i]["data_evento"], rows[i]["local_evento"], rows[i]["pat_nclatura"], rows[i]["pat_quant"], rows[i]["desc_evento"]));
        }
        return listaEvento;
    }

    async cadastrarEvento() {
            let sql = "insert into Evento (data_evento, nome_evento, local_evento, pat_etiqueta, desc_evento) values (?,?,?,?,?)";

            let valores = [this.#dataEvento, this.#nomeEvento, this.#localEvento, this.#patrimonioId, this.#descEvento];
    
            let result = await banco.ExecutaComandoNonQuery(sql, valores);
    
            return result;
    }

    async alterarEvento(){
        
            let sql = "update Evento set data_evento = ?, nome_evento = ?, local_evento = ?, pat_etiqueta = ?, pat_etiqueta = ?, desc_evento = ? where evento_cad = ?";

            let valores = [this.#dataEvento, this.nomeEvento, this.#localEvento, this.#patrimonioId, this.#patrimonioQuantidade, this.#descEvento, this.#eventoId];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        
    }

    async obterIdEvento(id) {
        let sql = "SELECT * FROM Evento p INNER JOIN Patrimonio c1 ON p.pat_etiqueta = c1.pat_etiqueta WHERE evento_cad = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new EventoModel(row["evento_cad"], row["nome_evento"], row["data_evento"], row["local_evento"], row["pat_nclatura"], row["pat_quant"], row["desc_evento"]);
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
            "patrimonioId": this.#patrimonioId,
            "patrimonioQuantidade": this.#patrimonioQuantidade,
            "descEvento": this.#descEvento,           
        }
    }
    
}

module.exports = EventoModel;