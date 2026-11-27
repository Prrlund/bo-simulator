// Bo simulator: gör saker Bo gillar, varje sak ger 1 poäng, 19 poäng vinner.
// Allt i en fil, utan bibliotek. Spelet sparas i webbläsaren.

const MAL = 19;
const KOL = 14;
const RADER = 11;

// ── Kartan ─────────────────────────────────────────────────────
// f = golv i Bos lägenhet, W = vägg, v = väg, g = gräs, t = träd
const KARTA = [
  "ffffffWggvgggg",
  "ffffffWggvgggg",
  "ffffffWggvgggg",
  "ffffffvvvvvvvv",
  "ffffffWggvgggg",
  "ffffffWggvgggg",
  "WWWWWWWggvgggg",
  "tggggtgggvgggt",
  "vvvvvvvvvvvvvv",
  "tggggggggvgggg",
  "ggtgggtggvgggt",
];

// ── Sakerna Bo kan göra ────────────────────────────────────────
// x, y = var på kartan. energi och matt ändras när saken är klar.
const SAKER = [
  { id: "prisma", namn: "Jobba i kassan", plats: "Prisma", emoji: "🛒", x: 8, y: 1, energi: -15, matt: -10, typ: "blippa",
    klar: ["Pass klart! Lönen ramlar in snart 💸", "En tant betalade med bara 5-centare. Bo överlevde 🪙", "Rekordsnabb i kassan i dag 📟⚡", "Någon frågade om Bo var chefen. Snart kanske 😎"] },
  { id: "gym", namn: "Träna på gymmet", plats: "Gymmet", emoji: "🏋️", x: 12, y: 1, energi: -18, matt: -12, typ: "lyft" },
  { id: "kafe", namn: "Dricka mörkrostat kaffe", plats: "Kaféet", emoji: "☕", x: 12, y: 5, energi: +25, matt: -3, typ: "tid",
    steg: ["Beställer…", "En mörkrostad, svart, tack.", "Första klunken. Livet är bra."], klar: "Mörkrostat och svart. Bo är redo för allt ⚡" },
  { id: "tilde", namn: "Umgås med Tilde", plats: "Tildes", emoji: "💕", x: 8, y: 5, energi: +5, matt: -5, typ: "tid",
    steg: ["Bo knackar på…", "Tilde öppnar 😊", "Mys 💕"],
    klar: ["Bo och Tilde kollade på solnedgången 🌅", "Fika med Tilde. Hon tog sista bullen 🥐", "Tilde vann i Uno. Igen. 🃏", "Promenad hand i hand 💕"] },
  { id: "familj", namn: "Hälsa på familjen", plats: "Familjens hus", emoji: "🏡", x: 11, y: 9, energi: +5, matt: +100, typ: "familj" },
  { id: "park", namn: "Gå en sväng i parken", plats: "Parken", emoji: "🌳", x: 2, y: 9, energi: +8, matt: -6, typ: "tid",
    steg: ["Ut i friska luften…", "Löven prasslar 🍂", "En hund vill hälsa 🐕"], klar: "Skön promenad. Huvudet är lite tommare nu 🌳" },
  { id: "sang", namn: "Sova", plats: "Sängen", emoji: "🛏️", x: 0, y: 0, energi: +100, matt: -15, typ: "tid",
    steg: ["Lägger sig…", "Zzz…", "Zzzzzz… 💤"], klar: "Utvilad! Energin är full igen ⚡", sover: true },
  { id: "kok", namn: "Laga mat och äta", plats: "Köket", emoji: "🍳", x: 2, y: 0, energi: +5, matt: +100, typ: "tid",
    steg: ["Kokar vatten…", "Pastan i 🍝", "Mumsar…"], klar: "Proppmätt! 🍝", ater: true },
  { id: "dusch", namn: "Duscha", plats: "Duschen", emoji: "🚿", x: 4, y: 0, energi: +10, matt: 0, typ: "tid",
    steg: ["Varmt vatten…", "Bo sjunger i duschen 🎤", "Fräsch!"], klar: "Ren och fräsch ✨" },
  { id: "tv", namn: "Titta på serie eller film", plats: "Soffan", emoji: "📺", x: 0, y: 2, energi: +5, matt: -5, typ: "tid",
    steg: ["Väljer något…", "Ett avsnitt till…", "…och ett till 🍿"], klar: ["Säsongsfinalen! Vilken cliffhanger 😱", "En film om rymden. Bo grät lite 🚀", "Bara ett avsnitt till, sa han för tre avsnitt sen 📺"] },
  { id: "pubg", namn: "Spela PUBG på konsolen", plats: "Konsolen", emoji: "🎮", x: 2, y: 2, energi: -8, matt: -5, typ: "pubg" },
  { id: "dator", namn: "Spela in Minecraft-video", plats: "Datorn", emoji: "💻", x: 4, y: 2, energi: -10, matt: -6, typ: "tid",
    steg: ["Startar inspelningen 🔴", "Bygger ett slott 🏰", "CREEPER! 💥", "Redigerar…", "Laddar upp ⬆️"], klar: "Nytt Minecraft-avsnitt ute! Kommentarerna strömmar in ⛏️" },
  { id: "rita", namn: "Rita och måla", plats: "Ritbordet", emoji: "🎨", x: 0, y: 4, energi: -6, matt: -4, typ: "tid",
    steg: ["Penslarna fram 🖌️", "Skiss…", "Färg!"], klar: ["Bo målade en solnedgång över Purmo 🌅", "Ett porträtt av Tilde. Hon gillar det 💕", "En katt med solglasögon 😎🐱", "Abstrakt. Mycket abstrakt."] },
  { id: "piano", namn: "Spela piano och sjunga", plats: "Pianot", emoji: "🎹", x: 2, y: 4, energi: -6, matt: -4, typ: "noter",
    tangenter: ["C", "D", "E", "F", "G"],
    rader: ["🎵 Idag fyller jag nitton år…", "🎵 Kassan piper, jag sjunger med…", "🎵 Mörkrostat kaffe i min kopp…", "🎵 Tilde, du är mitt allt…", "🎵 La la laaa, Bo är bäst…"] },
  { id: "gitarr", namn: "Spela gitarr och sjunga", plats: "Gitarren", emoji: "🎸", x: 4, y: 4, energi: -6, matt: -4, typ: "noter",
    tangenter: ["E", "A", "D", "G", "H"],
    rader: ["🎶 Tre ackord och sanningen…", "🎶 Gymmet kallar, jag svarar…", "🎶 Winner winner chicken dinner…", "🎶 En creeper i natten…", "🎶 Ja må han leva, det är jag…"] },
];

