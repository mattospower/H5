/* =========================================================
   Painel de Controle Interativo
   Todos os comportamentos usam addEventListener().
   ========================================================= */

/* ---------- 1. Caixa de mudança de estado ---------- */
const caixa = document.getElementById("caixa");
const textoOriginal = caixa.textContent;
const cores = ["#2f5fd0", "#d9480f", "#2b8a3e", "#862e9c", "#c2255c"];
let indiceCor = 0;

// click: troca a cor de fundo (passa para a próxima cor da lista)
caixa.addEventListener("click", function () {
  indiceCor = (indiceCor + 1) % cores.length;
  caixa.style.backgroundColor = cores[indiceCor];
});

// mouseenter: o cursor entrou na caixa
caixa.addEventListener("mouseenter", function () {
  caixa.textContent = "Mouse está aqui!";
});

// mouseleave: o cursor saiu da caixa, volta ao texto original
caixa.addEventListener("mouseleave", function () {
  caixa.textContent = textoOriginal;
});

// Acessibilidade: permite acionar a caixa com Enter ou Espaço quando focada
caixa.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter" || evento.key === " ") {
    evento.preventDefault();
    caixa.click();
  }
});

/* ---------- 2. Console de teclado ---------- */
const campoTexto = document.getElementById("campo-texto");
const teclaPressionada = document.getElementById("tecla-pressionada");
const listaEnvios = document.getElementById("lista-envios");

campoTexto.addEventListener("keydown", function (evento) {
  // evento.key contém o valor da tecla ("a", "Enter", "ArrowUp"...)
  const nomeTecla = evento.key === " " ? "Espaço" : evento.key;
  teclaPressionada.textContent = "Você pressionou: " + nomeTecla;

  if (evento.key === "Enter") {
    const texto = campoTexto.value.trim();
    if (texto === "") {
      return; // nada para enviar
    }

    // Adiciona uma linha na lista confirmando a submissão rápida
    const item = document.createElement("li");
    item.textContent = "Enviado: " + texto;
    listaEnvios.appendChild(item);

    campoTexto.value = "";
  }
});

/* ---------- 3. Contador com atalhos ---------- */
const valorContador = document.getElementById("valor-contador");
const btnIncrementar = document.getElementById("btn-incrementar");
const btnDecrementar = document.getElementById("btn-decrementar");
let contador = 0;

function atualizarContador() {
  valorContador.textContent = contador;
  valorContador.classList.toggle("negativo", contador < 0);
}

function incrementar() {
  contador++;
  atualizarContador();
}

function decrementar() {
  contador--;
  atualizarContador();
}

btnIncrementar.addEventListener("click", incrementar);
btnDecrementar.addEventListener("click", decrementar);

// Ouvinte global: escuta o teclado em qualquer parte da página
document.addEventListener("keydown", function (evento) {
  if (evento.key === "ArrowUp") {
    evento.preventDefault(); // evita rolar a página
    incrementar();
  } else if (evento.key === "ArrowDown") {
    evento.preventDefault();
    decrementar();
  }
});