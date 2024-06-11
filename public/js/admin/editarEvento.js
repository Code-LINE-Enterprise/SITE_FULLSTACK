document.addEventListener("DOMContentLoaded", function () {
    let evento_cad = window.location.pathname.split("/")[3];
    console.log({ evento_cad });

    document.getElementById("btnAlterarEvento").addEventListener("click", editarEvento);

    function limparValidacao() {
        document.getElementById("nome").style["border-color"] = "#ced4da";
        document.getElementById("data").style["border-color"] = "#ced4da";
        document.getElementById("local").style["border-color"] = "#ced4da";
        document.getElementById("desc").style["border-color"] = "#ced4da";
        document.getElementById("eventoStatusId").style["border-color"] = "#ced4da";
    }

    function editarEvento() {
        limparValidacao();
        let nome = document.querySelector("#nome").value;
        let data = document.querySelector("#data").value;
        let local = document.querySelector("#local").value;
        let desc = document.querySelector("#desc").value;
        let eventoStatusId = document.querySelector("#eventoStatusId").value;

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
        if(desc == "") {
            listaErros.push("desc");
        }
        if(eventoStatusId == "") {
            listaErros.push("eventoStatusId");
        }

        if(listaErros.length == 0) {
            //enviar ao backend com fetch

            let obj = {
                nome: nome,
                data: data,
                local: local,
                desc: desc,
                eventoStatusId: eventoStatusId
            }

            fetch(`/evento/alterarEvento/${evento_cad}`, {
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
                        window.location.href = "/evento";
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