const START = { x: 3, y: 3 };

// ── Läge ───────────────────────────────────────────────────────
const NYCKEL = "bo-simulator";
const nyttLage = () => ({ poang: 0, energi: 80, matt: 70, antal: {}, senast: null, x: START.x, y: START.y, vunnit: false, sett: false });
let lage = nyttLage();
try { lage = { ...lage, ...JSON.parse(localStorage.getItem(NYCKEL) || "{}") }; } catch {}
const spara = () => { try { localStorage.setItem(NYCKEL, JSON.stringify(lage)); } catch {} };

const $ = (id) => document.getElementById(id);
const slump = (lista) => lista[Math.floor(Math.random() * lista.length)];
const begr = (v) => Math.max(0, Math.min(100, v));
let upptagen = false;
// Räknas upp varje gång rutan öppnas eller stängs, så att ett avbrutet
// minispel aldrig blir klart i bakgrunden
let omgang = 0;

// ── Rita kartan ────────────────────────────────────────────────
const rutor = [];
const sakPa = (x, y) => SAKER.find((s) => s.x === x && s.y === y);
const typPa = (x, y) => (KARTA[y] && KARTA[y][x]) || "W";
const kanGa = (x, y) => x >= 0 && y >= 0 && x < KOL && y < RADER && !"Wt".includes(typPa(x, y));

function ritaKarta() {
  const k = $("karta");
  k.style.setProperty("--kol", KOL);
  for (let y = 0; y < RADER; y++) {
    for (let x = 0; x < KOL; x++) {
      const d = document.createElement("div");
      const t = typPa(x, y);
      d.className = "ruta-k " + { f: "golv", W: "vagg", v: "vag", g: "gras", t: "trad" }[t];
      if (t === "t") d.textContent = "🌲";
      const s = sakPa(x, y);
      if (s) {
        d.classList.add("plats");
        d.innerHTML = `${s.emoji}<span class="namn">${s.plats}</span>`;
        d.title = s.namn;
      }
      d.addEventListener("click", () => gaTill(x, y));
      k.appendChild(d);
      rutor.push(d);
    }
  }
  const bo = document.createElement("div");
  bo.className = "bo";
  bo.id = "bo";
  bo.textContent = "🧑";
  rutor[lage.y * KOL + lage.x].appendChild(bo);
}

