> **NOTA (actualització posterior):** Aquest prompt original descrivia el joc només
> per a la filla gran (6-7 anys). Després es va ampliar amb un **sistema de perfils**
> per a les dues germanes, afegint un segon conjunt de jocs per a la petita (4-5 anys,
> Infantil). Tot el que hi ha en aquest document segueix sent vàlid per al grup "grans";
> per al context complet i actualitzat, vegeu `../CLAUDE.md`.

---

# Prompt per a Claude Code — "El Món Màgic dels Números"

Copia i enganxa tot el contingut d'aquest document a Claude Code per generar l'aplicació web des de zero.

---

## PROMPT

Vull que construeixis, de zero i com a aplicació web completa i desplegable, un joc educatiu de matemàtiques interactiu per a la meva filla, que acaba de finalitzar 1r de Primària (6-7 anys) a Catalunya. Ja existeix un prototip funcional en un únic fitxer HTML/CSS/JS (vanilla, sense frameworks) que has de fer servir com a especificació funcional exacta. A continuació tens absolutament tots els detalls, regles numèriques, textos, colors i comportaments que ha de tenir l'aplicació. No inventis contingut nou sense que t'ho demani: reprodueix fidelment aquesta lògica i, després, millora l'arquitectura del codi (components, tests, build) tal com et sembli més adequat per a un projecte de producció.

### 1. Context i objectiu pedagògic

- Usuària: nena de 7 anys, acaba de finalitzar 1r de Primària i comença 2n.
- Idioma: 100% en català (textos, veu, tot).
- Contingut ajustat al **sostre de coneixements de final de 1r de Primària** segons el currículum de la Generalitat de Catalunya (Decret 175/2022 d'ordenació dels ensenyaments de l'educació bàsica, àrea de Matemàtiques, cicle inicial): numeració i comparació de nombres fins a 99, sumes i restes fins a 20 (sense "portar-se" en columnes, encara amb comptatge/manipulatius), descomposició en desena i unitats per als nombres d'11 a 20, dobles i meitats bàsics, geometria plana bàsica (cercle, quadrat, triangle, rectangle, estrella i el seu nombre de costats), seqüències/patrons lògics senzills, i lectura de l'hora "en punt" al rellotge analògic. **No incloguis multiplicació, taules de multiplicar, portar-se/manllevar en columnes de dos dígits, "i mitja" al rellotge, ni figures geomètriques avançades (pentàgons, hexàgons, cossos 3D)** — tot això és contingut de 2n de Primària en endavant i s'ha d'evitar explícitament en aquesta versió.
- To visual: alegre, senzill, molt visual, amb una mascota (guineu 🦊), confeti en encertar, i mai missatges punitius en fallar (sempre reforç positiu i "torna-ho a provar").
- Ha de funcionar 100% al navegador, sense backend ni connexió a internet (excepte per la síntesi de veu del navegador, que és nativa).

### 2. Arquitectura general de la pantalla

Una única pantalla ("app") centrada, amplada màxima ~640px, amb aquesta estructura de dalt a baix:

1. **Barra superior (topbar)**: títol "🦊 Món Màgic dels Números" a l'esquerra; a la dreta, en aquest ordre: comptador d'estrelles (⭐ + número), insígnia de "Nivell X" (X = 1, 2 o 3), i un botó rodó d'icona "📊" que obre el dashboard d'estadístiques.
2. **Fila de la mascota**: emoji 🦊 gran (3.2rem), amb dues animacions CSS possibles: `bounce` (salt alegre, 0.6s) quan encerta i `shake` (tremolor lateral, 0.5s) quan falla.
3. **Barra de progrés**: barra fina (14px alt) que es va omplint en funció de `streakCorrect/3` (mostra visualment quant falta per pujar de nivell per la via "3 encerts seguits").
4. **Panell de dashboard** (ocult per defecte, es mostra en lloc de la targeta de joc quan es prem el botó 📊): vegeu secció 6.
5. **Targeta de joc (game-card)**: fons blau molt clar (`--fons: #eef6ff`), cantonades molt arrodonides (24px), conté:
   - Etiqueta petita del tipus de joc en majúscules (p. ex. "SUMES ➕")
   - Fila de l'enunciat: el text de la pregunta + un botó rodó "🔊" per llegir-lo en veu alta
   - Àrea visual (dibuixos, xifres, rellotge, figures...)
   - Graella de botons de resposta (2-4 opcions)
   - Línia de feedback (verd si encerta, rosa si falla)
   - Botó "Següent 👉" que apareix només després de respondre
