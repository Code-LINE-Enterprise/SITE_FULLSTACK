function excluirPatrimonio(pat_etiqueta){
    let confirmacao = confirm("Tem certeza que deseja excluir este patrimonio?");
    if(confirmacao){

        fetch(`/patrimonio/excluirPatrimonio/${pat_etiqueta}`, {
            method: "DELETE"
        })
        .then((r) => r.json())
        .then((r) => {
            alert(r.msg);
            if(r.ok){
                window.location.reload();
            }
        });
    }
}



document.addEventListener("DOMContentLoaded", function(){
    let btnExport = document.getElementById("btnExportarExcel");
    btnExport.addEventListener('click', exportarExcel);

    let filtroEscolhido = 0;

    let itemFiltro = document.querySelectorAll(".itemFiltro");

    document.getElementById("btnFiltrar").addEventListener("click", buscar);

    for(let i = 0; i<itemFiltro.length; i++) {
        itemFiltro[i].addEventListener("click", mudarCriterioFiltragem);
    }

    function exportarExcel(){
        var wb = XLSX.utils.table_to_book(document.getElementById("tablePatrimonio"));
        /* Export to file (start a download) */
        XLSX.writeFile(wb, "SheetJSTable.xlsx");
    }

    function buscar() {
        let termoFiltro = document.getElementById("filtro").value;

        
        if(termoFiltro == ""){
            termoFiltro = "todos";
            filtroEscolhido = 0;
        }

        fetch(`/patrimonio/filtrar/${termoFiltro}/${filtroEscolhido}`)
        .then(r=> {
            return r.json();
        })
        .then(r=> {
            //remontar tabela
            console.log("Resultado da consulta:", r);
            console.log(r.alocado);
            if(r.length > 0) {
                let htmlCorpo ="";
                for(let i = 0; i<r.length; i++) {
                    
                    htmlCorpo += `
                                <tr>
                                    <td>${r[i].patrimonioId}</td>
                                    <td>${r[i].quantidadePatrimonio}</td>
                                    <td>${r[i].tipoPatrimonio} </td>
                                    <td>${r[i].nomePatrimonio}</td>
                                    <td>${r[i].alocado}</td>
                                    <td>
                                        <a href="/patrimonio/alterarPatrimonio/${r[i].patrimonioId}" class="btn btn-primary"><i class="fas fa-pen"></i></a>
                                        <button onclick="excluirPatrimonio('${r[i].patrimonioId}')" class="btn btn-danger btnExclusao"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>`;
                }
                

                document.querySelector("#tablePatrimonio > tbody").innerHTML = htmlCorpo;
            }
        })
    }

    function mudarCriterioFiltragem(){
        let nome = this.dataset.nome;
        document.getElementById("btnEscolherFiltro").innerText = nome;
        filtroEscolhido = this.dataset.valor;
    }
})