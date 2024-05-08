document.addEventListener("DOMContentLoaded", function() {

    var btnAddCarrinho = document.querySelectorAll(".btnAddCarrinho");

    let carrinho = [];

    if(localStorage.getItem("carrinho") != null) {
        carrinho = JSON.parse(localStorage.getItem("carrinho"));

        document.getElementById("contadorCarrinho").innerText = carrinho.length;
    }

    for(let i = 0; i < btnAddCarrinho.length; i++) {
        btnAddCarrinho[i].addEventListener("click", adicionarAoCarrinho);
    }

    var modalCarrinho = document.getElementById('modalCarrinho')
    modalCarrinho.addEventListener('show.bs.modal', function (event) {
        carregarCarrinho();
    })

    function carregarCarrinho() {

        let html = "";

        let carrinhoModal = JSON.parse(localStorage.getItem("carrinho"));

        for(let i = 0; i<carrinhoModal.length; i++) {

            let valorTotalItem = carrinho[i].produtoValor * carrinho[i].quantidade;

            html += `<tr>
                        <td>${carrinho[i].produtoId}</td>                       
                        <td><img width="100" src="${carrinho[i].produtoImagem}" /></td>
                        <td>${carrinho[i].produtoNome}</td>
                        <td>R$${carrinho[i].produtoValor}</td>
                        <td>${carrinho[i].quantidade}</td>
                        <td>R$${valorTotalItem}</td>
                    </tr>`;
        }

        document.querySelector("#tabelaCarrinho > tbody").innerHTML = html;

    }

    function adicionarItemCarrinho(item) {
        let lista = localStorage.getItem("carrinho");

        if(lista != null) {
            carrinho = JSON.parse(lista);
            let achou = false;
            for(let i = 0; i < carrinho.length; i++){
                if(carrinho[i].produtoId == item.produtoId) {
                    carrinho[i].quantidade++;
                    achou = true;
                }
            }

            if(achou == false) {
                item.quantidade = 1;
                carrinho.push(item);
            }

            localStorage.setItem("carrinho", JSON.stringify(carrinho));
        }
        else{
            item.quantidade = 1;
            carrinho.push(item);
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
        }

        //incrementar contador com a nova lista;
        carrinho = JSON.parse(localStorage.getItem("carrinho"));
        document.getElementById("contadorCarrinho").innerText = carrinho.length;
    }

    function adicionarAoCarrinho() {
        let id = this.dataset.produtoid;
        console.log(id);

        fetch("/produto/obter/" + id)
        .then(r=> {
            return r.json();
        })
        .then(r=> {
            if(r.produtoEncontrado != null) {
                adicionarItemCarrinho(r.produtoEncontrado);

                this.innerHTML = "<i class='fas fa-check'></i> Produto adicionado!";
                
                let that = this;
                setTimeout(function() {
                    that.innerHTML = `<i class="bi-cart-fill me-1"></i> Adicionar ao carrinho`;
                }, 5000);
            }
        })
    }

})