6. **Peu de pàgina**: text petit "Fet amb 💛 · adaptat al final de 1r de Primària (6-7 anys)".

### 3. Sistema visual (paleta, tipografia, components)

Paleta de colors (variables CSS):
```
--blau: #4fc3f7
--verd: #81d4a2
--groc: #ffd54f
--taronja: #ff9e6d
--rosa: #ff8fab
--morat: #b39ddb
--fons: #eef6ff
--text: #3a3a5c
```
- Tipografia: `'Comic Sans MS', 'Baloo 2', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` (estil manuscrit/infantil, arrodonit).
- Fons general de la pàgina: degradat suau `linear-gradient(160deg, #fff7e6 0%, #eaf6ff 50%, #eaffef 100%)`.
- Targeta principal (`.app`): fons blanc, `border-radius: 32px`, ombra doble (una ombra sòlida per efecte "3D pla" tipus botó de joc, `0 12px 0 rgba(0,0,0,0.06)`, més una ombra difuminada normal).
- Botons de resposta (`.option-btn`): fons blanc, vora de 3px `#d7e3ff`, `border-radius: 18px`, ombra sòlida inferior `0 4px 0 #d7e3ff` que simula un botó prement-se (`translateY(2px)` i ombra `0 1px 0` en `:active`). En sortir la resposta: verd (`--verd`, vora `#5cb586`) si és la correcta, rosa (`--rosa`, vora `#e4638a`) si és la incorrecta seleccionada. Un cop respost, tots els botons queden `disabled`.
- Botons rodons d'icona (`.icon-btn`, per als botons 🔊 i 📊): 38x38px, cercle, fons blanc, vora 2px `#d7e3ff`, mateix efecte d'ombra/prement que els altres botons.
- Confeti en encertar: 12 elements `<div>` amb un emoji aleatori d'entre 🎉⭐✨🎈🌟, posicionats a un `left` aleatori (2-96vw), que cauen amb `translateY(105vh) rotate(360deg)` i s'esvaeixen, durada aleatòria entre 1.2 i 2.2s, `position: fixed`, `pointer-events: none`, s'eliminen del DOM als 2.4s.
- Representació de nombres per valor posicional (`placeValueHTML`): cada xifra del número es mostra en una "capseta" (`.digit-box`) de color; totes les xifres excepte l'última (unitats) són blaves (`--blau`), la xifra d'unitats és taronja (`--taronja`). S'usa per representar nombres d'11-20 a les sumes de nivell 3 i per comparar nombres a "Compara nombres".
- Figures geomètriques fetes amb CSS pur (no imatges): cercle (`border-radius:50%`), quadrat, triangle (mètode dels borders transparents), rectangle, i estrella (emoji ⭐ gran). Totes de mida ~90-110px, amb un color aleatori de la paleta.
- Rellotge analògic fet amb SVG generat dinàmicament: cercle blanc amb vora blava, els 12 números col·locats trigonomètricament (`x = 50 + 38*cos(angle)`, `y = 50 + 38*sin(angle)`, amb `angle = (i*30-90) graus en radians`), agulla d'hores (blava, `stroke-width 4`, longitud fins a y=28) i agulla de minuts (rosa, `stroke-width 3`, longitud fins a y=18), rotades amb `transform="rotate(angle 50 50)"`.
- Responsive: en pantalles <420px es redueixen lleugerament les mides de tipografia (títol, pregunta, fila visual) i l'etiqueta de barres del dashboard.

### 4. Els 8 minijocs (generadors de preguntes)

El sistema té un array de 8 "generadors" de preguntes. Cada ronda es tria un generador a l'atzar, evitant repetir el mateix tipus dues vegades seguides (si surt el mateix tipus, es torna a intentar fins a 5 vegades). Cada generador retorna un objecte amb: `type` (identificador intern), `label` (etiqueta amb emoji), `question` (text), `visualHTML` (contingut visual), `options` (array de 2-4 respostes possibles, sempre incloent la correcta, sense duplicats), `answer` (resposta correcta).

