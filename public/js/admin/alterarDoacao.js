document.addEventListener("DOMContentLoaded", function () {
    let cod_doacao = window.location.pathname.split("/")[3];
    console.log({ cod_doacao });

        document.getElementById("btnAlterarDoacao").addEventListener("click", alterar);
    
        function limparValidacao() {
            document.getElementById("tipoDoacaoId").style["border-color"] = "#ced4da";
            document.getElementById("quantDoacao").style["border-color"] = "#ced4da";
            document.getElementById("valorDoacao").style["border-color"] = "#ced4da";
            document.getElementById("descDoacao").style["border-color"] = "#ced4da";
        }
    
        function alterar() {
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

            fetch(`/admin/alterarDoacao/${cod_doacao}`, {
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
                        window.location.href = "/admin/listarDoacao";
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