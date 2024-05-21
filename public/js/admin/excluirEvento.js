
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

    function exportarExcel(){
        var wb = XLSX.utils.table_to_book(document.getElementById("tableEvento"));
        /* Export to file (start a download) */
        XLSX.writeFile(wb, "SheetJSTable.xlsx");
    }
})