Hi ha 3 nivells de dificultat (1 = més fàcil, 3 = més difícil dins del sostre de 1r). Detall exacte per generador:

**4.1. Sumes ➕ (`genAddition`)**
- Nivell 1: `a` i `b` aleatoris entre 1 i 8, es regenera fins que `a+b <= 10`. Visual: comptatge amb un emoji aleatori repetit `a` vegades + símbol "+" + el mateix emoji repetit `b` vegades, dins de "grups" (targetes blanques arrodonides).
- Nivell 2: `a` i `b` entre 1 i 10, regenerat fins que `a+b <= 15`. Mateix format visual de comptatge amb emojis.
- Nivell 3: `a` i `b` entre 1 i 12, regenerat fins que `a+b <= 20`. Visual: en comptes de comptar emojis, es mostra el número en capsetes de valor posicional (`placeValueHTML`) per treballar la descomposició en desena i unitat.
- Pregunta: "Quant és {a} + {b}?"
- Opcions: 4 valors únics incloent la resposta correcta, amb un marge de ±3 (nivell 1) o ±5 (nivells 2-3) al voltant de la resposta.

**4.2. Restes ➖ (`genSubtraction`)**
- Nivell 1: `a` entre 3 i 10, `b` entre 0 i `a`.
- Nivell 2: `a` entre 5 i 15, `b` entre 0 i `a`.
- Nivell 3: `a` entre 10 i 20, `b` entre 0 i `a`.
- Visual: un emoji aleatori repetit `a` vegades, on els primers `b` elements apareixen ratllats i amb opacitat 0.25 (`text-decoration: line-through; opacity: 0.25`) simulant que se n'han tret.
- Pregunta: "Hi havia {a} {nom del emoji en plural, p. ex. 'pomes'}. En traiem {b}. Quants en queden?"
- Diccionari de noms d'emojis en català (masculí/femení plural): 🍎→pomes, ⭐→estrelles, 🎈→globus, 🐟→peixos, 🍓→maduixes, 🚗→cotxes, 🐝→abelles, 🍪→galetes, 🐸→granotes, 🌸→flors.
- Opcions: 4 valors únics entre 0 i `answer+5`, incloent la resposta.

**4.3. Troba el número 🔍 (`genMissingNumber`)** — equacions amb una incògnita
- Rang màxim segons nivell: 10 (nivell 1), 15 (nivell 2), 20 (nivell 3).
- Es generen `a` i `b` tals que `a+b` no superi el màxim.
- A l'atzar, la incògnita és `a` o `b`: mostra "? + {b} = {a+b}" o "{a} + ? = {a+b}".
- Pregunta fixa: "Quin número falta?" (el text de l'equació es mostra dins l'àrea visual, en una targeta blanca gran).
- Opcions: 4 valors únics amb marge ±5 al voltant de la resposta.

**4.4. Dobles i meitats 🔁 (`genDoubleHalf`)**
- Rang màxim segons nivell: 5 (nivell 1), 8 (nivell 2), 10 (nivell 3).
- 50% de probabilitat de preguntar pel doble, 50% per la meitat.
- Doble: `n` aleatori dins el rang; pregunta "Quin és el doble de {n}?"; visual mostra "{n} + {n}"; resposta = `n*2`. Opcions amb marge ±6.
- Meitat: es genera `half` dins el rang i `n = half*2`; pregunta "Quina és la meitat de {n}?"; visual mostra "{n} ÷ 2"; resposta = `half`. Opcions amb marge ±5.

**4.5. Compara nombres 🔍 (`genCompare`)**
- Rang màxim segons nivell: 20 (nivell 1), 60 (nivell 2), 99 (nivell 3). Numeració/comparació té un sostre més alt que el càlcul perquè el currículum de 1r treballa el reconeixement de nombres fins a 99-100 encara que el càlcul es quedi en 20.
- Es generen dos nombres diferents `a` i `b` (mai iguals).
- 50% pregunta "Quin número és MÉS GRAN?", 50% "Quin número és MÉS PETIT?".
- Visual: els dos nombres es mostren amb `placeValueHTML`, etiquetats "A" i "B" amb un "vs" al mig.
- Opcions: sempre exactament `['A', 'B']`.

