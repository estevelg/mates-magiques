# CLAUDE.md — Context del projecte "El Món Màgic dels Números"

> Aquest fitxer el llegeix Claude Code automàticament en obrir el projecte.
> Conté tot el context perquè puguis continuar el treball on el vam deixar.

## Què és això

Un joc educatiu de matemàtiques en **català**. Va néixer per a les dues filles de
l'usuari (una acabant Infantil-3 i l'altra acabant 1r de Primària) i des del
2026-07-13 cada perfil tria el seu **curs** — d'Infantil 3 (P3) fins a 6è de
Primària — amb l'itinerari de continguts corresponent (vegeu el punt 2). Des del
2026-07-14 hi ha **dues àrees**: Números 🔢 (matemàtiques) i Lletres 📚 (llengua
catalana, vegeu el punt 12); es trien en una pantalla després del perfil.

Tot el joc viu en un únic fitxer estàtic: **`index.html`** (HTML + CSS + JS vanilla, sense
frameworks ni backend). Funciona obrint el fitxer directament al navegador.

## Estat actual (on ho vam deixar)

El joc ja té implementat:

1. **Selecció de perfils** ("Qui juga avui?"): cada nena crea un perfil amb nom,
   mascota (emoji) i **curs** (`i3`, `i4`, `i5`, `p1`…`p6`). Els perfils antics
   amb grup d'edat es migren sols en carregar (petits→`i4`, grans→`p1`) i el curs
   es pot canviar en qualsevol moment des de la zona de pares.
2. **Itinerari curricular per curs** (LOMLOE: RD 95/2022 d'Infantil i RD 157/2022
   de Primària; a Catalunya, Decret 175/2022). El RD organitza per cicles; aquí es
   reparteix per cursos de manera progressiva. La font de veritat és el mapa
   `GENS` d'`index.html` (una llista de generadors per curs, amb els rangs de cada
   nivell adaptatiu com a paràmetres). Resum:
   - **I3**: comptar i buscar números fins a 3/4/5, on n'hi ha més, colors, formes
     bàsiques, gran/petit, patrons, quin és diferent, toca el color, el dau
     (subitització) i trens llarg/curt. 2-3 opcions de resposta.
   - **I4**: el conjunt "petits" original (comptar fins a 10, sumes/restes visuals
     petites, formes, colors, patrons, gran/petit, busca el número, problemes ≤10)
     més els reptes de varietat afegits el 2026-07-13: quin és diferent, toca el
     color, el dau i trens llarg/curt. 2-3 opcions.
   - **I5**: comptar fins a 20 (també amb distractors barrejats), sumes/restes
     visuals ≤10, ordenar 3 nombres ≤10, seqüències +1, busca el número fins a 15,
     més quin és diferent, toca el color, el dau i trens llarg/curt.
   - **1r (`p1`)**: el conjunt "grans" original, **INTACTE** (especificació exacta
     a `docs/prompt-original.md`): sumes/restes ≤20 sense portar, incògnita,
     dobles/meitats, comparar ≤99, seqüències, geometria, rellotge en punt,
     ordenar, problemes d'un pas, monedes senceres.
   - **2n**: sumes/restes fins a 200 (sense portar al nivell 1, portant després),
     taules del 2/5/10, dobles/meitats ≤50, parells i senars, comparar/ordenar
     ≤999, seqüències de 2/5/10 en 10, rellotge "i mitja", diners amb bitllets i
     moneda de 50 cèntims.
   - **3r**: sumes/restes ≤999 portant, totes les taules, divisió exacta,
     fraccions (identificar i fracció de quantitat), rellotge digital (quarts i de
     5 en 5 minuts), mesures (m/cm/km/mm), perímetre, problemes de dos passos.
   - **4t**: nombres ≤99.999, multiplicació per una xifra amb factors de 2 xifres,
     divisió amb residu, fraccions (comparar i equivalents), decimals amb dècims,
     angles (recte/agut/obtús), àrea del rectangle, mesures (kg/g, l/ml, h/min).
   - **5è**: decimals amb centèsims (comparar/sumar/restar), fraccions (suma amb
     el mateix denominador, de quantitats), múltiples i divisors, percentatges
     (50/25/10/20), operacions combinades (prioritat), mitjana, àrea del rectangle
     i del triangle.
   - **6è**: operacions combinades amb parèntesis, decimals ×10/×100 i per enter,
     fraccions amb denominadors diferents senzills, percentatges amb descomptes,
     proporcionalitat, mitjana, temperatures (enters en context), múltiples i
     divisors, àrees.
