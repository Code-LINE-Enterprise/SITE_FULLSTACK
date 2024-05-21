document.addEventListener("DOMContentLoaded", function () {
    let cod_DoacaoMaterial = window.location.pathname.split("/")[3];
    console.log({ cod_DoacaoMaterial });

        document.getElementById("btnAlterarDoacaoMaterial").addEventListener("click", alterarMaterial);
    
        function limparValidacao() {
            document.getElementById("tipoDoacaoMaterialId").style["border-color"] = "#ced4da"
            document.getElementById("quantDoacao").style["border-color"] = "#ced4da";
        }
    
        function alterarMaterial() {
            limparValidacao();
            let tipoDoacaoMaterialId = document.querySelector("#tipoDoacaoMaterialId").value;
            let quantDoacao = document.querySelector("#quantDoacao").value;
    
            let listaErros = [];
            if(tipoDoacaoMaterialId == "") {
                listaErros.push("tipoDoacaoMaterialId");
            }
            if(quantDoacao == "") {
                listaErros.push("quantDoacao");
            }
    
            if(listaErros.length == 0) {
                //enviar ao backend com fetch
    
                let obj = {
                    tipoDoacaoMaterialId: tipoDoacaoMaterialId,
                    quantDoacao: quantDoacao,
                }

            fetch(`/doacao/alterarDoacaoMaterial/${cod_DoacaoMaterial}`, {
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
                        window.location.href = "/doacao/listarDoacaoMaterial";
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