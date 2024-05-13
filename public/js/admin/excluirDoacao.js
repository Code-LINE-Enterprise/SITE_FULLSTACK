function excluirDoacao(cod_doacao) {
    // Exibe um diálogo de confirmação
    let confirmacao = confirm("Tem certeza que deseja excluir este doação?");

    // Se o usuário clicar em "OK" no diálogo de confirmação
    if (confirmacao) {
        fetch(`/admin/excluirDoacao/${cod_doacao}`, {
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
