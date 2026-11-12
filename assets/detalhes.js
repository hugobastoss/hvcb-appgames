(function () {
  "use strict";

  // Capturas de tela da Play Store por app (sem os banners de destaque).
  var GALERIAS = {
  "mepaga": [
    "assets/screenshorts/Screenshots Play Store - Me Paga/Play Store Screenshots-selection  (1).png",
    "assets/screenshorts/Screenshots Play Store - Me Paga/Play Store Screenshots-selection  (2).png",
    "assets/screenshorts/Screenshots Play Store - Me Paga/Play Store Screenshots-selection  (3).png",
    "assets/screenshorts/Screenshots Play Store - Me Paga/Play Store Screenshots-selection  (4).png",
    "assets/screenshorts/Screenshots Play Store - Me Paga/Play Store Screenshots-selection  (5).png",
    "assets/screenshorts/Screenshots Play Store - Me Paga/Play Store Screenshots-selection  (6).png",
    "assets/screenshorts/Screenshots Play Store - Me Paga/Play Store Screenshots-selection  (7).png"
  ],
  "meupix": [
    "assets/screenshorts/Screenshots Play Store - Meu Pix/captura-01.png",
    "assets/screenshorts/Screenshots Play Store - Meu Pix/captura-02.png",
    "assets/screenshorts/Screenshots Play Store - Meu Pix/captura-03.png",
    "assets/screenshorts/Screenshots Play Store - Meu Pix/captura-04.png",
    "assets/screenshorts/Screenshots Play Store - Meu Pix/captura-05.png"
  ],
  "minhascompras": [
    "assets/screenshorts/Screenshots Play Store - Minhas Compras/01-minhas-listas-1080x1920.png",
    "assets/screenshorts/Screenshots Play Store - Minhas Compras/02-itens-da-lista-1080x1920.png",
    "assets/screenshorts/Screenshots Play Store - Minhas Compras/03-escolher-categoria-1080x1920.png",
    "assets/screenshorts/Screenshots Play Store - Minhas Compras/04-produtos-sugeridos-1080x1920.png",
    "assets/screenshorts/Screenshots Play Store - Minhas Compras/05-orcamento-resumo-1080x1920.png",
    "assets/screenshorts/Screenshots Play Store - Minhas Compras/06-calculadora-1080x1920.png"
  ],
  "pagueme": [
    "assets/screenshorts/Play Store screenshots - Pagueme/01-sala-de-jogo.png",
    "assets/screenshorts/Play Store screenshots - Pagueme/02-extrato.png",
    "assets/screenshorts/Play Store screenshots - Pagueme/03-painel-do-banco.png",
    "assets/screenshorts/Play Store screenshots - Pagueme/04-titulos.png",
    "assets/screenshorts/Play Store screenshots - Pagueme/05-investimentos.png",
    "assets/screenshorts/Play Store screenshots - Pagueme/06-dados.png"
  ]
};

  var TEXTOS = {
    pt: { captura: "Captura", de: "de", ver: "Ver capturas", pausa: "Pausar", fechar: "Fechar" },
    en: { captura: "Screenshot", de: "of", ver: "View screenshots", pausa: "Pause", fechar: "Close" },
    es: { captura: "Captura", de: "de", ver: "Ver capturas", pausa: "Pausar", fechar: "Cerrar" }
  };

  var INTERVALO = 5000;

  var dlg = document.getElementById("detalhe");
  if (!dlg || !dlg.showModal) return;

  var lang = (document.documentElement.lang || "pt").slice(0, 2);
  var T = TEXTOS[lang] || TEXTOS.pt;
  var info = dlg.querySelector(".detalhe-info");
  var palco = dlg.querySelector(".galeria-palco");
  var img = dlg.querySelector(".galeria-img");
  var pontos = dlg.querySelector(".galeria-pontos");
  var anterior = dlg.querySelector(".galeria-anterior");
  var proxima = dlg.querySelector(".galeria-proxima");
  var fechar = dlg.querySelector(".detalhe-fechar");
  var reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

  var lista = [];
  var indice = 0;
  var nomeApp = "";
  var timer = null;
  var pausado = false;

  function atualizarPontos() {
    var botoes = pontos.querySelectorAll("button");
    for (var i = 0; i < botoes.length; i++) {
      if (i === indice) botoes[i].setAttribute("aria-current", "true");
      else botoes[i].removeAttribute("aria-current");
    }
  }

  function mostrar(i) {
    if (!lista.length) return;
    indice = (i + lista.length) % lista.length;
    img.src = encodeURI(lista[indice]);
    img.alt = T.captura + " " + (indice + 1) + " " + T.de + " " + lista.length + " — " + nomeApp;
    atualizarPontos();
  }

  function pararAuto() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function iniciarAuto() {
    pararAuto();
    if (pausado || reduzirMovimento.matches || lista.length < 2) return;
    timer = setInterval(function () { mostrar(indice + 1); }, INTERVALO);
  }

  function criarPontos() {
    pontos.innerHTML = "";
    for (var i = 0; i < lista.length; i++) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "galeria-ponto";
      b.setAttribute("aria-label", T.captura + " " + (i + 1) + " " + T.de + " " + lista.length);
      b.setAttribute("data-i", i);
      pontos.appendChild(b);
    }
  }

  function abrir(card) {
    var key = card.getAttribute("data-app");
    lista = GALERIAS[key] || [];
    if (!lista.length) return;
    nomeApp = (card.querySelector("h3") || {}).textContent || "";

    // Lado esquerdo: copia o conteúdo do card (nome, descrição, lista, botões), sem o botão de capturas.
    info.innerHTML = "";
    var partes = card.children;
    for (var i = 0; i < partes.length; i++) {
      var el = partes[i];
      if (el.classList.contains("app-acoes")) {
        var acoes = el.cloneNode(true);
        var ver = acoes.querySelector(".detalhe-ver");
        if (ver) ver.remove();
        info.appendChild(acoes);
      } else {
        info.appendChild(el.cloneNode(true));
      }
    }

    var cs = getComputedStyle(card);
    dlg.style.setProperty("--accent", cs.getPropertyValue("--accent"));
    dlg.style.setProperty("--accent-soft", cs.getPropertyValue("--accent-soft"));
    dlg.style.setProperty("--on-accent", cs.getPropertyValue("--on-accent"));

    criarPontos();
    pausado = false;
    if (!dlg.open) dlg.showModal();
    mostrar(0);
    iniciarAuto();
  }

  function proximaCaptura() { mostrar(indice + 1); iniciarAuto(); }
  function capturaAnterior() { mostrar(indice - 1); iniciarAuto(); }

  // Cliques nos cards: o botão "Ver capturas" ou o próprio card abre o modal.
  // Links e botões dentro do card (ex.: Baixar, Privacidade) continuam funcionando normalmente.
  document.addEventListener("click", function (e) {
    var ver = e.target.closest(".app[data-app] .detalhe-ver");
    if (ver) { abrir(ver.closest(".app[data-app]")); return; }
    if (e.target.closest("a, button")) return;
    var card = e.target.closest(".app[data-app]");
    if (card) abrir(card);
  });

  fechar.addEventListener("click", function () { dlg.close(); });
  proxima.addEventListener("click", proximaCaptura);
  anterior.addEventListener("click", capturaAnterior);

  pontos.addEventListener("click", function (e) {
    var b = e.target.closest(".galeria-ponto");
    if (!b) return;
    mostrar(parseInt(b.getAttribute("data-i"), 10));
    iniciarAuto();
  });

  // Clique no fundo (fora da caixa) fecha o modal.
  dlg.addEventListener("click", function (e) {
    if (e.target === dlg) dlg.close();
  });

  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); proximaCaptura(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); capturaAnterior(); }
  });

  // Pausa o carrossel enquanto o mouse ou o foco estiver sobre a galeria.
  palco.addEventListener("mouseenter", function () { pausado = true; pararAuto(); });
  palco.addEventListener("mouseleave", function () { pausado = false; iniciarAuto(); });

  dlg.addEventListener("close", function () {
    pararAuto();
    img.removeAttribute("src");
  });
})();