function flyttaBo(x, y) {
  lage.x = x; lage.y = y;
  const bo = $("bo");
  rutor[y * KOL + x].appendChild(bo);
  bo.classList.remove("bo-hopp"); void bo.offsetWidth; bo.classList.add("bo-hopp");
}

// ── Mätare och lista ───────────────────────────────────────────
function uppdatera() {
  $("poang").textContent = lage.poang;
  $("energi").style.width = lage.energi + "%";
  $("matt").style.width = lage.matt + "%";
  const ul = $("lista");
  ul.innerHTML = "";
  for (const s of SAKER) {
    const n = lage.antal[s.id] || 0;
    const li = document.createElement("li");
    li.className = n ? "gjord" : "";
    li.innerHTML = `<span>${s.emoji}</span><span>${s.namn}</span><span class="antal">${n ? "×" + n : ""}</span>`;
    li.addEventListener("click", () => gaTill(s.x, s.y));
    ul.appendChild(li);
    rutor[s.y * KOL + s.x].classList.toggle("klar", n > 0);
  }
  spara();
}

// ── Gå ─────────────────────────────────────────────────────────
// Kortaste vägen dit man tryckt. Andra platser går man runt, inte igenom.
function vag(mal) {
  const start = `${lage.x},${lage.y}`;
  const fran = new Map([[start, null]]);
  const ko = [[lage.x, lage.y]];
  while (ko.length) {
    const [x, y] = ko.shift();
    if (x === mal.x && y === mal.y) break;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy, n = `${nx},${ny}`;
      if (fran.has(n) || !kanGa(nx, ny)) continue;
      if (sakPa(nx, ny) && !(nx === mal.x && ny === mal.y)) continue;
      fran.set(n, `${x},${y}`);
      ko.push([nx, ny]);
    }
  }
  const slut = `${mal.x},${mal.y}`;
  if (!fran.has(slut)) return null;
  const steg = [];
  for (let n = slut; n && n !== start; n = fran.get(n)) steg.unshift(n.split(",").map(Number));
  return steg;
}

let gangTimer = null;
function gaTill(x, y) {
  if (upptagen || !kanGa(x, y)) return;
  clearInterval(gangTimer);
  if (x === lage.x && y === lage.y) return framme();
  const steg = vag({ x, y });
  if (!steg) return;
  gangTimer = setInterval(() => {
    const nasta = steg.shift();
    if (!nasta) return clearInterval(gangTimer);
    flyttaBo(nasta[0], nasta[1]);
    if (!steg.length) { clearInterval(gangTimer); spara(); framme(); }
  }, 95);
}

function framme() {
  const s = sakPa(lage.x, lage.y);
  if (s) gora(s);
}

document.addEventListener("keydown", (e) => {
  if (upptagen) return;
  const d = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] }[e.key];
  if (!d) return;
  e.preventDefault();
  clearInterval(gangTimer);
  const nx = lage.x + d[0], ny = lage.y + d[1];
  if (!kanGa(nx, ny)) return;
  flyttaBo(nx, ny);
  spara();
  framme();
});

// ── Rutan ──────────────────────────────────────────────────────
function oppna({ emoji, titel, text = "", knappar = [] }) {
  upptagen = true;
  omgang++;
  $("rutaEmoji").textContent = emoji;
  $("rutaTitel").textContent = titel;
  $("rutaText").textContent = text;
  $("rutaSpel").innerHTML = "";
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
  upptagen = false;
}
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("ruta").hidden) stang(); });

