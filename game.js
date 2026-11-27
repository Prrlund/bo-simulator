// Bo simulator: gör saker Bo gillar, varje sak ger 1 poäng, 19 poäng vinner.
// Stress, ångest, oro och flunsa jagar Bo. Rör de vid honom förlorar han ett
// hjärta, och utan hjärtan är spelet slut. Magen och energin sjunker hela
// tiden, så Bo måste äta och vila. Spelet sparas i webbläsaren.

const MAL = 19;
const KOL = 14;
const RADER = 11;
const MAX_HJARTAN = 3;

// ── Kartan ─────────────────────────────────────────────────────
// f = golv i Bos lägenhet, m = matta, W = vägg, v = väg, g = gräs, t = träd
const KARTA = [
  "ffffffWggvgggg",
  "ffffffWggvgggg",
  "ffmmffWggvgggg",
  "ffmmffvvvvvvvv",
  "ffffffWggvgggg",
  "ffffffWggvgggg",
  "WWWWWWWggvgggg",
  "tggggtgggvgggt",
  "vvvvvvvvvvvvvv",
  "tggggggggvgggg",
  "ggtgggtggvgggt",
];

// ── Sakerna Bo kan göra ────────────────────────────────────────
// energi och matt ändras när saken är klar. botar = fiender som försvinner.
const SAKER = [
  { id: "tilde", namn: "Umgås med Tilde", plats: "Tildes", x: 8, y: 5, energi: +5, matt: -5, typ: "tid", hjarta: true, botar: ["angest"],
    steg: ["Bo knackar på…", "Tilde öppnar!", "Mys med Tilde"],
    klar: ["Bo och Tilde kollade på solnedgången", "Fika med Tilde. Hon tog sista bullen", "Tilde vann i Uno. Igen.", "Promenad hand i hand"] },
  { id: "gym", namn: "Träna på gymmet", plats: "Gymmet", x: 12, y: 1, energi: -16, matt: -14, typ: "lyft", botar: ["stress"],
    klar: ["Benpass klart. Trappor blir svåra i morgon", "Nytt personligt rekord!", "Bröst och armar. Speglarna tackar"] },
  { id: "pubg", namn: "Spela PUBG på konsolen", plats: "Konsolen", x: 2, y: 2, energi: -6, matt: -6, typ: "pubg", botar: ["oro"] },
  { id: "dator", namn: "Spela in Minecraft-video", plats: "Datorn", x: 4, y: 2, energi: -8, matt: -6, typ: "tid", botar: [],
    steg: ["Startar inspelningen", "Bygger ett slott", "CREEPER!", "Redigerar…", "Laddar upp"], klar: "Nytt Minecraft-avsnitt ute! Kommentarerna strömmar in" },
  { id: "rita", namn: "Rita och måla", plats: "Ritbordet", x: 0, y: 4, energi: -5, matt: -5, typ: "tid", botar: ["angest"],
    steg: ["Penslarna fram", "Skiss…", "Färg!"],
    klar: ["Bo målade en solnedgång över Purmo", "Ett porträtt av Tilde. Hon gillar det", "En katt med solglasögon", "Abstrakt. Mycket abstrakt."] },
  { id: "piano", namn: "Spela piano och sjunga", plats: "Pianot", x: 2, y: 4, energi: -5, matt: -5, typ: "noter", botar: ["stress"],
    tangenter: ["C", "D", "E", "F", "G"], klar: "Applåder från grannarna!",
    rader: ["♪ Idag fyller jag nitton år…", "♪ Tilde, du är mitt allt…", "♪ Mörkrostat kaffe i min kopp…", "♪ Inget kan stressa mig nu…", "♪ La la laaa, Bo är bäst…"] },
  { id: "gitarr", namn: "Spela gitarr och sjunga", plats: "Gitarren", x: 4, y: 4, energi: -5, matt: -5, typ: "noter", botar: ["stress"],
    tangenter: ["E", "A", "D", "G", "H"], klar: "Rockstjärna!",
    rader: ["♫ Tre ackord och sanningen…", "♫ Gymmet kallar, jag svarar…", "♫ Winner winner chicken dinner…", "♫ En creeper i natten…", "♫ Ja må jag leva…"] },
  { id: "kafe", namn: "Dricka mörkrostat kaffe", plats: "Kaféet", x: 12, y: 5, energi: +25, matt: +6, typ: "tid", botar: [],
    steg: ["Beställer…", "En mörkrostad, svart, och en bulle.", "Första klunken."], klar: "Mörkrostat och svart. Bo är pigg igen" },
  { id: "tv", namn: "Titta på serie eller film", plats: "Soffan", x: 0, y: 2, energi: +8, matt: -6, typ: "tid", botar: ["oro"],
    steg: ["Väljer något…", "Ett avsnitt till…", "…och ett till"],
    klar: ["Säsongsfinalen! Vilken cliffhanger", "En film om rymden. Bo grät lite", "Bara ett avsnitt till, sa han för tre avsnitt sen"] },
  { id: "park", namn: "Gå en sväng i parken", plats: "Parken", x: 2, y: 9, energi: +6, matt: -8, typ: "tid", botar: ["stress", "oro"],
    steg: ["Ut i friska luften…", "Löven prasslar", "En hund vill hälsa"], klar: "Skön promenad. Huvudet är lättare nu" },
  { id: "familj", namn: "Hälsa på familjen", plats: "Familjens hus", x: 11, y: 9, energi: +5, matt: +100, typ: "familj", hjarta: true, botar: ["oro"] },
  { id: "prisma", namn: "Jobba i kassan", plats: "Prisma", x: 8, y: 1, energi: -15, matt: -12, typ: "blippa", botar: [], stressar: true,
    klar: ["Pass klart! Lönen ramlar in snart", "En tant betalade med bara 5-centare. Bo överlevde", "Rekordsnabb i kassan i dag", "Någon frågade om Bo var chefen"] },
  { id: "kok", namn: "Laga mat och äta", plats: "Köket", x: 2, y: 0, energi: +5, matt: +100, typ: "tid", botar: ["flunsa"],
    steg: ["Kokar vatten…", "Pastan i", "Mumsar…"], klar: "Proppmätt!" },
  { id: "sang", namn: "Sova", plats: "Sängen", x: 0, y: 0, energi: +100, matt: -15, typ: "tid", hjarta: true, botar: ["flunsa", "stress"],
    steg: ["Lägger sig…", "Zzz…", "Zzzzzz…"], klar: "Utvilad! Energin är full igen" },
  { id: "dusch", namn: "Duscha", plats: "Duschen", x: 4, y: 0, energi: +12, matt: 0, typ: "tid", botar: ["flunsa"],
    steg: ["Varmt vatten…", "Bo sjunger i duschen", "Fräsch!"], klar: "Ren och fräsch" },
];

