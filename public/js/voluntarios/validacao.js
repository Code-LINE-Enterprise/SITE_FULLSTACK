function validateEmail() {
    var emailInput = document.getElementById('email');
    var emailError = document.getElementById('emailError');
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Por favor, insira um endereço de e-mail válido.';
        emailInput.classList.add('error-border');
        return false;
    } else {
        emailError.textContent = '';
        emailInput.classList.remove('error-border');
        return true;
    }
}

document.getElementById('email').addEventListener('blur', validateEmail);

function validacaoCel(){
    var tel = event.target.value;
    tel = tel.replace(/\D/g, "")
    tel = tel.replace(/^(\d)/, "($1")
    tel = tel.replace(/(.{3})(\d)/, "$1)$2")
    if (tel.length == 9) {
       tel = tel.replace(/(.{1})$/, "-$1")
    } else if (tel.length == 10) {
       tel = tel.replace(/(.{2})$/, "-$1")
    } else if (tel.length == 11) {
       tel = tel.replace(/(.{3})$/, "-$1")
    } else if (tel.length == 12) {
       tel = tel.replace(/(.{4})$/, "-$1")
    } else if (tel.length > 12) {
       tel = tel.replace(/(.{4})$/, "-$1")
    }
    event.target.value = tel;
 }

function validarCpf(cpf) {
    cpf = cpf.replace(/\D/g, "");

    if (
        cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999"
    ) {
        return false;
    } else {
        var add = 0;
        for (var i = 0; i < 9; i++) {
            add += parseInt(cpf.charAt(i)) * (10 - i);
        }

        var rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) {
            rev = 0;
        }

        if (rev !== parseInt(cpf.charAt(9))) {
            return false;
        }

        add = 0;
        for (i = 0; i < 10; i++) {
            add += parseInt(cpf.charAt(i)) * (11 - i);
        }

        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) {
            rev = 0;
        }

        return rev === parseInt(cpf.charAt(10));
    }
}

function mascaraCpf(event) {
    var cpfInput = event.target;
    var cpf = cpfInput.value;

    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    cpfInput.value = cpf;

    if (!validarCpf(cpf)) {
        cpfInput.classList.add('error-border');
    } else {
        cpfInput.classList.remove('error-border');
    }
}

document.getElementById('cpf').addEventListener('input', mascaraCpf);

function mascaraCEP(){
    var cep = event.target.value;
    cep = cep.replace(/\D/g, "")
    cep = cep.replace(/^(\d{2})(\d)/, "$1.$2")
    cep = cep.replace(/.(\d{3})(\d)/, ".$1-$2")
    event.target.value = cep;
 }