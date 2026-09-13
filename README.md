# HVCB App&Games

Site de portfólio dos apps e projetos da HVCB App&Games.

🌐 https://hugobastoss.github.io/hvcb-appgames/

## Apps no site

| App | Plataforma | Status |
|---|---|---|
| Me Paga | Android | Na Google Play |
| Meu Pix | Android | Na Google Play |
| Minhas Compras | Android | Na Google Play |
| Deckslingo | Web | No ar (deckslingo.com) |

## Estrutura

```
index.html        # Português (padrão)
index-en.html     # English
index-es.html     # Español
favicon.svg
assets/
  styles.css                    # estilo compartilhado pelas três páginas
  logo-horizontal-grafite.webp  # logo do topo no tema claro
  logo-horizontal-branco.webp   # logo do topo no tema escuro
  banner-largo-*.webp           # banner branco/grafite (ainda não usado)
  hugo-bastos.webp              # foto da seção Sobre
  icons/                        # ícones dos apps, 256×256 PNG
originais/                      # PNGs de origem da logo e do banner (fora do git)
```

HTML e CSS estáticos, sem build. Publicado pelo GitHub Pages a partir da
branch `main` (raiz).

## Adicionar um app

1. Coloque o ícone em `assets/icons/<app>.png` (256×256).
2. Copie um `<article class="app ...">` nas três páginas e ajuste os textos,
   o status e os links (loja, privacidade, termos).
3. Crie a cor do app em `assets/styles.css` (`.app--<app>`, com versão para
   o modo escuro).

Para um app que ainda não está na loja, use `status--breve` no status e
`<span class="botao botao--off">` no botão. Quando ele for publicado, troque
por `status` e por um link `<a class="botao" href="...">`.

## Rodar localmente

Abra o `index.html` no navegador, ou sirva a pasta:

```bash
python -m http.server 8000
```
