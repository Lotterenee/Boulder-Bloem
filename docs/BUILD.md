# Boulder Bloem website: bouw- en deployplan

Dit is het plan dat je (Claude Code) stap voor stap uitvoert. Lees eerst
`docs/SPEC.md`. De HTML in `public/` is de bron van waarheid: niet overtypen,
alleen serveren en (indien nodig) gericht corrigeren.

Context: dit is een harness-repo (Node + Express, Railway). De site is een
statische multipage-site. We vervangen de starter-`server.js` door een
statische server voor `public/`, laten `/healthz` intact, en deployen via de
gewone feature-flow.

Herhaalde regel: geen em-dash (U+2014) in welk bestand dan ook. Een PreToolUse
hook blokkeert het anders.

---

## Stap 0: uitgangssituatie controleren

Deze bestanden horen al in de repo te staan (door Lotte aangeleverd):
`public/index.html`, `public/aanpak.html`, `public/educatie.html`,
`public/groen.html`, `public/subsidies.html`, `docs/SPEC.md`, `docs/BUILD.md`.

Controleer:
```
ls public/ && ls docs/
git grep -l $'\u2014' || echo "geen em-dash gevonden, goed"
```
Staat `public/` er niet? Stop en vraag Lotte de bestanden te committen (zie
"Als de HTML nog niet in de repo staat" onderaan). Author de HTML niet zelf.

## Stap 1: server.js vervangen

Vervang de volledige inhoud van `server.js` door precies dit:

```js
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

// Health check voor Railway en de harness
app.get('/healthz', (_req, res) => res.json({ ok: true }));

// Statische site. extensions:['html'] geeft schone URLs (/aanpak -> aanpak.html)
app.use(express.static(publicDir, {
  extensions: ['html'],
  maxAge: '1h',
}));

// Onbekende paden: toon de homepage met status 404
app.use((_req, res) => {
  res.status(404).sendFile(path.join(publicDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Boulder Bloem site luistert op :${port}`);
});
```

## Stap 2: package.json bijwerken

Vervang de inhoud door:

```json
{
  "name": "boulder-bloem-website",
  "private": true,
  "version": "0.1.0",
  "description": "Boulder Bloem: natuurlijke, ecologische speelplekken. Statische marketingsite.",
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": ">=20"
  },
  "dependencies": {
    "express": "^4.21.0"
  }
}
```

## Stap 3: railway.json laten meekijken naar public/

De starter-`watchPatterns` bevat `public/**` niet, dus wijzigingen aan de
HTML triggeren anders geen nieuwe deploy. Voeg `"public/**"` toe aan
`build.watchPatterns` in `railway.json`. Laat de rest ongemoeid. Resultaat:

```json
"watchPatterns": ["public/**", "src/**", "package.json", "package-lock.json", "server.js", "*.ts", "*.js"]
```

## Stap 4: lokaal verifiEren

```
npm install
npm start &
sleep 1
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
curl -s http://localhost:3000/healthz
for p in aanpak educatie groen subsidies; do
  curl -s -o /dev/null -w "$p %{http_code}\n" "http://localhost:3000/$p"
done
kill %1
```
Verwacht: `/` en `/healthz` en alle vier subpagina's geven 200,
`/healthz` geeft `{"ok":true}`.

## Stap 5: acceptatie aflopen

Loop de checklist in `docs/SPEC.md` paragraaf 7 langs. Fix alleen echte
afwijkingen, en bij voorkeur in `server.js`/config, niet in de HTML-inhoud.

## Stap 6: deployen via de harness

1. Geef de feature een naam voordat je pusht:
   ```
   bash .claude/scripts/set-feature-name.sh boulder-bloem-website
   ```
2. Commit en push je werk naar de `claude/`-branch. De GitHub Action maakt
   `feature/boulder-bloem-website` en een Railway preview-omgeving aan.
3. Haal de preview-URL op en zet die in je samenvatting:
   ```
   bash .claude/scripts/get-railway-url.sh
   ```
4. Test de preview-URL tegen de acceptatiecriteria.
5. Merge naar dev met `/mergedev`. Naar productie later met `/release`.

## Als de HTML nog niet in de repo staat

Author de HTML niet zelf (custom SVG + veel inline CSS, en de em-dash hook
maakt het bovendien foutgevoelig). Laat Lotte in plaats daarvan de map
`public/` committen (drag-and-drop in GitHub, of lokaal `git add public/ &&
git commit`). Kopieer daarna is prima: `cp` en `git mv` bevatten geen
em-dash in het commando en worden niet geblokkeerd, het serveren zelf raakt
de bestandsinhoud niet.

## Buiten scope (tenzij expliciet gevraagd)

Geen database, geen bucket, geen server-side formulierverwerking, geen
framework of bundler, geen CMS. De kracht van deze site is dat hij statisch
en simpel is.