3. **Dificultat adaptativa** (3 nivells dins de cada curs): puja/baixa sola segons
   encerts, errors i velocitat de resposta. Els llindars de temps depenen de
   l'etapa del curs (`TEMPS_ETAPA`: infantil / cicle inicial / mitjà / superior —
   als cursos alts es dona més temps perquè les operacions són més llargues).
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
   Des del 2026-07-13 també permet **canviar el curs** de cada perfil amb un
   selector (pensat per al pas de curs al setembre).
9. **Navegació**: botó "↩️ Torna enrere" al formulari de perfil nou (visible només
   si ja existeix algun perfil); el botó 👧 desa i torna a la selecció de jugadora.
10. **Sons** (2026-07-13): efectes generats amb Web Audio (cap fitxer d'àudio):
    arpegi alegre en encertar, dues notes suaus i gens estridents en fallar,
    escaleta en pujar de nivell i fanfara al final del bloc (amb ≥7 encerts).
    Botó 🔔/🔕 a la barra superior per silenciar-los; la preferència es desa a
    localStorage (clau `mates-so`). Tot amb try/catch: si Web Audio no hi és,
    el joc continua en silenci.
11. **Blocs de 10 preguntes** (2026-07-13): les partides van per rondes de 10, amb
    comptador "Pregunta X de 10", barra de progrés del bloc (abans mostrava la
    ratxa d'encerts — canvi respecte a `docs/prompt-original.md`) i pantalla final
    amb el recompte, missatge sempre positiu i botons "Una altra ronda!" / "Plego
    per avui". La tria de reptes va amb **bossa barrejada** (`bossaGens`): es
    baralla la llista de generadors del curs i es consumeix sencera abans de
    repetir-ne cap, així un bloc de 10 queda ben variat (també substitueix
    l'anti-repetició per reintents del prompt original).
12. **Àrea de Lletres** (2026-07-14): itinerari de llengua catalana estil
    Ludilletres a Infantil i currículum de català a Primària (mapa
    `GENS_LLETRES`):
    - **I3**: vocals (buscar, aparellar maj/min), primera lletra de paraules que
      comencen amb vocal, síl·labes picant de mans (1-2).
    - **I4**: consonants en progressió Ludilletres (P M L S T N), síl·labes,
      primera lletra, rimes.
    - **I5**: tot l'abecedari (al nivell 3, sense mostrar la lletra: cal
      reconèixer-la pel nom), majúscula/minúscula, síl·labes, rimes, primeres
      lectures de mots.
    - **1r**: llegir el mot, la lletra amagada (P_MA), síl·labes, rimes,
      article el/la, singular/plural.
    - **2n**: ordenar frases curtes, ordre alfabètic, l'intrús, ortografia
      ca-que-qui/ga-gue-gui.
    - **3r**: sinònims i contraris, b/v i g/j, categoria gramatical
      (nom/verb/adjectiu), ordre alfabètic, ordenar frases.
    - **4t**: temps verbals (passat/present/futur), s/ss/c/ç/z,
      aguda/plana/esdrúixola, sinònims/contraris.
    - **5è**: g/j, x/ix i l·l, accent gràfic, frases fetes, ordenar frases
      llargues.
    - **6è**: h i dièresi, accentuació, frases fetes, temps verbals.
    - **Bancs de paraules curats a mà** (`MOTS`, `RIMES`, `SINONIMS`,
      `ANTONIMS`, `CAMPS`, `FRASES`, `ORTOGRAFIA`, `ACCENTS`, `FRASES_FETES`,
      `VERBS_TEMPS`, `CATEGORIES`): si s'hi afegeixen entrades, revisar
      ortografia, síl·labes i apostrofació a mà.
    - **Nivell adaptatiu per àrea**: `p.nivells = {mates, lletres}` amb migració
      automàtica dels perfils antics; l'historial guarda `area` a cada resposta
      i la zona de pares mostra els nivells i un gràfic d'evolució per àrea.
    - **Desviació documentada del prompt original**: a l'àrea de Lletres amb
      cursos d'infantil, la pregunta es llegeix sola en veu alta en aparèixer
      (un nen que no llegeix no hi podria jugar); a Primària la veu segueix
      sent només manual (botó 🔊).

## Restriccions pedagògiques (NO trencar)

- **Cada curs ha de respectar el seu sostre curricular**: el mapa `GENS`
  d'`index.html` és la font de veritat, i el temari exacte de 1r és a
  `docs/prompt-original.md` (el conjunt de 1r no es toca sense demanar-ho).
- No avançar contingut de cursos posteriors: res de multiplicar abans de 2n, res
  de portar-se abans de 2n, res de fraccions abans de 3r, res de decimals abans
  de 4t, i els nombres negatius només a 6è i en context de temperatura.
- Tots els textos, sempre en **català**. To alegre, molt visual.
- Qualsevol missatge negatiu o punitiu en fallar segueix estrictament prohibit.

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
