document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnCadastrarEvento").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("nome").style["border-color"] = "#ced4da";
        document.getElementById("data").style["border-color"] = "#ced4da";
        document.getElementById("local").style["border-color"] = "#ced4da";
        document.getElementById("patrimonio").style["border-color"] = "#ced4da";
        document.getElementById("quantidade").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();
        let nome = document.querySelector("#nome").value;
        let data = document.querySelector("#data").value;
        let local = document.querySelector("#local").value;
        let patrimonio = document.querySelector("#patrimonio").value;
        let quantidade = document.querySelector("#quantidade").value;

        let listaErros = [];
        if(nome == "") {
            listaErros.push("nome");
        }
        if(data == "") {
            listaErros.push("data");
        }
        if(local == "") {
            listaErros.push("local");
        }
        if(patrimonio == "") {
            listaErros.push("patrimonio");
        }
        if(quantidade == "") {
            listaErros.push("quantidade");
        }

        if(listaErros.length == 0) {
            //enviar ao backend com fetch

            let obj = {
                nome: nome,
                data: data,
                local: local,
                patrimonio: patrimonio,
                quantidade: quantidade,
            }

            fetch("/evento/addEvento", {
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
                    window.location.href="/evento";
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

    function validacaoPatrimonio(){
        
    }

})