// ── Fienderna ──────────────────────────────────────────────────
const FIENDER = {
  stress: { namn: "Stress", slut: "Stressen tog över." },
  angest: { namn: "Ångest", slut: "Ångesten blev för stor." },
  oro: { namn: "Oro", slut: "Oron åt upp Bo inifrån." },
  flunsa: { namn: "Flunsa", slut: "Flunsan slog ut Bo." },
  hunger: { namn: "Hunger", slut: "Bo glömde äta. Det håller inte." },
};
const hjalperMot = (typ) => SAKER.filter((s) => s.botar.includes(typ)).map((s) => s.plats);

// Fiender som kommer in i spelet allt eftersom
const VAGOR = [
  { typ: "stress", fran: 0 },
  { typ: "oro", fran: 2 },
  { typ: "angest", fran: 5 },
  { typ: "stress", fran: 9 },
  { typ: "oro", fran: 14 },
];
const SPAWN = [[13, 0], [13, 10], [0, 10], [7, 10], [13, 6], [7, 0]];
const BORTA_MS = 22000;
const START = { x: 3, y: 3 };

// ── Läge ───────────────────────────────────────────────────────
const NYCKEL = "bo-simulator-2";
const nyttLage = (sett = false) => ({
  poang: 0, energi: 90, matt: 80, hjartan: MAX_HJARTAN, antal: {}, senast: null,
  x: START.x, y: START.y, vunnit: false, sett, tid: 0, svalt: 0, osarbar: 0,
  fiender: VAGOR.map((v, i) => ({ id: i, typ: v.typ, x: SPAWN[i][0], y: SPAWN[i][1], aktiv: false, tillbaka: 0 })).concat([
    { id: 99, typ: "flunsa", x: 0, y: 10, aktiv: false, tillbaka: 0 },
  ]),
});
let lage = nyttLage();
try {
  const sparat = JSON.parse(localStorage.getItem(NYCKEL) || "null");
  if (sparat && sparat.fiender) lage = sparat;
} catch {}
const spara = () => { try { localStorage.setItem(NYCKEL, JSON.stringify(lage)); } catch {} };

