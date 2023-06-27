const input = document.querySelector('#input');
const btn = document.querySelector('#btn');
const erro = document.querySelector('#erro')
const cidade = document.querySelector('#resultado-cidade');
const estado = document.querySelector('#resultado-uf');
const bairro = document.querySelector('#bairro');
const rua = document.querySelector('#rua');

function enviar(event) {
    erro.innerHTML = ''
    erro.classList.remove('active')
    estado.innerHTML = ''
    estado.classList.remove('ativo')
    cidade.innerHTML = ''
    cidade.classList.remove('ativo')
    rua.innerHTML = ''
    rua.classList.remove('ativo')
    bairro.innerHTML = ''
    bairro.classList.remove('ativo')
    event.preventDefault();
    const cep = input.value;
    puxaCep(cep);
    
}

function formatarCEP(input) {
    let cep = input.value.replace(/[^0-9]/g, '');
    cep = cep.substring(0, 8);

    if (cep.length > 5) {
        cep = cep.substring(0, 5) + '-' + cep.substring(5);
    }

    input.value = cep;
}

btn.addEventListener('click', enviar);


function puxaCep(cep) {
    fetch(`https://viacep.com.br/viacep.com.br/ws/${cep}/json/`)
    .then(r => r.json())
    .then(info => {

        if(info.localidade !== '') {
            cidade.innerText = `CIDADE: ${info.localidade.toUpperCase()}`
            cidade.classList.add('ativo')
        }
        else {cidade.classList.remove('ativo')}

        if(info.uf !== ''){
            estado.innerText = `UF: ${info.uf.toUpperCase()}`
            estado.classList.add('ativo')
        }
        else {cidade.classList.remove('ativo')}

        if(info.bairro !== '') {
            bairro.innerText = `BAIRRO: ${info.bairro.toUpperCase()}`
            bairro.classList.add('ativo')
        }
         else {bairro.classList.remove('ativo')}

        if(info.logradouro !== '') {
            rua.innerText = `LOGRADOURO: ${info.logradouro.toUpperCase()}`
            rua.classList.add('ativo')
        }
        else {rua.classList.remove('ativo')}
        
    }).catch(() => {
        erro.classList.add('active')
        erro.innerHTML = 'O CEP não foi encontrado ou não existe !'
    })
}