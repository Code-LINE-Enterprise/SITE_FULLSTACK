
function excluirEvento(evento_cad) {
    // Exibe um diálogo de confirmação
    let confirmacao = confirm("Tem certeza que deseja excluir este evento?");

    // Se o usuário clicar em "OK" no diálogo de confirmação
    if (confirmacao) {
        fetch(`/evento/excluirEvento/${evento_cad}`, {
            method: "DELETE"
        })
        .then((r) => r.json())
        .then((r) => {
            alert(r.msg);
            if (r.ok) {
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
        var wb = XLSX.utils.table_to_book(document.getElementById("tableEvento"));
        /* Export to file (start a download) */
        XLSX.writeFile(wb, "SheetJSTable.xlsx");
    }
    

    function buscar() {
        let termoFiltro = document.getElementById("filtro").value;

        
        if(termoFiltro == ""){
            termoFiltro = "todos";
            filtroEscolhido = 0;
        }
        else if(filtroEscolhido == 2 ){
            let arr = termoFiltro.split("/");
            termoFiltro = `${arr[2]}-${arr[1]}-${arr[0]}`;
        }

        fetch(`/evento/filtrar/${termoFiltro}/${filtroEscolhido}`)
        .then(r=> {
            return r.json();
        })
        .then(r=> {
            //remontar tabela
            console.log(r);
            if(r.length > 0) {
                let htmlCorpo ="";
                for(let i = 0; i<r.length; i++) {
                    htmlCorpo += `
                                <tr>
                                    <td>${r[i].eventoId}</td>
                                    <td>${r[i].nomeEvento}</td>
                                    <td>${new Date(r[i].dataEvento).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                                    <td>${r[i].localEvento}</td>
                                    <td>${r[i].statusNome}</td>
                                    <td>
                                        <a href="/evento/alterarEvento/${r[i].eventoId}" class="btn btn-primary"><i class="fas fa-pen"></i></a>
                                        <button onclick="excluirEvento('${r[i].eventoId}')" class="btn btn-danger btnExclusao"><i class="fas fa-trash"></i></button>
                                        <a href="/evento/relatorioEvento/${r[i].eventoId}" class="btn btn-secondary"><i class="fas fa-eye"></i></a>
                                    </td>
                                </tr>`;

                }

                document.querySelector("#tableEvento > tbody").innerHTML = htmlCorpo;
            }
        })
    }

    function mudarCriterioFiltragem(){
        let nome = this.dataset.nome;
        document.getElementById("btnEscolherFiltro").innerText = nome;
        filtroEscolhido = this.dataset.valor;
    }
})

