document.addEventListener("DOMContentLoaded", function () {
    let pat_etiqueta = window.location.pathname.split("/")[3];
    console.log({ pat_etiqueta });

    document.getElementById("btnAlterarPatrimonio").addEventListener("click", alterarPatrimonio);

    function limparValidacao() {
        document.getElementById("quantidadePatrimonio").style["border-color"] = "#ced4da";
        document.getElementById("tipoPatrimonio").style["border-color"] = "#ced4da";
        document.getElementById("nomePatrimonio").style["border-color"] = "#ced4da";
    }

    function alterarPatrimonio() {
        limparValidacao();
        let quantidadePatrimonio = document.querySelector("#quantidadePatrimonio").value;
        let tipoPatrimonio = document.querySelector("#tipoPatrimonio").value;
        let nomePatrimonio = document.querySelector("#nomePatrimonio").value;

        let listaErros = [];
        if(quantidadePatrimonio == "") {
            listaErros.push("quantidadePatrimonio");
        }
        if(tipoPatrimonio == "") {
            listaErros.push("tipoPatrimonio");
        }

        if(nomePatrimonio == "") {
            listaErros.push("nomePatrimonio");
        }

        if(listaErros.length == 0) {
            //enviar ao backend com fetch

            let obj = {
                quantidadePatrimonio: quantidadePatrimonio,
                tipoPatrimonio: tipoPatrimonio,
                nomePatrimonio: nomePatrimonio,
            }

            fetch(`/patrimonio/alterarPatrimonio/${pat_etiqueta}`, {
                method: 'PUT',
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(r => {
                    return r.json();
                })
                .then(r => {
                    alert(r.msg);
                    if (r.ok) {
                        window.location.href = "/patrimonio";
                    }
                })
        }
        else {
            //avisar sobre o procedimento incorreto
            for (let i = 0; i < listaErros.length; i++) {
                let campos = document.getElementById(listaErros[i]);
                campos.style["border-color"] = "red";
            }
            alert("Preencha corretamente os campos indicados!");
        }
    }
})