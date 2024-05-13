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
                        <td><button class="btnAdicionar" data-produto="${carrinho[i].produtoId}">+</button><input type="number" class="digitar" id="prodId-${carrinho[i].produtoId}" value="${carrinho[i].quantidade}"></input><button class="btnDiminuir" data-produto="${carrinho[i].produtoId}">-</button></td>
                        <td id="produto-${carrinho[i].produtoId}">R$${valorTotalItem}</td>
                        <td><button class="btnExcluir" data-cod="${carrinho[i].produtoId}"><i class="fas fa-trash"></i></button></td>
                    </tr>`;

            html += ``
        }
        let total = valorTotal();
        document.getElementById("valorTotal").innerText = `Total: R$${total}`;

        document.querySelector("#tabelaCarrinho > tbody").innerHTML = html;
        carregaBotao();

    }

    function carregaBotao(){
        let adicionar = document.querySelectorAll(".btnAdicionar");
        let diminuir = document.querySelectorAll(".btnDiminuir");
        let digitar = document.querySelectorAll(".digitar");
        let excluir = document.querySelectorAll(".btnExcluir")

        for(let i = 0; i < adicionar.length; i++){
            adicionar[i].addEventListener("click", aumentarItemCarrinho);
            diminuir[i].addEventListener("click", diminuirItemCarrinho);
            digitar[i].addEventListener("input", digitarValor);
            excluir[i].addEventListener("click", excluirItem);
        }
    }

    function valorTotal(){
        let valor = 0;
        for(let i=0; i < carrinho.length; i++){
            let valorTotalItem = carrinho[i].produtoValor * carrinho[i].quantidade;
            valor += valorTotalItem;
        }
        return valor;
    }

    function excluirItem(){
        if(confirm("Tem certeza que deseja excluir o item do carrinho?")){
            carrinho = JSON.parse(localStorage.getItem("carrinho"));
            id = this.dataset.cod
            let posicao = posicaoCarrinho(id);
            carrinho.splice(posicao, 1);
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            carregarCarrinho();
            document.getElementById("contadorCarrinho").innerText = carrinho.length;
        }
    }

    function posicaoCarrinho(id){
        let posicao = -1;

        for(let i = 0; i < carrinho.length; i++){
            if(carrinho[i].produtoId == id)
                {
                    posicao = i;
                }
        }
        return posicao;
    }

    function mudarValor(produtoId, quantidade, valorAtual){
        id= document.querySelector(`#prodId-${produtoId}`);
        valorItem = document.querySelector(`#produto-${produtoId}`);
        totalFinal = document.querySelector("#valorTotal")
        
        id.value = quantidade;
        valorItem.innerText = valorAtual;

        let total = valorTotal();
        totalFinal.innerText = `Total: R$${total}`;
    }

    function digitarValor(){
        let recebeValor = document.querySelector(`#${this.id}`);
        carrinho = JSON.parse(localStorage.getItem("carrinho"));
        let id = recebeValor.id.replace(/\bprodId-\b/, "");
        let posicao = posicaoCarrinho(id);

        if(recebeValor.value > 999){
            carrinho[posicao].quantidade = 999;
        }
        else if(recebeValor.value < 0){
            carrinho[posicao].quantidade = 0;
        }
        else{
            carrinho[posicao].quantidade = recebeValor.value;
        }

        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        let valorAtual = "R$" + carrinho[posicao].quantidade * carrinho[posicao].produtoValor;
        mudarValor(id, carrinho[posicao].quantidade, valorAtual);
    }

    function aumentarItemCarrinho(){
        id = this.dataset.produto;
        carrinho = JSON.parse(localStorage.getItem("carrinho"));
        let posicao = posicaoCarrinho(id);

        if(carrinho[posicao].quantidade < 999){
            carrinho[posicao].quantidade++;
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
        }

        let valorAtual = "R$" + carrinho[posicao].quantidade * carrinho[posicao].produtoValor;
        mudarValor(id, carrinho[posicao].quantidade, valorAtual);
    }

    function diminuirItemCarrinho(){
        id = this.dataset.produto;
        carrinho = JSON.parse(localStorage.getItem("carrinho"));
        let posicao = posicaoCarrinho(id);

        if(carrinho[posicao].quantidade > 0){
            carrinho[posicao].quantidade--;
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
        }

        let valorAtual = "R$" + carrinho[posicao].quantidade * carrinho[posicao].produtoValor;
        mudarValor(id, carrinho[posicao].quantidade, valorAtual);
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

        fetch("/admin/obter/" + id)
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