# Com continuar el projecte amb Claude Code

Guia pas a pas per traspassar aquest projecte al teu ordinador i seguir treballant-hi
amb Claude Code des de la terminal.

---

## Pas 1 — Descarregar i descomprimir

1. Descarrega el fitxer `mon-magic-numeros.zip` que t'he preparat.
2. Descomprimeix-lo on vulguis (per exemple, a la carpeta de Documents o a l'Escriptori).
   Quedarà una carpeta anomenada `mon-magic-numeros`.

## Pas 2 — Instal·lar Claude Code (només la primera vegada)

Si encara no el tens, obre una terminal i instal·la'l. Necessites **Node.js 18 o
superior** instal·lat (comprova-ho amb `node --version`).

```bash
npm install -g @anthropic-ai/claude-code
```

> Si no tens Node.js, descarrega'l primer des de https://nodejs.org (versió LTS).

## Pas 3 — Obrir el projecte amb Claude Code

A la terminal, entra dins la carpeta del projecte i engega Claude Code:

```bash
cd ruta/on/hagis/descomprimit/mon-magic-numeros
claude
```

La primera vegada et demanarà iniciar sessió amb el teu compte d'Anthropic. Segueix
les instruccions que apareixen a la pantalla.

## Pas 4 — Ja pots continuar!

En obrir-se, Claude Code llegeix automàticament el fitxer **`CLAUDE.md`**, que conté
tot el context: què és el joc, què hi ha fet, les restriccions pedagògiques i les
tasques pendents. No cal que li tornis a explicar res.

Pots començar amb un missatge com aquest:

> Hola! Continua el projecte del joc de matemàtiques. Comencem per la primera tasca
> pendent: reescriure la persistència amb localStorage perquè funcioni en local.

O provar el joc primer:

```bash
python3 -m http.server 8000
# obre http://localhost:8000 al navegador
```

---

## Coses útils per demanar a Claude Code

- ~~**"Fes que la persistència funcioni en local"**~~ ✅ Fet (2026-07-12): el progrés
  ja es desa amb `localStorage` i hi ha botó de reiniciar al dashboard.
- **"Afegeix més jocs per a la petita"** (o per a la gran).
- **"Escriu tests per als generadors de preguntes."**
- **"Ajuda'm a publicar-ho a internet gratis"** (Netlify, Vercel, GitHub Pages...).

## Si tens dubtes

Tot el detall pedagògic (rangs de números, textos exactes, colors, comportament de
cada minijoc) està a `docs/prompt-original.md`. Claude Code hi pot accedir sempre que
el necessiti.
