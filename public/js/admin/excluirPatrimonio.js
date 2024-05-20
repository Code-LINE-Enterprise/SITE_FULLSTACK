function excluirPatrimonio(pat_etiqueta){
    let confirmacao = confirm("Tem certeza que deseja excluir este patrimonio?");
    if(confirmacao){

        fetch(`/admin/excluirPatrimonio/${pat_etiqueta}`, {
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

    function exportarExcel(){
        var wb = XLSX.utils.table_to_book(document.getElementById("tablePatrimonio"));
        /* Export to file (start a download) */
        XLSX.writeFile(wb, "SheetJSTable.xlsx");
    }
})