// ── Göra en sak ────────────────────────────────────────────────
function gora(s) {
  // Inte samma sak två gånger i rad
  if (lage.senast === s.id) {
    return oppna({ emoji: "🤔", titel: s.plats, text: "Bo gjorde precis det här. Gör något annat först!", knappar: [{ text: "Okej", gul: true, gor: stang }] });
  }
  if (lage.energi < 12 && s.energi < 0) {
    return oppna({ emoji: "😴", titel: "Bo är för trött", text: "Sov en stund eller drick ett mörkrostat kaffe först.", knappar: [{ text: "Okej", gul: true, gor: stang }] });
  }
  if (lage.matt < 10 && s.matt < 0) {
    return oppna({ emoji: "😩", titel: "Magen kurrar", text: "Bo måste äta något först. Köket finns i lägenheten.", knappar: [{ text: "Okej", gul: true, gor: stang }] });
  }
  oppna({ emoji: s.emoji, titel: s.namn, text: "" });
  const spel = $("rutaSpel");
  const denna = omgang;
  ({ blippa, lyft, tid, pubg, noter, familj })[s.typ](s, spel, () => { if (omgang === denna) klar(s); });
  sattKnappar([{ text: "Avbryt", gor: stang }]);
}

function klar(s, text) {
  lage.poang++;
  lage.energi = begr(s.sover ? 100 : lage.energi + s.energi);
  lage.matt = begr(s.ater || s.id === "familj" ? 100 : lage.matt + s.matt);
  lage.antal[s.id] = (lage.antal[s.id] || 0) + 1;
  lage.senast = s.id;
  uppdatera();
  const slutText = text || (Array.isArray(s.klar) ? slump(s.klar) : s.klar) || "Klart!";
  $("rutaText").textContent = slutText;
  $("rutaSpel").innerHTML = `<p style="font-size:1.4rem;font-weight:900;color:#2e9e45">+1 poäng!</p>`;
  if (lage.poang >= MAL && !lage.vunnit) {
    sattKnappar([{ text: "🎂 Vidare!", gul: true, stor: true, gor: vinst }]);
  } else {
    sattKnappar([{ text: "Fortsätt", gul: true, gor: stang }]);
  }
}

// Ett framstegsfält i rutan
function framsteg(spel) {
  const f = document.createElement("div");
  f.className = "framsteg";
  f.innerHTML = "<div></div>";
  spel.appendChild(f);
  return (andel) => (f.firstChild.style.width = Math.min(100, andel * 100) + "%");
}

// ── Minispelen ─────────────────────────────────────────────────
function blippa(s, spel, fardig) {
  const varor = ["🥛", "🍞", "🧀", "🍌", "🥫", "🍫", "🥚", "🍕", "🥒", "🧃"];
  const repliker = ["Hej hej!", "Har du S-kort?", "Vill du ha kvittot?", "Påse? 20 cent.", "Kassa 3 öppnar!", "Blipp!", "Ha en trevlig dag!"];
  const behov = 8;
  let n = 0;
  $("rutaText").textContent = "Blippa varorna! Tryck på knappen eller mellanslag.";
  const rad = document.createElement("div");
  rad.className = "saker";
  rad.textContent = slump(varor);
  spel.appendChild(rad);
  const fyll = framsteg(spel);
  const b = document.createElement("button");
  b.className = "knapp gul stor";
  b.style.marginTop = "12px";
  b.textContent = "📟 Blippa!";
  const tryck = () => {
    n++;
    fyll(n / behov);
    rad.textContent = slump(varor);
    $("rutaText").textContent = slump(repliker);
    if (n >= behov) { document.removeEventListener("keydown", tangent); fardig(); }
  };
  const denna = omgang;
  const tangent = (e) => {
    if (omgang !== denna) return document.removeEventListener("keydown", tangent);
    if (e.code === "Space") { e.preventDefault(); tryck(); }
  };
  b.addEventListener("click", tryck);
  document.addEventListener("keydown", tangent);
  spel.appendChild(b);
}

function lyft(s, spel, fardig) {
  const behov = 12;
  let n = 0;
  const repliker = ["Ett!", "Två!", "Kom igen!", "Ingen skippar legday!", "Pump! 💪", "Sista!", "Oof."];
  $("rutaText").textContent = "Lyft skivstången! Tryck snabbt.";
  const fyll = framsteg(spel);
  const b = document.createElement("button");
  b.className = "knapp gul stor";
  b.style.marginTop = "12px";
  b.textContent = "💪 Lyft!";
  const tryck = () => {
    n++;
    fyll(n / behov);
    $("rutaText").textContent = slump(repliker);
    if (n >= behov) { document.removeEventListener("keydown", tangent); fardig(); }
  };
  const denna = omgang;
  const tangent = (e) => {
    if (omgang !== denna) return document.removeEventListener("keydown", tangent);
    if (e.code === "Space") { e.preventDefault(); tryck(); }
  };
  b.addEventListener("click", tryck);
  document.addEventListener("keydown", tangent);
  spel.appendChild(b);
  s.klar = ["Benpass klart. Trappor blir svåra i morgon 🦵", "Nytt personligt rekord! 🏆", "Bröst och armar. Speglarna tackar 💪"];
}