const $ = (id) => document.getElementById(id);
const slump = (lista) => lista[Math.floor(Math.random() * lista.length)];
const begr = (v) => Math.max(0, Math.min(100, v));
const ikon = (namn) => `<span class="ikon">${IKONER[namn] || ""}</span>`;
let upptagen = false; // en ruta är öppen: spelet står still
let omgang = 0; // räknas upp när rutan öppnas eller stängs

// ── Kartan ritas ───────────────────────────────────────────────
const rutor = [];
const sakPa = (x, y) => SAKER.find((s) => s.x === x && s.y === y);
const typPa = (x, y) => (KARTA[y] && KARTA[y][x]) || "W";
const kanGa = (x, y) => x >= 0 && y >= 0 && x < KOL && y < RADER && !"Wt".includes(typPa(x, y));

function ritaKarta() {
  const k = $("karta");
  for (let y = 0; y < RADER; y++) {
    for (let x = 0; x < KOL; x++) {
      const d = document.createElement("div");
      const t = typPa(x, y);
      d.className = "ruta-k " + { f: "golv", m: "golv matta", W: "vagg", v: "vag", g: "gras", t: "gras trad" }[t];
      if (t === "t") d.innerHTML = ikon("trad");
      const s = sakPa(x, y);
      if (s) {
        d.classList.add("plats");
        d.innerHTML = `<div class="kort">${ikon(s.id)}</div><span class="namn">${s.plats}</span>`;
        d.title = s.namn;
      }
      d.addEventListener("click", () => gaTill(x, y));
      k.appendChild(d);
      rutor.push(d);
    }
  }
  const lager = $("lager");
  const bo = document.createElement("div");
  bo.className = "figur bo";
  bo.id = "bo";
  bo.innerHTML = ikon("bo");
  lager.appendChild(bo);
  for (const f of lage.fiender) {
    const el = document.createElement("div");
    el.className = "figur fiende borta";
    el.id = "fiende" + f.id;
    el.innerHTML = ikon(f.typ);
    lager.appendChild(el);
  }
  $("logo").innerHTML = IKONER.tarta;
  placera($("bo"), lage.x, lage.y);
}

const placera = (el, x, y) => { el.style.left = (x / KOL) * 100 + "%"; el.style.top = (y / RADER) * 100 + "%"; };

function ritaFiender() {
  for (const f of lage.fiender) {
    const el = $("fiende" + f.id);
    placera(el, f.x, f.y);
    el.classList.toggle("borta", !f.aktiv);
  }
}

// ── Mätare, hjärtan, hot och lista ─────────────────────────────
let senasteHot = "";
function uppdatera() {
  $("poang").textContent = lage.poang;
  $("energi").style.width = lage.energi + "%";
  $("matt").style.width = lage.matt + "%";
  $("energi").classList.toggle("lag", lage.energi < 20);
  $("matt").classList.toggle("lag", lage.matt < 20);
  const h = $("hjartan");
  if (h.children.length !== MAX_HJARTAN) h.innerHTML = Array.from({ length: MAX_HJARTAN }, () => "<span></span>").join("");
  [...h.children].forEach((s, i) => {
    const hel = String(i < lage.hjartan);
    if (s.dataset.hel !== hel) {
      if (s.dataset.hel === "true") { s.classList.remove("forlorad"); void s.offsetWidth; s.classList.add("forlorad"); }
      s.innerHTML = i < lage.hjartan ? IKONER.hjarta : IKONER.hjartaTomt;
      s.dataset.hel = hel;
    }
  });
  // Hot just nu (ritas bara om när de ändras)
  const aktiva = [...new Set(lage.fiender.filter((f) => f.aktiv).map((f) => f.typ))];
  const hotNyckel = aktiva.join(",");
  if (hotNyckel !== senasteHot) {
    senasteHot = hotNyckel;
    $("hot").innerHTML = aktiva.length
      ? aktiva.map((t) => `<span class="hot-chip">${ikon(t)}${FIENDER[t].namn} jagar Bo <small>· hjälper: ${hjalperMot(t).join(", ")}</small></span>`).join("")
      : `<span class="hot-chip">${ikon("bo")}Lugnt just nu</span>`;
  }
  ritaFiender();
  spara();
}

