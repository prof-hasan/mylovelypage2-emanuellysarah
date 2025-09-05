const voltarTopo = document.getElementById("voltarTopo");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    voltarTopo.style.display = "block";
  } else {
    voltarTopo.style.display = "none";
  }
});


let etapa = "sombra";
let escolhaSombra = "";
let escolhaBlush = "";
let escolhaBatom = "";

const botoes = document.querySelectorAll(".produto");
const rostoFinal = document.getElementById("rosto");
const etapaTexto = document.getElementById("etapa-texto");

// Mostra apenas a etapa inicial
mostrarEtapa("sombra");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        const tipo = botao.dataset.tipo;
        const valor = botao.dataset.valor;

        if (etapa === "sombra" && tipo === "sombra") {
            escolhaSombra = valor;
            etapa = "blush";
            etapaTexto.innerText = "Agora escolha o blush!";
            mostrarEtapa("blush");
        } else if (etapa === "blush" && tipo === "blush") {
            escolhaBlush = valor;
            etapa = "batom";
            etapaTexto.innerText = "Agora escolha o batom!";
            mostrarEtapa("batom");
        } else if (etapa === "batom" && tipo === "batom") {
            escolhaBatom = valor;
            etapa = "final";

            // Atualiza a imagem final
            rostoFinal.src = `imgs-jogo/${escolhaSombra}-${escolhaBlush}-${escolhaBatom}.png`;

            etapaTexto.innerText = "✨ Prontinho, você está linda!";
            esconderEtapas();
        }
    });
});

function mostrarEtapa(tipo) {
    document.getElementById("sombra-etapa").style.display = (tipo === "sombra") ? "flex" : "none";
    document.getElementById("blush-etapa").style.display = (tipo === "blush") ? "flex" : "none";
    document.getElementById("batom-etapa").style.display = (tipo === "batom") ? "flex" : "none";
}

function esconderEtapas() {
    document.querySelectorAll(".etapa").forEach(div => div.style.display = "none");
}



const botaoReiniciar = document.getElementById("reiniciar");

botaoReiniciar.addEventListener("click", () => {
    escolhaSombra = "";
    escolhaBlush = "";
    escolhaBatom = "";
    etapa = "sombra";

    rostoFinal.src = "imgs-jogo/rostofem.jpg";
    etapaTexto.innerText = "Escolha a sombra:";
    mostrarEtapa("sombra");
});


const target = "maquiagem";
let buffer = "";

const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");

function showConfetti(qtde = 50) {
  const colors = ["#f472b6", "#f59e0b", "#10b981", "#3b82f6", "#a78bfa"];
  for (let i = 0; i < qtde; i++) {
    const el = document.createElement("div");
    el.className = "confetti";
    el.style.left = Math.random() * 100 + "vw";
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDuration = 2000 + Math.random() * 2000 + "ms";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }
}

function openModal() {
  modal.classList.add("open");
  showConfetti(70);
}

function closeModal() {
  modal.classList.remove("open");
}

window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (key.length === 1) {
    buffer += key;
    if (buffer.length > target.length) {
      buffer = buffer.slice(-target.length);
    }
    if (buffer === target) {
      openModal();
      buffer = "";
    }
  }
  if (e.key === "Escape") closeModal();
});

closeBtn.addEventListener("click", closeModal);