**4.6. Seqüències lògiques 🔢 (`genSequence`)** — dos subtipus
- Subtipus numèric (sempre a nivell 2-3; a nivell 1 surt amb 50% de probabilitat, l'altre 50% surt el subtipus de patrons visuals):
  - Pas (`step`): nivell 1 sempre `+1`; nivell 2 pot ser `+1` (2x més probable) o `+2`; nivell 3 pot ser `+1`, `+2` o `-1`.
  - Valor inicial aleatori: fins a 10 (nivell 1), 20 (nivell 2), 25 (nivell 3) — si el pas és negatiu, es suma +5 al màxim inicial per evitar negatius.
  - Es generen 4 termes consecutius aplicant el pas; la resposta és el 5è terme.
  - Visual: els 4 números en targetes connectades per fletxes "→", acabant en una targeta interrogant "?" (fons groguenc, vora discontínua).
  - Pregunta: "Quin número segueix?"
  - Opcions amb marge `±(abs(step)*2+2)`.
- Subtipus de patró visual (emojis):
  - Longitud del patró base: 2 emojis diferents (nivell 1) o 3 (nivells 2-3), triats a l'atzar i repetits 3 vegades seguides per formar la seqüència mostrada.
  - Pregunta: "Quin dibuix segueix al patró?"
  - Resposta correcta = primer emoji del patró (ja que la seqüència és cíclica).
  - Opcions: la resposta correcta + 3 emojis que NO formen part del patró, en ordre aleatori.

**4.7. Geometria 🔺 (`genGeometry`)** — dos subtipus
- Nivell 1: només formes bàsiques disponibles: cercle, quadrat, triangle.
- Nivells 2-3: també rectangle i estrella.
- Amb un 40% de probabilitat (només si nivell ≥ 2) es pregunta pel nombre de costats en comptes del nom:
  - Nombre de costats només es pregunta per quadrat (4), triangle (3) i rectangle (4) — mai per cercle ni estrella.
  - Pregunta: "Quants costats té aquesta figura?"
  - Opcions: 4 valors únics entre 3 i 6.
- Altrament, es pregunta el nom de la figura:
  - Pregunta: "Com es diu aquesta figura?"
  - Noms en català: Cercle, Quadrat, Triangle, Rectangle, Estrella.
  - Opcions: 3 (nivell 1) o 4 (nivells 2-3) noms únics entre les formes disponibles, garantint que la correcta hi sigui.
- Visual: la figura es dibuixa amb CSS (o l'emoji ⭐ per l'estrella) en un color aleatori de la paleta.

**4.8. Quina hora és? 🕐 (`genClock`)**
- Es genera una hora aleatòria entre 1 i 12 (sempre "en punt", mai mitges hores — això és contingut de 2n de Primària).
- Es dibuixa un rellotge SVG (vegeu secció 3) amb l'agulla d'hores apuntant a `hour*30` graus i la de minuts a 0 graus.
- Pregunta: "Mira el rellotge. Quina hora marca?"
- Resposta correcta amb format: "Les {hora} en punt".
- Opcions: 3 hores incorrectes aleatòries + la correcta, barrejades, format "Les {h} en punt".

### 5. Sistema de dificultat adaptativa (molt important)

L'estat de joc manté aquests comptadors, que es reinicien a 0 cada vegada que es produeix una pujada o baixada de nivell:
- `streakCorrect`: respostes correctes seguides.
- `streakWrong`: respostes incorrectes seguides.
- `fastStreak`: respostes **correctes I ràpides** seguides (temps de resposta ≤ 4000 ms).
- `slowStreak`: respostes **incorrectes, O correctes però lentes** (temps de resposta ≥ 16000 ms) seguides.
- `bestLevel`: el nivell més alt assolit durant la sessió (només puja, mai baixa; es fa servir al dashboard).

El temps de resposta es mesura des del moment que es renderitza la pregunta (`Date.now()` en pintar la ronda) fins que l'usuari prem una opció.

**Regla de pujada de nivell** (nivell màxim = 3): puja si `streakCorrect >= 3` **O** `fastStreak >= 2`. És a dir, si respon molt ràpid (menys de 4 segons) i encerta dues vegades seguides, ja puja abans que amb el criteri clàssic de 3 encerts seguits. Quan puja, es reinicien `streakCorrect`, `fastStreak` i `slowStreak` a 0, i es mostra el missatge de feedback amb el sufix " Pugem de nivell! 🚀".

**Regla de baixada de nivell** (nivell mínim = 1): baixa si `streakWrong >= 2` **O** `slowStreak >= 2`. És a dir, dues respostes incorrectes seguides la fan baixar (com abans), però també dues respostes molt lentes seguides (≥16s), encara que siguin correctes — senyal que el nivell actual li costa massa i necessita repàs. Quan baixa, es reinicien `streakWrong`, `slowStreak` i `fastStreak` a 0.

Aquestes dues regles s'avaluen en aquest ordre (primer pujada, si no baixada) després de cada resposta, abans d'actualitzar la interfície.

Cada resposta es desa a un historial (`state.history`) amb: `level` (nivell just després d'aplicar la regla anterior), `correct` (booleà), `elapsedMs` (temps de resposta en mil·lisegons), `type` (identificador del minijoc). Aquest historial alimenta el dashboard (secció 6).

**Feedback en encertar**: missatge aleatori entre "Molt bé! 🎉", "Genial! 🌟", "Perfecte! 👏", "Ho has clavat! ✨"; la mascota fa `bounce`; es dispara el confeti; sumen +1 estrella.
**Feedback en fallar**: "Gairebé! La resposta correcta és {resposta}. Ho tornarem a provar! 💪"; la mascota fa `shake`; es marca en verd el botó amb la resposta correcta i en rosa el botó premut.

### 6. Dashboard d'estadístiques i evolució

Un botó rodó "📊" a la barra superior obre un panell que substitueix la targeta de joc (amaga `game-card`, mostra `dashboard-panel`) i mostra:

1. **Graella de 4 targetes d'estadístiques ràpides**:
   - "Preguntes": total de respostes registrades a l'historial.
   - "Encerts": percentatge d'encerts (`correctes/total * 100`, arrodonit).
   - "Temps mitjà": mitjana de `elapsedMs` de totes les respostes, en segons amb 1 decimal.
   - "Nivell més alt": `state.bestLevel`.
2. **Barres per tipus de joc**: per cada tipus (`suma`, `resta`, `incognita`, `dobles`, `compara`, `sequencia`, `geometria`, `rellotge`) que s'hagi jugat almenys una vegada, una fila amb: etiqueta en català (mapa `TYPE_LABELS`: Sumes, Restes, Troba el número, Dobles i meitats, Compara nombres, Seqüències, Geometria, Rellotge), una barra horitzontal amb l'amplada proporcional al percentatge d'encerts d'aquell tipus, i el text "{encerts}/{total}" al final. Si encara no hi ha historial, es mostra el missatge "Encara no has jugat cap ronda."
3. **Gràfic d'evolució del nivell**: un `<canvas>` (560x110px, escalat a `width:100%` per CSS) que dibuixa:
   - Línies horitzontals fines de referència pels nivells 1, 2 i 3.
   - Una línia poligonal blava (`#5b4bc4`) que uneix el nivell de cadascuna de les últimes 40 respostes (si n'hi ha menys, es mostren totes).
   - Un punt de color a cada resposta: verd (`#3e9c6c`) si va ser correcta, rosa (`#e05f83`) si va ser incorrecta.
   - Si no hi ha historial encara, es mostra el text "Juga alguna ronda per veure l'evolució" centrat al canvas.
4. Un botó "Tornar a jugar 👉" que tanca el dashboard i torna a mostrar la targeta de joc.

### 7. Lectura en veu alta (Text-to-Speech en català)

- Cada pregunta té un botó rodó "🔊" al costat del text de l'enunciat.
- En prémer'l, es llegeix en veu alta **el text exacte de la pregunta actual** fent servir la Web Speech API nativa del navegador (`SpeechSynthesisUtterance`), amb `lang = 'ca-ES'`.
- S'ha d'intentar seleccionar una veu del sistema que comenci per "ca" (català); si no n'hi ha cap disponible, es fa servir com a alternativa una veu que comenci per "es" (castellà, sol tenir millor suport i pronuncia raonablement bé el català); si tampoc n'hi ha, es fa servir la veu per defecte del navegador amb el `lang` indicat igualment.
- La llista de veus disponibles pot trigar a carregar-se de manera asíncrona: cal escoltar l'event `voiceschanged` de `speechSynthesis` per refer la selecció de veu quan estigui llesta.
- Velocitat de parla (`rate`): 0.9 (una mica més lenta que el ritme normal, per facilitar la comprensió). To (`pitch`): 1.05.
- Cada vegada que es prem el botó, es cancel·la qualsevol lectura en curs abans de començar la nova (`speechSynthesis.cancel()`), per evitar que se superposin veus.
- Si el navegador no suporta `speechSynthesis`, el botó no ha de trencar l'aplicació (comprovació `'speechSynthesis' in window` abans de qualsevol crida).
- **Important**: la lectura en veu alta és sempre manual (a petició, en prémer el botó), mai automàtica en canviar de pregunta — la nena ja llegeix bé pel seu compte i la veu només ha de servir de suport puntual per a enunciats més llargs o complexos.

### 8. Requisits tècnics i de qualitat

- Aplicació 100% client-side, sense necessitat de backend ni base de dades.
- Ha de funcionar offline un cop carregada (excepte la síntesi de veu, que depèn del navegador però no de xarxa).
- Idioma de la interfície: català en tots els textos, etiquetes i missatges.
- Disseny mobile-first / totalment responsive (es farà servir tant en mòbil com en ordinador o tauleta).
- Cap ús de `localStorage` ni cookies si es manté com a versió estàtica simple (l'historial i puntuacions viuen només en memòria durant la sessió) — però si vols implementar-ho com a aplicació real desplegada, **pots afegir persistència amb `localStorage` per recordar el progrés entre sessions**, ja que aquí no hi ha les restriccions d'un artefacte de xat: si ho fas, guarda com a mínim `stars`, `bestLevel` i l'`history` (o un resum), i afegeix un botó per "reiniciar progrés".
- Escriu tests (unitaris, com a mínim) que verifiquin, per a cadascun dels 8 generadors i per als 3 nivells: que no llencen excepcions, que `answer` mai és `undefined`/`null`/`NaN`, que `options` sempre conté la resposta correcta, que `options` no té duplicats i en té almenys 2. Aquests generadors són purs (no depenen del DOM) i es poden testejar aïlladament si separes la lògica de generació de preguntes de la lògica de renderització.
- Proposa i implementa una estructura de projecte neta (per exemple amb Vite + TypeScript/JavaScript modern, separant clarament: generadors de jocs, lògica d'estat/adaptació de dificultat, component de dashboard, component de text-to-speech, i capa de presentació/UI), mantenint tota la lògica i tots els textos descrits en aquest document exactament tal com estan especificats. Pots modernitzar l'arquitectura (components, mòduls, build, lint, tests) però NO has de canviar el contingut pedagògic, els rangs numèrics, els textos en català, els colors ni el comportament descrits amunt sense preguntar-m'ho primer.
- Un cop enllestida, indica'm com desplegar-la gratuïtament com a lloc estàtic (per exemple Vercel, Netlify, GitHub Pages o Cloudflare Pages) perquè hi pugui accedir des de qualsevol dispositiu.

### 9. Fora d'abast (explícitament, no ho afegeixis)

- Multiplicació, divisió o taules de multiplicar.
- Sumes/restes amb "portar-se" o "manllevar" en columnes de dos dígits.
- Rellotge amb "i mitja" o minuts exactes.
- Pentàgons, hexàgons o cossos geomètrics 3D.
- Comptes o registre d'usuari, xarxes socials, publicitat o qualsevol element no infantil.
- Qualsevol missatge negatiu, punitiu o que faci sentir malament la nena en fallar una resposta.

---

*Fi del prompt. Si Claude Code té dubtes sobre algun detall no especificat aquí, que triï sempre l'opció més senzilla, més visual i més adequada per a una nena de 6-7 anys, i que ho consulti abans de prendre decisions que afectin el contingut pedagògic.*