function ritaLista() {
  const ul = $("lista");
  ul.innerHTML = "";
  for (const s of SAKER) {
    const n = lage.antal[s.id] || 0;
    const li = document.createElement("li");
    li.innerHTML = `${ikon(s.id)}<span>${s.namn}</span><span class="antal">${n ? "×" + n : ""}</span>`;
    li.addEventListener("click", () => gaTill(s.x, s.y));
    ul.appendChild(li);
    const kort = rutor[s.y * KOL + s.x];
    if (n && !kort.querySelector(".klar-bock")) {
      const bock = document.createElement("span");
      bock.className = "klar-bock";
      bock.textContent = "✓";
      kort.appendChild(bock);
    }
  }
}

let meddelandeTimer;
function meddela(text) {
  const m = $("meddelande");
  m.textContent = text;
  m.classList.add("syns");
  clearTimeout(meddelandeTimer);
  meddelandeTimer = setTimeout(() => m.classList.remove("syns"), 2200);
}

// ── Vägar ──────────────────────────────────────────────────────
// Kortaste vägen. Bo går runt andra platser, fienderna går överallt.
function vag(fran, mal, runtPlatser) {
  const start = `${fran.x},${fran.y}`;
  const kom = new Map([[start, null]]);
  const ko = [[fran.x, fran.y]];
  while (ko.length) {
    const [x, y] = ko.shift();
    if (x === mal.x && y === mal.y) break;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy, n = `${nx},${ny}`;
      if (kom.has(n) || !kanGa(nx, ny)) continue;
      if (runtPlatser && sakPa(nx, ny) && !(nx === mal.x && ny === mal.y)) continue;
      kom.set(n, `${x},${y}`);
      ko.push([nx, ny]);
    }
  }
  const slut = `${mal.x},${mal.y}`;
  if (!kom.has(slut)) return null;
  const steg = [];
  for (let n = slut; n && n !== start; n = kom.get(n)) steg.unshift(n.split(",").map(Number));
  return steg;
}

// ── Bo går ─────────────────────────────────────────────────────
let gangTimer = null;
function flyttaBo(x, y) {
  lage.x = x; lage.y = y;
  placera($("bo"), x, y);
  krock();
}

function gaTill(x, y) {
  if (upptagen || !kanGa(x, y)) return;
  clearInterval(gangTimer);
  if (x === lage.x && y === lage.y) return framme();
  const steg = vag(lage, { x, y }, true);
  if (!steg) return;
  gangTimer = setInterval(() => {
    if (upptagen) return clearInterval(gangTimer);
    const nasta = steg.shift();
    if (!nasta) return clearInterval(gangTimer);
    flyttaBo(nasta[0], nasta[1]);
    if (!steg.length) { clearInterval(gangTimer); framme(); }
  }, 150);
}

function framme() {
  const s = sakPa(lage.x, lage.y);
  if (s && !upptagen) gora(s);
}

let senasteSteg = 0;
document.addEventListener("keydown", (e) => {
  if (upptagen) return;
  const d = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0], W: [0, -1], S: [0, 1], A: [-1, 0], D: [1, 0] }[e.key];
  if (!d) return;
  e.preventDefault();
  if (performance.now() - senasteSteg < 120) return;
  senasteSteg = performance.now();
  clearInterval(gangTimer);
  const nx = lage.x + d[0], ny = lage.y + d[1];
  if (!kanGa(nx, ny)) return;
  flyttaBo(nx, ny);
  framme();
});

