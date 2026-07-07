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
