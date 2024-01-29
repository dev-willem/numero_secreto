// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número aleatório entre 0 e 10'

let listaDeNumerosSorteados = [];
let numeroLimite = 8;
let numeroSecreto = numberRandom();
let tentativas = 1;

function alterarTextos(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    alterarTextos('h1', 'Jogo do número secreto');
    alterarTextos('p', `Escolha um número aleatório entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

function verificarChute() {
    let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
    let chute = document.querySelector('input').value;
    let mensagemVitoria = `Parabéns! Você acertou o número secreto com ${tentativas} ${palavraTentativas}!`;

    if (chute == numeroSecreto) {
        alterarTextos('h1', 'Acertou!');
        alterarTextos('p', mensagemVitoria);
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        if (chute < numeroSecreto) {
            alterarTextos('p', 'O número secreto é maior!');
        } else {
            alterarTextos('p', 'O número secreto é menor!');
        }
        tentativas++;
        limparCampo();
    }
}

function reiniciarJogo() {
    numeroSecreto = numberRandom();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function numberRandom() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeLista = listaDeNumerosSorteados.length;

    if (quantidadeLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return numberRandom();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}