// ── Fienderna ──────────────────────────────────────────────────
function langstBort() {
  return SPAWN.map(([x, y]) => ({ x, y, d: Math.abs(x - lage.x) + Math.abs(y - lage.y) }))
    .sort((a, b) => b.d - a.d)[Math.floor(Math.random() * 2)];
}

function skicka(f, ms) {
  f.aktiv = false;
  f.tillbaka = lage.tid + ms;
  const p = langstBort();
  f.x = p.x; f.y = p.y;
}

function fiendeSteg(f) {
  if (Math.random() < 0.8) {
    const steg = vag(f, lage, false);
    if (steg && steg.length) { [f.x, f.y] = steg[0]; return; }
  }
  const mojliga = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => [f.x + dx, f.y + dy]).filter(([x, y]) => kanGa(x, y));
  if (mojliga.length) [f.x, f.y] = slump(mojliga);
}

function krock() {
  for (const f of lage.fiender) {
    if (f.aktiv && f.x === lage.x && f.y === lage.y) return skada(f.typ, f);
  }
}

function skada(orsak, fiende) {
  if (lage.tid < lage.osarbar || upptagen || lage.hjartan <= 0) return;
  lage.hjartan--;
  lage.osarbar = lage.tid + 2200;
  const bo = $("bo");
  bo.classList.remove("skadad"); void bo.offsetWidth; bo.classList.add("skadad");
  if (fiende) skicka(fiende, 7000);
  meddela(orsak === "hunger" ? "Bo är jättehungrig! −1 hjärta" : `${FIENDER[orsak].namn} hann ikapp Bo! −1 hjärta`);
  uppdatera();
  if (lage.hjartan <= 0) slut(orsak);
}

// ── Klockan ────────────────────────────────────────────────────
const TICK = 100;
let nastaFiendeSteg = 0;
setInterval(() => {
  if (upptagen || !lage.sett || lage.hjartan <= 0) return;
  lage.tid += TICK;

  // Magen och energin sjunker hela tiden, lite fortare ju längre Bo kommit
  const tempo = 1 + lage.poang / 30;
  lage.matt = begr(lage.matt - (TICK / 600) * tempo);
  lage.energi = begr(lage.energi - (TICK / 1900) * tempo);
  if (lage.matt <= 0) {
    lage.svalt += TICK;
    if (lage.svalt >= 5000) { lage.svalt = 0; skada("hunger"); if (upptagen) return; }
  } else lage.svalt = 0;

  // Fiender kommer in i spelet, och tillbaka efter att ha skickats bort
  lage.fiender.forEach((f) => {
    if (f.aktiv) return;
    if (f.typ === "flunsa") {
      if ((lage.energi < 18 || lage.matt < 12) && lage.tid >= f.tillbaka) {
        f.aktiv = true;
        const p = langstBort();
        f.x = p.x; f.y = p.y;
        meddela("Flunsan smög sig på! Sov, ät eller duscha");
      }
      return;
    }
    if (lage.poang >= VAGOR[f.id].fran && lage.tid >= f.tillbaka && lage.tid > 2500) {
      f.aktiv = true;
      meddela(`${FIENDER[f.typ].namn} är ute efter Bo!`);
    }
  });

  // Fienderna rör sig, snabbare ju fler poäng
  if (lage.tid >= nastaFiendeSteg) {
    nastaFiendeSteg = lage.tid + Math.max(300, 600 - lage.poang * 16);
    lage.fiender.filter((f) => f.aktiv).forEach(fiendeSteg);
    krock();
  }
  uppdatera();
}, TICK);

