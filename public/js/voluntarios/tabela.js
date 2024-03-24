var dados = [
    { id: 1, nome: 'João Victor', cpf: '222.333.444-55', email: 'joao@example.com', phone: '(12)56789-0123' },
    { id: 2, nome: 'Gustavo Tacaki', cpf: '333.444.555-66', email: 'gustavo@example.com', phone: '(12)78901-2345' },
    { id: 3, nome: 'Any Velasco', cpf: '444.555.666-77', email: 'any@example.com', phone: '(12)90123-4567' },
    { id: 4, nome: 'Ana Carolina', cpf: '555.666.777-88', email: 'ana@example.com', phone: '(12)12345-6789' },
];

function montarTabela() {
    let tbody = document.querySelector('#tb-body');
    let html = '';

    for (let item of dados) {
        html += `<tr>
                    <td><input type="checkbox" data-id="${item.id}"></td>
                    <td>${item.nome}</td>
                    <td>${item.cpf}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td><a class="btnExcluir" onclick="excluirItem(${item.id})">&#9746;</a></td>
                </tr>`;
    }

    tbody.innerHTML = html;
}

function adicionarItem(nome, cpf, email, phone) {
    let novoObj = {
        id: new Date().getTime(),
        nome: nome,
        cpf: cpf,
        email: email,
        phone: phone,
    };

    dados.push(novoObj);
    montarTabela();
}

function excluirItem(idDel) {
    let vetAux = [];

    for (let i = 0; i < dados.length; i++) {
        if (dados[i].id != idDel)
            vetAux.push(dados[i]);
    }

    dados = vetAux;
    montarTabela();
}

function excluirSelecionados() {
    let vetCheckbox = document.querySelectorAll('[data-id]');

    if (vetCheckbox.length > 0) {
        for (let ck of vetCheckbox) {
            if (ck.checked == true)
                excluirItem(ck.dataset.id);
        }
    } else {
        alert('Não tem itens selecionados para serem excluídos!!');
    }
}

function selecionarTodos() {
    let vetCheckbox = document.querySelectorAll('[data-id]');
    let ckPai = document.querySelector('#ckTodos');

    for (let ck of vetCheckbox) {
        ck.checked = ckPai.checked;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    montarTabela();

    let form = document.querySelector('.php-email-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let nomeInput = document.querySelector('#name');
        let cpfInput = document.querySelector('#cpf');
        let emailInput = document.querySelector('#email');
        let phoneInput = document.querySelector('#phone');

        let nome = nomeInput.value;
        let cpf = cpfInput.value;
        let email = emailInput.value;
        let phone = phoneInput.value;

        adicionarItem(nome, cpf, email, phone);

        nomeInput.value = '';
        cpfInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
    });

    let btnExcluirSelec = document.querySelector('#btnExcluirSelecionados');
    btnExcluirSelec.addEventListener('click', excluirSelecionados);

    let ckPai = document.querySelector('#ckTodos');
    ckPai.addEventListener('click', selecionarTodos);
});
