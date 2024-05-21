document.addEventListener("DOMContentLoaded", function () {
    let cod_DoacaoMonetaria = window.location.pathname.split("/")[3];
    console.log({ cod_DoacaoMonetaria });

        document.getElementById("btnAlterarDoacaoMonetaria").addEventListener("click", alterarMonetario);
    
        function limparValidacao() {
            document.getElementById("tipoDoacaoMonetariaId").style["border-color"] = "#ced4da"
            document.getElementById("valorDoacao").style["border-color"] = "#ced4da";
        }
    
        function alterarMonetario() {
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

            fetch(`/doacao/alterarDoacaoMonetaria/${cod_DoacaoMonetaria}`, {
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
                        window.location.href = "/doacao/listarDoacaoMonetaria";
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