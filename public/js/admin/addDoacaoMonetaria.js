document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnCadastrarDoacaoMonetaria").addEventListener("click", cadastrarMonetario);

    function limparValidacao() {
        document.getElementById("tipoDoacaoMonetariaId").style["border-color"] = "#ced4da"
        document.getElementById("valorDoacao").style["border-color"] = "#ced4da";
    }

    function cadastrarMonetario() {
        limparValidacao();
        let tipoDoacaoMonetariaId = document.querySelector("#tipoDoacaoMonetariaId").value;
        let valorDoacao = document.querySelector("#valorDoacao").value;

        let listaErros = [];
        if(tipoDoacaoMonetariaId == "") {
            listaErros.push("tipoDoacaoMonetariaId");
        }
        if(valorDoacao == "") {
            listaErros.push("valorDoacao");
        }

        if(listaErros.length == 0) {
            //enviar ao backend com fetch

            let obj = {
                tipoDoacaoMonetariaId: tipoDoacaoMonetariaId,
                valorDoacao: valorDoacao,
            }

            fetch("/admin/doacaoMonetariaAdm", {
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
                    window.location.href="/admin/listarDoacaoMonetaria";
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