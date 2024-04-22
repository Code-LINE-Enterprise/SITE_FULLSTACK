
function excluirEvento(evento_cad) {
    // Exibe um diálogo de confirmação
    let confirmacao = confirm("Tem certeza que deseja excluir este evento?");

    // Se o usuário clicar em "OK" no diálogo de confirmação
    if (confirmacao) {
        fetch(`/admin/excluirEvento/${evento_cad}`, {
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
