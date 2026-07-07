# Boulder Bloem website: specificatie (bron van waarheid)

Dit document beschrijft precies wat de website is. De 5 HTML-bestanden in
`public/` zijn de visuele bron van waarheid; dit document is de checklist
waarmee je (Claude Code) de bouw en de eindcontrole doet.

Belangrijk: bewerk de HTML in `public/` niet opnieuw vanaf nul. Het is
zorgvuldig met de hand ontworpen (custom SVG-illustraties, inline CSS). Je
taak is het integreren en serveren, niet het overtypen. Alleen als er een
concrete fout in staat (bijvoorbeeld een kapotte link) pas je die gericht aan.

Schrijfregel voor deze repo: gebruik nergens een em-dash (U+2014). Een hook
blokkeert elke schrijf-actie die er een bevat. In de HTML zijn ze al vervangen
door en-dashes (U+2013); houd dat zo.

---

## 1. Wat het is

Een statische, meertalige-vrije (Nederlandstalige) marketingsite van vijf
pagina's voor Boulder Bloem: ontwerp en aanleg van natuurlijke, ecologische
speelplekken. Toon: verhaal- en visie-gedreven, tegelijk speels/avontuurlijk
en geaard/professioneel.

Geen database, geen object storage, geen login, geen build-stap. Puur HTML,
inline CSS en inline JavaScript, statisch geserveerd. De enige externe
afhankelijkheid is Google Fonts.

## 2. Merk en ontwerpsysteem

### Typografie

- Display/koppen: **Fraunces** (serif), gewichten 400, 560, 640, plus italic.
- Body: **Nunito Sans** (sans-serif), gewichten 400, 600, 700, plus italic.
- Exacte Google Fonts-link (staat al in elke `<head>`, niet wijzigen):
  `https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,560;0,9..144,640;1,9..144,420;1,9..144,560&family=Nunito+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap`

Typeschaal:
- Body: `1.0625rem`, Nunito Sans.
- `h1,h2,h3`: Fraunces, `line-height:1.12`, `letter-spacing:-0.01em`.
- `h1`: `clamp(2.6rem,6vw,4.3rem)`, gewicht 640.
- `h2`: `clamp(1.9rem,3.6vw,2.7rem)`.
- `h3`: `1.25rem`, gewicht 600.

### Kleuren (CSS custom properties in `:root`)

```
--cream:#FAF6EF;   --cream-deep:#F2EBDD;
--sage:#CBD6C2;    --sage-light:#DCE3D2;
--moss:#7E8C6A;    --moss-mid:#B7C4A9;  --moss-deep:#49523E;  --moss-night:#3C4433;
--paper:#F3EBDD;   --foliage:#57704A;
--terracotta:#BE7350;
--wood-dk:#5F4A2C; --wood:#9A7B5A;
--clay:#C98E70;    --clay-deep:#B0714F; --clay-soft:#F1E0D2;
--sand:#E7D8C5;
--ink:#3A352F;     --ink-soft:#6B6258;
--maxw:1120px;     --radius:22px;
```

Palet in woorden: aardse naturals (cream, sage/moss groen, terracotta/klei,
houtbruin, zand) met zachte pastelaccenten. Maximale contentbreedte 1120px,
afgeronde hoeken 22px.

### Terugkerende visuele elementen

- Logo: twee-toppen alpensilhouet met een edelweiss-bloem.
- Organische, gebogen sectie-scheidingen (SVG golven/blob-randen).
- Scroll-reveal animaties (elementen faden/schuiven in beeld).
- Custom SVG-illustraties, waaronder een hero-landschap (kei/boulder,
  wilgentunnel, klimmende kinderen, bloemen, lieveheersbeestje) en
  decoratieve SVG-defs die per id worden hergebruikt (onder meer `#bee`,
  `#ladybug`, `#flowerTuft`, `#stumpTop`, en patronen/filters `#grain`,
  `#clump`).

## 3. Gedeelde structuur (op elke pagina)

- **Navigatie** bovenaan met het logo en links naar de vijf pagina's plus
  ankers. Onderlinge links zijn relatief (`index.html`, `aanpak.html`,
  `educatie.html`, `groen.html`, `subsidies.html`) en werken al.
