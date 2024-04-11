document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnCadastrarDoacao").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("tipoDoacaoId").style["border-color"] = "#ced4da";
        document.getElementById("quantDoacao").style["border-color"] = "#ced4da";
        document.getElementById("valorDoacao").style["border-color"] = "#ced4da";
        document.getElementById("descDoacao").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();
        let tipoDoacaoId = document.querySelector("#tipoDoacaoId").value;
        let quantDoacao = document.querySelector("#quantDoacao").value;
        let valorDoacao = document.querySelector("#valorDoacao").value;
        let descDoacao = document.querySelector("#descDoacao").value;

        let listaErros = [];
        if(tipoDoacaoId == "") {
            listaErros.push("tipoDoacaoId");
        }
        if(quantDoacao == "") {
            listaErros.push("quantDoacao");
        }
        if(valorDoacao == "") {
            listaErros.push("valorDoacao");
        }
        if(descDoacao == "") {
            listaErros.push("descDoacao");
        }

        if(listaErros.length == 0) {
            //enviar ao backend com fetch

            let obj = {
                tipoDoacaoId: tipoDoacaoId,
                quantDoacao: quantDoacao,
                valorDoacao: valorDoacao,
                descDoacao: descDoacao,
            }

            fetch("/admin/doacaoAdm", {
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
                    window.location.href="/admin/listarDoacao";
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