// ── Rutan ──────────────────────────────────────────────────────
function oppna({ ikonNamn, titel, text = "", html = "", knappar = [] }) {
  upptagen = true;
  omgang++;
  clearInterval(gangTimer);
  $("rutaIkon").innerHTML = IKONER[ikonNamn] || "";
  $("rutaTitel").textContent = titel;
  $("rutaText").textContent = text;
  $("rutaSpel").innerHTML = html;
  sattKnappar(knappar);
  $("ruta").hidden = false;
}
function sattKnappar(knappar) {
  const k = $("rutaKnappar");
  k.innerHTML = "";
  for (const { text, gul, stor, gor } of knappar) {
    const b = document.createElement("button");
    b.className = "knapp" + (gul ? " gul" : "") + (stor ? " stor" : "");
    b.textContent = text;
    b.addEventListener("click", gor);
    k.appendChild(b);
  }
  k.querySelector("button")?.focus();
}
function stang() {
  omgang++;
  $("ruta").hidden = true;
  // Ett kort andrum efter varje sak, så att ingen fiende står och väntar
  lage.osarbar = Math.max(lage.osarbar, lage.tid + 1200);
  upptagen = false;
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !$("ruta").hidden && lage.sett && lage.hjartan > 0) stang();
});

// ── Göra en sak ────────────────────────────────────────────────
function gora(s) {
  const nej = (ikonNamn, titel, text) => oppna({ ikonNamn, titel, text, knappar: [{ text: "Okej", gul: true, gor: stang }] });
  if (lage.senast === s.id) return nej(s.id, s.plats, "Bo gjorde precis det här. Gör något annat först!");
  if (lage.energi < 12 && s.energi < 0) return nej("sang", "Bo är för trött", "Sov en stund eller drick ett mörkrostat kaffe först.");
  if (lage.matt < 10 && s.matt < 0) return nej("kok", "Magen kurrar", "Bo måste äta först. Köket finns i lägenheten.");

  oppna({ ikonNamn: s.id, titel: s.namn });
  const denna = omgang;
  ({ blippa, lyft, tid, pubg, noter, familj })[s.typ](s, $("rutaSpel"), () => { if (omgang === denna) klar(s); });
  if (s.typ !== "familj") sattKnappar([{ text: "Avbryt", gor: stang }]);
}

function klar(s, text) {
  lage.poang++;
  lage.energi = begr(s.id === "sang" ? 100 : lage.energi + s.energi);
  lage.matt = begr(lage.matt + s.matt);
  lage.antal[s.id] = (lage.antal[s.id] || 0) + 1;
  lage.senast = s.id;
  const rader = [];
  if (s.hjarta && lage.hjartan < MAX_HJARTAN) { lage.hjartan++; rader.push("+1 hjärta"); }
  const botade = lage.fiender.filter((f) => f.aktiv && s.botar.includes(f.typ));
  botade.forEach((f) => skicka(f, f.typ === "flunsa" ? 30000 : BORTA_MS));
  [...new Set(botade.map((f) => f.typ))].forEach((t) => rader.push(`${FIENDER[t].namn} försvann!`));
  if (s.stressar) {
    const stress = lage.fiender.find((f) => f.typ === "stress" && !f.aktiv && VAGOR[f.id] && lage.poang >= VAGOR[f.id].fran);
    if (stress) { stress.tillbaka = lage.tid; rader.push("Jobbet ger poäng, men stressen hittar dig snabbare"); }
  }
  const p = $("poang").parentElement;
  p.classList.remove("plus"); void p.offsetWidth; p.classList.add("plus");
  uppdatera();
  ritaLista();
  $("rutaText").textContent = text || (Array.isArray(s.klar) ? slump(s.klar) : s.klar) || "Klart!";
  $("rutaSpel").innerHTML = `<p class="plus-rad">+1 poäng</p>${rader.map((r) => `<p class="botad">${r}</p>`).join("")}`;
  if (lage.poang >= MAL && !lage.vunnit) sattKnappar([{ text: "Vidare!", gul: true, stor: true, gor: vinst }]);
  else sattKnappar([{ text: "Fortsätt", gul: true, gor: stang }]);
}

function framsteg(spel) {
  const f = document.createElement("div");
  f.className = "framsteg";
  f.innerHTML = "<div></div>";
  spel.appendChild(f);
  return (andel) => (f.firstChild.style.width = Math.min(100, andel * 100) + "%");
}

