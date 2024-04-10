document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnCadastrarPatrimonio").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("quantidadePatrimonio").style["border-color"] = "#ced4da";
        document.getElementById("tipoPatrimonio").style["border-color"] = "#ced4da";
        document.getElementById("nomePatrimonio").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
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

            fetch("/admin/addPatrimonio", {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(r=> {
                return r.json();
            })
            .then(r=> {
                if(r.ok) {
                    window.location.href="/admin/listarPatrimonio";
                }   
                else {
                    alert(r.msg);
                }
            })
        }
        else{
            //avisar sobre o preenchimento incorreto
            for(let i = 0; i < listaErros.length; i++) {
                let campos = document.getElementById(listaErros[i]);
                campos.style["border-color"] = "red";
            }
            alert("Preencha corretamente os campos indicados!");
        }
    }

})