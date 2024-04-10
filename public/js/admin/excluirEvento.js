function excluirEvento(evento_cad){
    fetch(`/admin/excluirEvento/${evento_cad}`, {
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