document.addEventListener("DOMContentLoaded", function(){

    var listaBtns = document.querySelectorAll(".btnExcluir");

    for(var i = 0; i<listaBtns.length; i++) {
        listaBtns[i].addEventListener("click", excluirProduto);
    }

    let btnExport = document.getElementById("btnExportarExcel");
    btnExport.addEventListener('click', exportarExcel);

    function exportarExcel(){
        var wb = XLSX.utils.table_to_book(document.getElementById("tableProduto"));
        /* Export to file (start a download) */
        XLSX.writeFile(wb, "SheetJSTable.xlsx");
    }
    
})



function excluirProduto() {
    var codigo = this.dataset.codigo;
    if(confirm("Tem certeza que deseja excluir")) {
        if(codigo != ""){
            var data = {
                codigo: codigo
            }
            fetch("/produto/excluirProduto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            .then(r=> {
                return r.json();
            })
            .then(r=> {
                if(r.ok){
                    window.location.reload();
                }
                else{
                    alert("Erro ao excluir produto");
                }
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

}