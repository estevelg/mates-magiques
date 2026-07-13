# 🦊 El Món Màgic dels Números

Joc educatiu **de matemàtiques i de llengua catalana** per a nens i nenes
**d'Infantil 3 (P3) fins a 6è de Primària**: cada perfil tria el seu curs i, a
cada sessió, l'àrea (Números 🔢 o Lletres 📚). El joc adapta els reptes a
l'itinerari curricular corresponent (LOMLOE) — de comptar i les vocals fins a
percentatges i frases fetes — amb dificultat adaptativa per àrea dins de cada
curs, veu en català i estadístiques.
Inclou una **zona de pares** (enllaç al peu de la pantalla de perfils) amb el
seguiment de cada perfil — encerts per tipus de repte, evolució, última
partida — i un selector per canviar de curs al setembre.

## Jugar-hi ara

**🎮 https://estevelg.github.io/mates-magiques/** — des de qualsevol dispositiu
(mòbil, tauleta o ordinador). El progrés es guarda al navegador de cada dispositiu.

## Provar-ho en local

Obre `index.html` amb qualsevol navegador (doble clic). No cal instal·lar res.

Per a millor experiència (sobretot perquè la **veu** funcioni), millor amb un
servidor local:

```bash
python3 -m http.server 8000
# obre http://localhost:8000
```

## Estructura

```
mon-magic-numeros/
├── index.html                    ← el joc sencer (HTML+CSS+JS, sense dependències)
├── CLAUDE.md                     ← context per continuar amb Claude Code (llegeix-lo!)
├── README.md                     ← aquest fitxer
└── docs/
    └── prompt-original.md        ← especificació pedagògica completa i detallada
```

## Continuar amb Claude Code

Vegeu les instruccions pas a pas a `COM-CONTINUAR.md` (a la carpeta principal).
En resum: descomprimeix, entra a la carpeta, executa `claude`, i ja tindrà tot el
context perquè `CLAUDE.md` es carrega automàticament.

## Notes

- 100% client-side, funciona offline (excepte la veu, que depèn del navegador).
- Contingut ajustat al currículum de Catalunya, final de 1r de Primària.
- El progrés de cada perfil es desa a `localStorage` del navegador; es pot reiniciar
  amb el botó "🔄 Reiniciar el progrés" del dashboard.
