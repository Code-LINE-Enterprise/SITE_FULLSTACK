document.addEventListener("DOMContentLoaded", function(){
    let btnExport = document.getElementById("btnExportarExcel");
    btnExport.addEventListener('click', exportarExcel);

    function exportarExcel(){
        var wb = XLSX.utils.table_to_book(document.getElementById("tableMarcas"));
        /* Export to file (start a download) */
        XLSX.writeFile(wb, "SheetJSTable.xlsx");
    }
})