function tryckSpel(spel, { behov, knapptext, repliker, saker }, fardig) {
  let n = 0;
  let rad;
  if (saker) { rad = document.createElement("div"); rad.className = "saker"; rad.textContent = slump(saker); spel.appendChild(rad); }
  const fyll = framsteg(spel);
  const b = document.createElement("button");
  b.className = "knapp gul stor";
  b.style.marginTop = "14px";
  b.textContent = knapptext;
  const denna = omgang;
  const tryck = () => {
    n++;
    fyll(n / behov);
    if (rad) rad.textContent = slump(saker);
    $("rutaText").textContent = slump(repliker);
    if (n >= behov) { document.removeEventListener("keydown", tangent); fardig(); }
  };
  const tangent = (e) => {
    if (omgang !== denna) return document.removeEventListener("keydown", tangent);
    if (e.code === "Space") { e.preventDefault(); tryck(); }
  };
  b.addEventListener("click", tryck);
  document.addEventListener("keydown", tangent);
  spel.appendChild(b);
}

// ── Minispelen ─────────────────────────────────────────────────
function blippa(s, spel, fardig) {
  $("rutaText").textContent = "Blippa varorna! Tryck på knappen eller mellanslag.";
  tryckSpel(spel, {
    behov: 8, knapptext: "Blippa!",
    saker: ["🥛", "🍞", "🧀", "🍌", "🥫", "🍫", "🥚", "🍕", "🥒", "🧃"],
    repliker: ["Hej hej!", "Har du S-kort?", "Vill du ha kvittot?", "Påse? 20 cent.", "Kassa 3 öppnar!", "Blipp!", "Ha en trevlig dag!"],
  }, fardig);
}

function lyft(s, spel, fardig) {
  $("rutaText").textContent = "Lyft skivstången! Tryck snabbt.";
  tryckSpel(spel, { behov: 12, knapptext: "Lyft!", repliker: ["Ett!", "Två!", "Kom igen!", "Ingen skippar legday!", "Pump!", "Sista!", "Oof."] }, fardig);
}

function tid(s, spel, fardig) {
  const fyll = framsteg(spel);
  const steg = s.steg || ["…"];
  const langd = 2400;
  const start = performance.now();
  const denna = omgang;
  $("rutaText").textContent = steg[0];
  const tick = (nu) => {
    if (omgang !== denna) return;
    const a = (nu - start) / langd;
    fyll(a);
    $("rutaText").textContent = steg[Math.min(steg.length - 1, Math.floor(a * steg.length))];
    if (a < 1) requestAnimationFrame(tick);
    else fardig();
  };
  requestAnimationFrame(tick);
}

function pubg(s, spel, fardig) {
  $("rutaText").textContent = "Var hoppar du?";
  const rad = document.createElement("div");
  rad.className = "ruta-knappar";
  for (const plats of ["Pochinki", "Militärbasen", "Skolan"]) {
    const b = document.createElement("button");
    b.className = "knapp";
    b.textContent = plats;
    b.addEventListener("click", () => {
      const r = Math.random();
      const resultat =
        r < 0.3 ? `WINNER WINNER CHICKEN DINNER! Bo vann från ${plats}!` :
        r < 0.7 ? `Top 10 från ${plats}. Inte illa!` :
        `Dog direkt i ${plats}. Någon hade en stekpanna.`;
      fardig();
      $("rutaText").textContent = resultat;
    });
    rad.appendChild(b);
  }
  spel.appendChild(rad);
}

function noter(s, spel, fardig) {
  const behov = 6;
  let n = 0;
  let ratt = -1;
  $("rutaText").textContent = "Tryck på tangenten som lyser. Bo sjunger samtidigt!";
  const fyll = framsteg(spel);
  const rad = document.createElement("div");
  rad.className = "tangenter";
  const sang = document.createElement("p");
  sang.className = "sang";
  const knappar = s.tangenter.map((namn, i) => {
    const b = document.createElement("button");
    b.className = "tangent";
    b.textContent = namn;
    b.addEventListener("click", () => {
      if (i !== ratt) { b.classList.remove("fel"); void b.offsetWidth; b.classList.add("fel"); return; }
      n++;
      fyll(n / behov);
      sang.textContent = s.rader[(n - 1) % s.rader.length];
      if (n >= behov) return fardig();
      lys();
    });
    rad.appendChild(b);
    return b;
  });
  const lys = () => {
    let nytt;
    do { nytt = Math.floor(Math.random() * knappar.length); } while (nytt === ratt);
    ratt = nytt;
    knappar.forEach((b, i) => b.classList.toggle("lyser", i === ratt));
  };
  spel.appendChild(rad);
  spel.appendChild(sang);
  lys();
}

