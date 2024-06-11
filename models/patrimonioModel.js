const Database = require("../utils/database");

const banco = new Database();

class PatrimonioModel {

    #patrimonioId;
    #quantidadePatrimonio;
    #tipoPatrimonio;
    #nomePatrimonio;
    #alocado;
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

    get alocado() {
        return this.#alocado;
    }
    set alocado(alocado) {
        this.#alocado = alocado;
    }

    //implementar construtor
    constructor(patrimonioId, quantidadePatrimonio, tipoPatrimonio, nomePatrimonio, alocado) {
        this.#patrimonioId = patrimonioId;
        this.#quantidadePatrimonio = quantidadePatrimonio;
        this.#tipoPatrimonio = tipoPatrimonio;
        this.#nomePatrimonio = nomePatrimonio;
        this.#alocado = alocado;
    }

    //implementar as funções para manipulação das informações no banco
    async listarPatrimonio(termo, filtro) {
        let sqlFiltro = "";
        if(termo != "") {
            if(filtro == "1") {
                termo = "%" + termo + "%"
                sqlFiltro = ` where pat_nclatura like ?`
            }
            else if(filtro == "2"){
                console.log(termo)
                termo = "%" + termo + "%"
                sqlFiltro = ` where pat_tipo like ?`;
            }
        }

        let sql = `select * from Patrimonio ${sqlFiltro}`;

        let valores = [termo];

        if(sqlFiltro != ""){
            valores.push(termo);
        }

        let rows = await banco.ExecutaComando(sql, valores);
        let listaPatrimonio = [];

        for(let i = 0; i < rows.length; i++) {
            listaPatrimonio.push(new PatrimonioModel(rows[i]["pat_etiqueta"], rows[i]["pat_quant"], rows[i]["pat_tipo"], rows[i]["pat_nclatura"], rows[i]["pat_alocado"]));
        }
        return listaPatrimonio;
    }

    async cadastrarPatrimonio() {
            let sql = "insert into Patrimonio (pat_quant, pat_tipo, pat_nclatura, pat_alocado) values (?,?,?, false)";

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
            return new PatrimonioModel(row["pat_etiqueta"], row["pat_quant"], row["pat_tipo"], row["pat_nclatura"], row["pat_alocado"]);
        }

        return null;
    }

    async excluirPatrimonio() {
        let sql = "delete from Patrimonio where pat_etiqueta = ?";

        let valores = [this.#patrimonioId];
        
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    //FAZER ALOCAÇÃO 
    async alocarPatrimonio(patrimonioId, eventoId) {
        const sqlPatrimonio = "update Patrimonio set pat_alocado = true where pat_etiqueta = ?";
        const valuesPatrimonio = [patrimonioId];
    
        let resultUpdate = await banco.ExecutaComandoNonQuery(sqlPatrimonio, valuesPatrimonio);
    
        const sqlLocacao = "insert into tb_evento_patrimonio (pat_etiqueta, evento_cad) values (?, ?)";
        const valuesLocacao = [patrimonioId, eventoId];
    
        let resultAdded = await banco.ExecutaComandoNonQuery(sqlLocacao, valuesLocacao);
    
        return resultUpdate && resultAdded;
      }

      async updatePatrimonioPorId(eventoId) {
        if (eventoId) {
          // Remove alocação
          if (eventoId === "0") {
            //Deleta relacionamento entre o patrimonio e evento
            const sqlDelete = "delete from tb_evento_patrimonio where pat_etiqueta = ?";
            const valuesDelete = [this.#patrimonioId];
            const delet = await banco.ExecutaComandoNonQuery(sqlDelete, valuesDelete);
    
            //Atualiza nome e status de alocação do patrimonio
            const sqlAtualizar = "update tb_patrimonios set pat_nclatura = ?, pat_alocado = false where pat_etiqueta = ?";
            const valuesAtualizar = [this.#nomePatrimonio, this.#patrimonioId];
            const update = banco.ExecutaComandoNonQuery(sqlAtualizar,valuesAtualizar);
    
            return delet && update;
          }
    
          //Atualiza alocação
          //Atualiza relacionamento entre o patrimonio e evento
          const sqlUpdate = "update tb_evento_patrimonio set evento_cad = ? where pat_etiqueta = ?";
          const valuesUpdate = [eventoId, this.#patrimonioId];
          const updateRelacionamento = await banco.ExecutaComandoNonQuery(sqlUpdate, valuesUpdate);
    
          //Atualiza nome do patrimonio
          const sqlUpdateNome = "update tb_patrimonios set pat_nclatura = ? where pat_etiqueta = ?";
          const valuesUpdateNome = [this.#nomePatrimonio, this.#patrimonioId];
          const updateNome = banco.ExecutaComandoNonQuery(sqlUpdateNome,valuesUpdateNome);
    
          return updateRelacionamento && updateNome;
        }
    
        //Atualiza nome de patrimonio não alocado
        const sql = "update tb_patrimonios set pat_nclatura = ? where pat_etiqueta = ?";
        const values = [this.#nomePatrimonio, this.#patrimonioId];
    
        let update = await banco.ExecutaComandoNonQuery(sql, values);
    
        return update;
      }



    //TENTANDO FAZER ATUALIZAÇÃO DO ESTOQUE DE PATRIMONIO
    //async atualizarPatrimonio(quantidadePatrimonio, patrimonioId){
    //    let sql = "update Patrimonio set pat_quant = pat_quant - ? where pat_etiqueta = ?";
    //    let valores = [quantidadePatrimonio, patrimonioId];

    //    var result = await conexao.ExecutaComandoNonQuery(sql, valores);

    //    return result;
    //}

    //async validarPatrimonio(patrimonioId, quantidadePatrimonio) {
    //    let sql = "select * from Patrimonio where pat_etiqueta = ? and pat_quant >= ?";
    //    let valores = [patrimonioId, quantidadePatrimonio];

    //    let rows = await conexao.ExecutaComando(sql, valores);
        
    //    return rows.length > 0;
    //}

    toJSON() {
        return {
            "patrimonioId": this.#patrimonioId,
            "quantidadePatrimonio": this.#quantidadePatrimonio,
            "tipoPatrimonio": this.#tipoPatrimonio,
            "nomePatrimonio": this.#nomePatrimonio,
        }
    }
}

module.exports = PatrimonioModel;