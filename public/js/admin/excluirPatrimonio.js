function excluirPatrimonio(pat_etiqueta){
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