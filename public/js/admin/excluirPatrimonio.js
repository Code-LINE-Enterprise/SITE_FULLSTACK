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