- **Mobiel menu**: knop met class `.menu-btn` bedient `#menu` (aria-expanded
  wordt bijgewerkt; klikken op een link sluit het menu).
- **Footer** onderaan.

## 4. Pagina's en secties

Elke pagina is een zelfstandig `.html`-bestand met eigen inline CSS en de
gedeelde JS (zie paragraaf 6).

**index.html** (`<title>`: "Boulder Bloem – Natuurlijke speelplekken")
Secties/ankers: `#visie`, `#over`, `#aanbod`, `#voorbeelden`, `#werkwijze`,
`#faq`, `#contact`.
- Hero met het custom SVG-landschap en de kernbelofte.
- `#aanbod`: vijf dienst-kaarten ("Elke plek kan een speelplek worden").
- `#werkwijze`: stapstenen-procespad ("Stap voor stap naar buiten").
- `#faq`: de drie grootste vragen.
- `#contact`: contactformulier (zie paragraaf 5).

**aanpak.html** (`<title>`: "Aanpak & ontwerp – Boulder Bloem")
Secties: `#proces`, `#participatie`, `#zones`, `#materialen`, `#veiligheid`,
`#kosten`. Bevat onder meer het zevenstappen-procesoverzicht en een kostentabel.

**educatie.html** (`<title>`: "Natuureducatie – Boulder Bloem")
Secties: `#waarom`, `#risicovol`, `#vormen`, `#pakketten`.

**groen.html** (`<title>`: "Groen & biodiversiteit – Boulder Bloem")
Secties: `#inheems`, `#beplanting`, `#veilig-groen`, `#elementen`, `#klimaat`,
`#meetbaar`, `#beheer`.

**subsidies.html** (`<title>`: "Subsidies – Boulder Bloem")
Secties: `#ontzorging`, `#regelingen`, `#spelregels`, `#voorwaarden`, `#scan`.

## 5. Contactformulier (op index.html, `#contact`)

- `<form id="contactform" novalidate>` met velden: `#naam`, `#email`,
  `#plek` (select), `#bericht`.
- Bij submit: voorkomt default, valideert naam/email/bericht (rode outline
  `#C98E70` bij ontbrekend veld), en opent een vooringevuld bericht via
  `mailto:hallo@boulderbloem.nl` met onderwerp "Kennismaking – " plus de
  gekozen plek. Daarna wordt bevestiging `#verzonden` getoond.
- Er is geen server-side verwerking. Puur mailto. Niet vervangen door een
  backend tenzij expliciet gevraagd.

## 6. Gedrag (JavaScript, identiek op elke pagina)

Twee inline scriptblokken, ongewijzigd overnemen:
1. `document.documentElement.classList.add("js")` (progressive enhancement).
2. Eén IIFE-blok met:
   - Scroll-reveal via `IntersectionObserver` op `.reveal` en `.bb-reveal`,
     met respect voor `prefers-reduced-motion` (dan meteen zichtbaar).
   - Mobiel-menu toggle.
   - Contactformulier-handler (alleen op index).

## 7. Acceptatiecriteria (definition of done)

- [ ] Alle vijf pagina's laden en geven HTTP 200 (`/`, `/aanpak`,
      `/educatie`, `/groen`, `/subsidies`, en met `.html` erachter).
- [ ] `/healthz` geeft `{ "ok": true }`.
- [ ] Navigatie tussen de vijf pagina's werkt; alle ankerlinks (bijvoorbeeld
      `aanpak.html#kosten`) resolven.
- [ ] Fraunces en Nunito Sans laden zichtbaar (geen system-font fallback).
- [ ] Het contactformulier opent een vooringevulde mailto naar
      hallo@boulderbloem.nl.
- [ ] Scroll-reveal werkt en respecteert reduced motion; mobiel menu opent
      en sluit.
- [ ] De site is mobiel responsive (test op smalle viewport).
- [ ] Nergens in de repo staat een em-dash (U+2014).
- [ ] `git grep` toont geen verwijzingen meer naar de starter
      ("harness-railway-starter", "It works").
