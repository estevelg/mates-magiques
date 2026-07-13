# CLAUDE.md — Context del projecte "El Món Màgic dels Números"

> Aquest fitxer el llegeix Claude Code automàticament en obrir el projecte.
> Conté tot el context perquè puguis continuar el treball on el vam deixar.

## Què és això

Un joc educatiu de matemàtiques en **català**, per a les dues filles de l'usuari:

- **La petita**: 4-5 anys, acaba d'acabar Infantil-3.
- **La gran**: 6-7 anys, acaba d'acabar 1r de Primària (currículum de Catalunya).

Tot el joc viu en un únic fitxer estàtic: **`index.html`** (HTML + CSS + JS vanilla, sense
frameworks ni backend). Funciona obrint el fitxer directament al navegador.

## Estat actual (on ho vam deixar)

El joc ja té implementat:

1. **Selecció de perfils** ("Qui juga avui?"): cada filla crea un perfil amb nom,
   mascota (emoji) i grup d'edat (`petits` = 4-5 anys, o `grans` = 6-7 anys).
2. **Contingut adaptat per grup d'edat** (dos conjunts de generadors de preguntes):
   - **Grans (6-7 anys)**: sumes fins a 20, restes, número amagat, dobles/meitats,
     comparar nombres, seqüències, geometria i rellotge. (Especificació completa i
     exacta a `docs/prompt-original.md`.) Afegits el 2026-07-13: **ordenar 3 nombres**
     (fins a 20/60/99 segons nivell), **problemes curts amb historieta** (suma o resta,
     resultat ≤10/15/20) i **monedes** (sempre euros sencers, mai cèntims: només 1 €
     amb total ≤6 / 1 € i 2 € ≤12 / 1 €, 2 € i bitllet de 5 € ≤20).
   - **Petits (4-5 anys)**: comptar objectes, sumes/restes petites amb dibuixos,
     "on n'hi ha més?", formes bàsiques, colors, patrons ABAB i gran/petit.
     Menys opcions de resposta (2-3) i llindars de temps més generosos.
     Afegits el 2026-07-13: **busca el número** (aparellar una xifra gran, 1-5/9/10
     segons nivell) i **problemes curts senzills** (resultat ≤5/8/10, amb dibuixos).
3. **Dificultat adaptativa** (3 nivells): puja/baixa sola segons encerts, errors i
   velocitat de resposta. Els llindars de temps depenen del grup d'edat.
4. **Persistència per perfil**: estrelles, nivell, millor nivell i historial es desen
   a `localStorage` (clau `mates-profiles`). Si `localStorage` no està disponible o les
   dades són corruptes, el joc arrenca de zero sense petar. Hi ha un botó
   "🔄 Reiniciar el progrés" al dashboard que reinicia el perfil actiu (conservant nom,
   mascota i edat), amb confirmació prèvia. *(Reescrit de `window.storage` a
   `localStorage` el 2026-07-12.)*
5. **Text-to-speech en català** (botó 🔊), amb workarounds per bugs de Chrome. Es
   detecta si l'entorn permet la veu i, si no, s'amaga el botó.
6. **Dashboard** d'estadístiques per perfil (encerts, temps mitjà, evolució de nivell).
7. **Mascota animada** i **confeti** en encertar; reforç sempre positiu en fallar.
8. **Zona de pares** (2026-07-13): enllaç discret ("👨‍👩‍👧 Zona de pares") al peu de la
   pantalla "Qui juga avui?", **sense PIN** (decisió de l'usuari). Mostra, per a cada
   perfil: estrelles, nivell actual i màxim, última partida (camp `lastPlayed`,
   timestamp que s'actualitza a `persistProfile`), preguntes/encerts/temps mitjà,
   barres per tipus de repte, gràfic d'evolució i un suggeriment "per reforçar"
   (tipus amb ≥5 respostes i <60% d'encerts). Reutilitza `computeStats`,
   `typeBarsHTML` i `drawEvolutionChart`, compartits amb el dashboard de les nenes.
9. **Navegació**: botó "↩️ Torna enrere" al formulari de perfil nou (visible només
   si ja existeix algun perfil); el botó 👧 desa i torna a la selecció de jugadora.

## Restriccions pedagògiques (NO trencar)

Contingut ajustat al sostre de final de 1r de Primària (Decret 175/2022, Generalitat
de Catalunya). **Explícitament FORA D'ABAST** (no afegir sense demanar-ho):

- Multiplicació, divisió, taules de multiplicar.
- Sumes/restes "portant-se" en columnes de dos dígits.
- Rellotge amb "i mitja" o minuts exactes (només hores "en punt").
- Pentàgons, hexàgons o cossos 3D.
- Qualsevol missatge negatiu o punitiu en fallar.

Tots els textos, sempre en **català**. To alegre, molt visual, per a nenes petites.

## Tasques pendents / properes millores (suggeriments)

1. ~~**[IMPORTANT] Reescriure la persistència amb `localStorage`**~~ ✅ Fet
   (2026-07-12), inclòs el botó "Reiniciar el progrés" al dashboard.
2. **Afegir tests** dels generadors (que `answer` mai sigui null/undefined/NaN, que
   `options` contingui sempre la correcta i no tingui duplicats, per als 3 nivells).
   Per fer-ho bé, convindria separar la lògica de generació del DOM.
3. **(Opcional) Migrar a Vite + mòduls** separant: generadors, estat/dificultat,
   dashboard, TTS i UI. Mantenint EXACTAMENT els textos, rangs numèrics, colors i
   comportament actuals.
4. ~~**(Opcional) Desplegar** com a lloc estàtic gratuït~~ ✅ Fet (2026-07-13):
   publicat a **https://estevelg.github.io/mates-magiques/** (GitHub Pages, repositori
   públic `estevelg/mates-magiques`, branca `main`, arrel). Cada push a `main`
   redesplegua automàticament al cap d'un minut aproximadament.

## Com provar-ho ara mateix

No cal cap build. Obre `index.html` al navegador:

```bash
# opció A: obrir el fitxer directament
open index.html        # macOS
xdg-open index.html    # Linux

# opció B: servidor local (recomanat perquè la veu funcioni millor)
python3 -m http.server 8000
# després obre http://localhost:8000 al navegador
```

## Convencions

- Un sol fitxer per ara (`index.html`). Si es modularitza, documentar-ho aquí.
- Codi i comentaris en català.
- Prioritzar sempre la solució més senzilla, més visual i més adequada per a nenes de
  4-7 anys. Consultar abans de canviar contingut pedagògic, rangs, textos o colors.
