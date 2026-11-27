// Egenritade ikoner för Bo simulator (SVG, 64 x 64). Samma stil överallt:
// platta färger, rundade hörn och en mörk kontur.
const K = 'stroke="#2a2420" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
const svg = (inre) => `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">${inre}</svg>`;

// Ögon och mun för fienderna
const ansikte = (arg) => `
  <path d="M22 ${arg ? 25 : 27} L29 ${arg ? 29 : 27} M42 ${arg ? 25 : 27} L35 ${arg ? 29 : 27}" ${K} fill="none"/>
  <circle cx="26" cy="31" r="2.6" fill="#2a2420"/><circle cx="38" cy="31" r="2.6" fill="#2a2420"/>
  <path d="M26 41 q6 ${arg ? -5 : 4} 12 0" ${K} fill="none"/>`;

const IKONER = {
  bo: svg(`
    <path d="M14 62 a18 18 0 0 1 36 0 Z" fill="#3d7cf2" ${K}/>
    <path d="M27 48 l5 6 5-6" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="32" cy="30" r="13" fill="#ffd9b8" ${K}/>
    <path d="M19 28 c1-9 7-13 13-13 s12 4 13 13 c-4-4-8-5-13-5 s-9 1-13 5 Z" fill="#b97a35" ${K}/>
    <circle cx="27" cy="31" r="1.9" fill="#2a2420"/><circle cx="37" cy="31" r="1.9" fill="#2a2420"/>
    <path d="M27 37 q5 4 10 0" fill="none" stroke="#2a2420" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="23" cy="35" r="2" fill="#ff9e9e" opacity=".7"/><circle cx="41" cy="35" r="2" fill="#ff9e9e" opacity=".7"/>
    <path d="M27 17 L33 2 L39 16 Z" fill="#ffc53d" ${K}/><circle cx="33" cy="3" r="3" fill="#ff5c8a" ${K}/>
    <path d="M30 11 h6" stroke="#ff5c8a" stroke-width="2.5" stroke-linecap="round"/>`),

  tilde: svg(`
    <path d="M7 31 L32 10 L57 31 Z" fill="#ff7aa2" ${K}/>
    <rect x="13" y="30" width="38" height="26" rx="2" fill="#fff0f5" ${K}/>
    <path d="M32 52 C21 44 21 36 26.5 35 C29.5 34.4 32 37.5 32 37.5 C32 37.5 34.5 34.4 37.5 35 C43 36 43 44 32 52 Z" fill="#ff4d7d" ${K}/>`),
  gym: svg(`
    <rect x="23" y="29" width="18" height="6" rx="2" fill="#cfd2dc" ${K}/>
    <rect x="7" y="22" width="9" height="20" rx="3" fill="#4a4a58" ${K}/>
    <rect x="15" y="16" width="9" height="32" rx="3" fill="#5f6072" ${K}/>
    <rect x="40" y="16" width="9" height="32" rx="3" fill="#5f6072" ${K}/>
    <rect x="48" y="22" width="9" height="20" rx="3" fill="#4a4a58" ${K}/>`),
  pubg: svg(`
    <path d="M15 21 H49 a11 11 0 0 1 11 11 v5 a10 10 0 0 1 -18 6 l-3-4 H25 l-3 4 a10 10 0 0 1 -18 -6 v-5 a11 11 0 0 1 11 -11 Z" fill="#3b3f55" ${K}/>
    <path d="M14 31 h9 M18.5 26.5 v9" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="44" cy="28" r="2.8" fill="#ff5c5c"/><circle cx="50" cy="33" r="2.8" fill="#ffd23f"/>
    <circle cx="44" cy="38" r="2.8" fill="#5cd65c"/><circle cx="38" cy="33" r="2.8" fill="#5cc8ff"/>`),
  dator: svg(`
    <path d="M26 56 H38 M32 46 V56" ${K} fill="none"/>
    <rect x="7" y="10" width="50" height="36" rx="4" fill="#2b2d42" ${K}/>
    <rect x="12" y="15" width="40" height="26" rx="1" fill="#8fd3ff"/>
    <rect x="23" y="21" width="18" height="16" fill="#8b5a2b"/><rect x="23" y="21" width="18" height="6" fill="#5cb85c"/>
    <path d="M23 27 h4 v2 h4 v-2 h5 v3 h5" fill="none" stroke="#5cb85c" stroke-width="2"/>
    <circle cx="48" cy="19" r="2.5" fill="#ff4d4d"/>`),
  rita: svg(`
    <path d="M19 58 L27 10 M45 58 L37 10 M32 42 V60" ${K} fill="none"/>
    <rect x="13" y="13" width="38" height="29" rx="2" fill="#fff" ${K}/>
    <path d="M17 36 l9-9 6 6 5-5 10 8" fill="none" stroke="#5cb85c" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="40" cy="21" r="4" fill="#ffd43b"/><circle cx="22" cy="21" r="3" fill="#ff6b6b"/>`),
  piano: svg(`
    <rect x="7" y="16" width="50" height="34" rx="3" fill="#fff" ${K}/>
    <path d="M15.3 16 V50 M23.6 16 V50 M31.9 16 V50 M40.2 16 V50 M48.5 16 V50" stroke="#2a2420" stroke-width="2"/>
    <rect x="12.5" y="17" width="5.5" height="19" rx="1" fill="#2a2420"/><rect x="20.8" y="17" width="5.5" height="19" rx="1" fill="#2a2420"/>
    <rect x="37.4" y="17" width="5.5" height="19" rx="1" fill="#2a2420"/><rect x="45.7" y="17" width="5.5" height="19" rx="1" fill="#2a2420"/>`),
  gitarr: svg(`
    <path d="M37 30 L53 10" stroke="#2a2420" stroke-width="8" stroke-linecap="round"/>
    <path d="M37 30 L53 10" stroke="#8a5a2b" stroke-width="4" stroke-linecap="round"/>
    <rect x="49" y="5" width="9" height="9" rx="2" transform="rotate(40 53 10)" fill="#5a3a1a" ${K}/>
    <path d="M30 26 c6-4 13 1 11 8 c-1 3-3 5-6 5 c3 6-1 15-10 17 c-10 2-17-6-15-14 c1-6 6-9 11-8 c0-4 3-7 9-8 Z" fill="#f0913c" ${K}/>
    <circle cx="27" cy="40" r="4.5" fill="#3b2416"/>
    <path d="M21 47 l8-8" stroke="#3b2416" stroke-width="3" stroke-linecap="round"/>`),
  kafe: svg(`
    <path d="M24 17 q-4-5 0-10 M32 17 q-4-5 0-10 M40 17 q-4-5 0-10" fill="none" stroke="#c9b8a6" stroke-width="3" stroke-linecap="round"/>
    <path d="M46 29 h4 a7 7 0 0 1 0 14 h-6" fill="none" ${K}/>
    <path d="M13 24 H47 V38 a15 15 0 0 1 -15 15 H28 a15 15 0 0 1 -15 -15 Z" fill="#fff" ${K}/>
    <ellipse cx="30" cy="25.5" rx="15" ry="3.2" fill="#3b2416"/>
    <path d="M10 56 H50" ${K}/>`),
  tv: svg(`
    <path d="M24 56 H40 M32 46 V56" ${K} fill="none"/>
    <rect x="6" y="12" width="52" height="34" rx="5" fill="#2b2d42" ${K}/>
    <rect x="11" y="17" width="42" height="24" rx="2" fill="#7fd1ff"/>
    <path d="M28 23 L39 29 L28 35 Z" fill="#fff"/>`),
  park: svg(`
    <ellipse cx="32" cy="56" rx="24" ry="5" fill="#7cc46b"/>
    <rect x="29" y="34" width="7" height="20" rx="2" fill="#8b5a2b" ${K}/>
    <circle cx="32" cy="25" r="17" fill="#4caf50" ${K}/>
    <circle cx="25" cy="20" r="5" fill="#7ad17d"/><circle cx="39" cy="30" r="3" fill="#7ad17d"/>
    <path d="M6 50 H24 M9 50 v6 M21 50 v6" ${K} fill="none"/>`),
  familj: svg(`
    <circle cx="48" cy="6" r="3.5" fill="#e6e1d8"/><circle cx="53" cy="2" r="2.5" fill="#e6e1d8"/>
    <rect x="42" y="12" width="7" height="14" fill="#b5683a" ${K}/>
    <path d="M7 31 L32 10 L57 31 Z" fill="#5a8dee" ${K}/>
    <rect x="13" y="30" width="38" height="26" rx="2" fill="#fff8e7" ${K}/>
    <rect x="28" y="40" width="9" height="16" fill="#c08040" ${K}/>
    <rect x="16" y="35" width="8" height="8" fill="#ffe68a" ${K}/><rect x="41" y="35" width="8" height="8" fill="#ffe68a" ${K}/>`),
  prisma: svg(`
    <rect x="9" y="24" width="46" height="32" rx="3" fill="#fff6e6" ${K}/>
    <path d="M6 24 L11 11 H53 L58 24 Z" fill="#2f9e55" ${K}/>
    <path d="M20 11 L18 24 M32 11 V24 M44 11 L46 24" ${K} fill="none"/>
    <rect x="26" y="36" width="12" height="20" fill="#9fd3ff" ${K}/>
    <rect x="13" y="30" width="9" height="9" fill="#9fd3ff" ${K}/><rect x="42" y="30" width="9" height="9" fill="#9fd3ff" ${K}/>`),
  sang: svg(`
    <rect x="11" y="6" width="42" height="52" rx="5" fill="#fff" ${K}/>
    <rect x="17" y="10" width="30" height="11" rx="5" fill="#eaf2ff" ${K}/>
    <path d="M11 30 H53 V53 a5 5 0 0 1 -5 5 H16 a5 5 0 0 1 -5 -5 Z" fill="#6c8cff" ${K}/>
    <path d="M11 36 H53" stroke="#4d6be0" stroke-width="2.5"/>
    <text x="40" y="27" font-size="11" font-weight="900" fill="#6c8cff" font-family="sans-serif">z</text>`),
  kok: svg(`
    <path d="M36 13 q-3-4 0-8 M44 13 q-3-4 0-8" fill="none" stroke="#c9b8a6" stroke-width="3" stroke-linecap="round"/>
    <rect x="9" y="26" width="46" height="30" rx="4" fill="#e9e9ee" ${K}/>
    <circle cx="20" cy="45" r="5" fill="#55556a"/><circle cx="44" cy="45" r="5" fill="#55556a"/>
    <rect x="28" y="15" width="22" height="13" rx="3" fill="#ff8a3d" ${K}/>
    <path d="M25 18 h3 M50 18 h3" ${K}/>`),
  dusch: svg(`
    <path d="M18 8 V22 H30" fill="none" ${K}/>
    <path d="M28 20 h20 l-4 8 H32 Z" fill="#b8c4d6" ${K}/>
    <path d="M34 34 v6 M40 34 v8 M46 34 v6 M37 46 v5 M43 46 v5" stroke="#4fb3ff" stroke-width="3.2" stroke-linecap="round"/>
    <rect x="16" y="54" width="40" height="5" rx="2.5" fill="#dfeefc" ${K}/>`),

  // Fienderna
  stress: svg(`
    <path d="M32 5 l5 8 9-3 -1 10 9 3 -6 8 7 7 -10 2 1 10 -10-4 -4 9 -6-8 -8 6 -1-10 -10-1 5-8 -7-7 9-4 -2-10 10 3 Z" fill="#ff5c5c" ${K}/>
    ${ansikte(true)}`),
  angest: svg(`
    <path d="M32 8 c14 0 24 10 24 24 s-10 24 -24 24 -24-10 -24-24 c0-6 2-10 5-14" fill="#9b6bff" ${K}/>
    <path d="M14 14 q-4 -4 -1 -8" fill="none" stroke="#9b6bff" stroke-width="4" stroke-linecap="round"/>
    <path d="M44 46 c4-4 4-10 0-13" fill="none" stroke="#c9b0ff" stroke-width="2.5" stroke-linecap="round"/>
    ${ansikte(false)}`),
  oro: svg(`
    <path d="M18 50 a11 11 0 0 1 -2 -22 a14 14 0 0 1 26 -8 a11 11 0 0 1 8 30 Z" fill="#a9b1c2" ${K}/>
    <text x="44" y="17" font-size="16" font-weight="900" fill="#2a2420" font-family="sans-serif">?</text>
    ${ansikte(false)}`),
  flunsa: svg(`
    <path d="M32 6 V14 M32 50 V58 M6 32 H14 M50 32 H58 M13 13 l6 6 M45 45 l6 6 M51 13 l-6 6 M19 45 l-6 6" ${K}/>
    <circle cx="32" cy="6" r="3" fill="#8fd16a" ${K}/><circle cx="32" cy="58" r="3" fill="#8fd16a" ${K}/>
    <circle cx="6" cy="32" r="3" fill="#8fd16a" ${K}/><circle cx="58" cy="32" r="3" fill="#8fd16a" ${K}/>
    <circle cx="32" cy="32" r="19" fill="#8fd16a" ${K}/>
    <circle cx="22" cy="22" r="3" fill="#6bb84a"/><circle cx="43" cy="44" r="2.5" fill="#6bb84a"/>
    ${ansikte(false)}
    <path d="M44 22 q2 4 0 6" fill="none" stroke="#5cc8ff" stroke-width="2.5" stroke-linecap="round"/>`),

  // Övrigt
  trad: svg(`
    <ellipse cx="32" cy="57" rx="16" ry="4" fill="rgba(0,0,0,.15)"/>
    <rect x="28" y="40" width="8" height="16" rx="2" fill="#8b5a2b" ${K}/>
    <path d="M32 4 L52 30 H42 L54 44 H10 L22 30 H12 Z" fill="#3f9e4a" ${K}/>`),
  hjarta: svg(`<path d="M32 56 C10 40 6 26 14 17 C20 11 28 13 32 20 C36 13 44 11 50 17 C58 26 54 40 32 56 Z" fill="#ff4d6d" ${K}/>
    <path d="M18 22 q2-4 7-4" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>`),
  hjartaTomt: svg(`<path d="M32 56 C10 40 6 26 14 17 C20 11 28 13 32 20 C36 13 44 11 50 17 C58 26 54 40 32 56 Z" fill="#efe6da" ${K}/>`),
  tarta: svg(`
    <rect x="10" y="30" width="44" height="24" rx="4" fill="#ffd6e0" ${K}/>
    <path d="M10 38 q5 5 11 0 t11 0 11 0 11 0" fill="none" stroke="#ff7aa2" stroke-width="3"/>
    <path d="M22 30 V18 M32 30 V16 M42 30 V18" ${K}/>
    <path d="M22 18 q-3-5 0-9 q3 4 0 9 M32 16 q-3-5 0-9 q3 4 0 9 M42 18 q-3-5 0-9 q3 4 0 9" fill="#ffc53d"/>`),
};
