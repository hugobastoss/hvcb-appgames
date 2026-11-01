(function () {
  "use strict";

  var STORAGE_KEY = "tema";
  var ORDEM = ["auto", "light", "dark"];
  var ROTULOS = {
    auto: { pt: "Auto", en: "Auto", es: "Auto" },
    light: { pt: "Claro", en: "Light", es: "Claro" },
    dark: { pt: "Escuro", en: "Dark", es: "Oscuro" }
  };

  function idioma() {
    var lang = document.documentElement.lang || "pt-BR";
    if (lang.indexOf("en") === 0) return "en";
    if (lang.indexOf("es") === 0) return "es";
    return "pt";
  }

  function temaAtual() {
    var t = document.documentElement.getAttribute("data-theme");
    return t === "light" || t === "dark" ? t : "auto";
  }

  function temaResolvido() {
    var t = temaAtual();
    if (t !== "auto") return t;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function atualizarThemeColor() {
    var cor = temaResolvido() === "dark" ? "#101211" : "#F5F3EE";
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) metas[i].setAttribute("content", cor);
  }

  function atualizarBotao(botao) {
    var t = temaAtual();
    botao.textContent = ROTULOS[t][idioma()];
    botao.setAttribute("aria-label", "Tema: " + ROTULOS[t][idioma()] + ". Toque para mudar.");
  }

  function aplicarTema(t) {
    if (t === "auto") {
      document.documentElement.removeAttribute("data-theme");
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    } else {
      document.documentElement.setAttribute("data-theme", t);
      try { localStorage.setItem(STORAGE_KEY, t); } catch (e) {}
    }
    atualizarThemeColor();
  }

  function iniciar() {
    var botao = document.getElementById("temaBotao");
    if (!botao) return;
    atualizarBotao(botao);
    atualizarThemeColor();
    botao.addEventListener("click", function () {
      var proximo = ORDEM[(ORDEM.indexOf(temaAtual()) + 1) % ORDEM.length];
      aplicarTema(proximo);
      atualizarBotao(botao);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
      if (temaAtual() === "auto") atualizarThemeColor();
    });
  }
})();