// Familjen är bara hemma ibland
function familj(s, spel, fardig) {
  if (Math.random() > 0.45) {
    $("rutaTitel").textContent = "Ingen hemma";
    $("rutaText").textContent = "Familjen är ute just nu. Prova igen senare!";
    spel.innerHTML = `<p class="liten">Familjen är bara hemma ibland.</p>`;
    lage.senast = s.id; // Inte direkt igen
    sattKnappar([{ text: "Okej", gul: true, gor: stang }]);
    return;
  }
  s.steg = ["Ringer på…", "Mamma öppnar!", "Middag på bordet"];
  s.klar = ["Mamma bjöd på middag. Proppmätt och glad", "Familjen sjöng grattis!", "Pappa ville prata om bilen. Länge."];
  sattKnappar([{ text: "Avbryt", gor: stang }]);
  tid(s, spel, fardig);
}

// ── Slut och vinst ─────────────────────────────────────────────
function borjaOm() {
  lage = nyttLage(true);
  spara();
  location.reload();
}

function slut(orsak) {
  oppna({
    ikonNamn: orsak === "hunger" ? "kok" : orsak,
    titel: "Bo orkade inte mer",
    text: `${FIENDER[orsak].slut} Alla hjärtan är slut, så det blir att börja om. Du kom till ${lage.poang} poäng.`,
    knappar: [{ text: "Börja om", gul: true, stor: true, gor: borjaOm }],
  });
}

function vinst() {
  lage.vunnit = true;
  spara();
  konfetti();
  oppna({
    ikonNamn: "tarta",
    titel: "GRATTIS BO, 19 ÅR!",
    text: "Du klarade Bo simulator med 19 poäng och höll stressen, ångesten, oron och flunsan borta. Grattis på födelsedagen!",
    knappar: [
      { text: "Spela igen", gul: true, gor: borjaOm },
      { text: "Fortsätt spela", gor: stang },
    ],
  });
}

function konfetti() {
  const k = $("konfetti");
  const farger = ["#ffc53d", "#ff7aa2", "#6cb6ff", "#8be28b", "#b388ff"];
  for (let i = 0; i < 150; i++) {
    const c = document.createElement("i");
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = slump(farger);
    c.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
    c.style.animationDelay = Math.random() * 1.5 + "s";
    k.appendChild(c);
  }
  setTimeout(() => (k.innerHTML = ""), 7000);
}

// ── Start ──────────────────────────────────────────────────────
ritaKarta();
ritaLista();
uppdatera();
if (lage.hjartan <= 0) {
  slut("stress");
} else if (!lage.sett) {
  const rad = (namn, text) => `<div>${ikon(namn)}<span>${text}</span></div>`;
  oppna({
    ikonNamn: "tarta",
    titel: "Grattis på 19-årsdagen, Bo!",
    text: "Gör det Bo gillar: häng med Tilde, gymma, spela PUBG, spela in Minecraft, rita, spela musik och drick mörkrostat kaffe. Varje sak ger 1 poäng. Nå 19 poäng!",
    html: `<div class="regler">
      ${rad("kok", "Magen och energin sjunker hela tiden. Ät och vila ofta.")}
      ${rad("stress", "Stress, oro, ångest och flunsa jagar Bo. Blir han fångad förlorar han ett hjärta.")}
      ${rad("hjarta", "Tre hjärtan. När de är slut får du börja om.")}
      ${rad("park", "Vissa saker jagar bort fienderna. Se listan under kartan.")}
    </div>`,
    knappar: [{ text: "Kör!", gul: true, stor: true, gor: () => { lage.sett = true; spara(); stang(); } }],
  });
}