function tid(s, spel, fardig) {
  const fyll = framsteg(spel);
  const steg = s.steg || ["…"];
  const langd = 2400;
  const start = performance.now();
  const denna = omgang;
  $("rutaText").textContent = steg[0];
  const tick = (nu) => {
    if (omgang !== denna) return; // avbruten
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
    b.textContent = "🪂 " + plats;
    b.addEventListener("click", () => {
      const r = Math.random();
      const resultat =
        r < 0.3 ? `WINNER WINNER CHICKEN DINNER! 🍗 Bo vann från ${plats}!` :
        r < 0.7 ? `Top 10 från ${plats}. Inte illa! 🎯` :
        `Dog direkt i ${plats}. Någon hade en stekpanna 🍳`;
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
  let ratt = 0;
  $("rutaText").textContent = "Tryck på tangenten som lyser. Bo sjunger samtidigt!";
  const fyll = framsteg(spel);
  const rad = document.createElement("div");
  rad.className = "tangenter";
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
  const sang = document.createElement("p");
  sang.className = "sang";
  const lys = () => {
    let nytt;
    do { nytt = Math.floor(Math.random() * knappar.length); } while (nytt === ratt && knappar.length > 1);
    ratt = nytt;
    knappar.forEach((b, i) => b.classList.toggle("lyser", i === ratt));
  };
  spel.appendChild(rad);
  spel.appendChild(sang);
  lys();
  s.klar = s.id === "piano" ? "Applåder från grannarna! 👏🎹" : "Rockstjärna! 🤘🎸";
}

// Familjen är bara hemma ibland
function familj(s, spel, fardig) {
  const hemma = Math.random() < 0.4;
  if (!hemma) {
    $("rutaEmoji").textContent = "🚪";
    $("rutaText").textContent = "Ingen hemma just nu. Familjen är ute, prova igen senare!";
    $("rutaSpel").innerHTML = `<p class="liten">Familjen är bara hemma ibland.</p>`;
    setTimeout(() => sattKnappar([{ text: "Okej", gul: true, gor: stang }]), 0);
    return;
  }
  s.steg = ["Ringer på…", "Mamma öppnar! 🤗", "Middag på bordet 🍲"];
  s.klar = ["Mamma bjöd på middag. Proppmätt och glad 🍲", "Familjen sjöng grattis! 🎂", "Pappa ville prata om bilen. Länge. 🚗"];
  tid(s, spel, fardig);
}

// ── Vinst ──────────────────────────────────────────────────────
function vinst() {
  lage.vunnit = true;
  spara();
  konfetti();
  oppna({
    emoji: "🎂",
    titel: "GRATTIS BO, 19 ÅR! 🎉",
    text: "Du klarade Bo simulator med 19 poäng. Grattis på födelsedagen! Kassan, gymmet, PUBG, Tilde och mörkrostat kaffe. Ett perfekt liv.",
    knappar: [
      { text: "Spela igen", gul: true, gor: () => { localStorage.removeItem(NYCKEL); location.reload(); } },
      { text: "Fortsätt spela", gor: stang },
    ],
  });
}

function konfetti() {
  const k = $("konfetti");
  const farger = ["#ffc53d", "#ff8fb1", "#6cb6ff", "#8be28b", "#b388ff"];
  for (let i = 0; i < 140; i++) {
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
uppdatera();
if (!lage.sett) {
  oppna({
    emoji: "🎂",
    titel: "Grattis på 19-årsdagen, Bo!",
    text: "Gå runt och gör det Bo gillar: kassan på Prisma, gymmet, Tilde, PUBG, Minecraft, kaffe och mycket mer. Varje sak ger 1 poäng. Nå 19 poäng så vinner du! Håll koll på energin och magen.",
    knappar: [{ text: "Kör! 🎮", gul: true, stor: true, gor: () => { lage.sett = true; spara(); stang(); } }],
  });
}
