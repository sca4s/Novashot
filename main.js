// =========================================================================
// 0. WEB AUDIO API SYNTHESIZER (ZERO EXTERNAL ASSETS)
// =========================================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.noiseBuffer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this._createNoiseBuffer();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  _createNoiseBuffer() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.5;
    this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
  }

  toggleMute() {
    this.init();
    this.muted = !this.muted;
    return this.muted;
  }

  playShoot() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(920, now);
    osc1.frequency.exponentialRampToValueAtTime(195, now + 0.13);
    gain1.gain.setValueAtTime(0.16, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.13);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(420, now);
    osc2.frequency.exponentialRampToValueAtTime(95, now + 0.11);
    gain2.gain.setValueAtTime(0.11, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.11);
  }

  playExplosion() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    if (this.noiseBuffer) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(950, now);
      filter.frequency.exponentialRampToValueAtTime(220, now + 0.26);
      filter.Q.value = 1.4;
      const nGain = this.ctx.createGain();
      nGain.gain.setValueAtTime(0.24, now);
      nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
      noise.connect(filter);
      filter.connect(nGain);
      nGain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 0.26);
    }
    const sub = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(165, now);
    sub.frequency.exponentialRampToValueAtTime(36, now + 0.24);
    subGain.gain.setValueAtTime(0.25, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    sub.connect(subGain);
    subGain.connect(this.ctx.destination);
    sub.start(now);
    sub.stop(now + 0.24);
    const chimeNotes = [587.33, 880, 1174.66];
    chimeNotes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const cGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.025);
      cGain.gain.setValueAtTime(0.06, now + idx * 0.025);
      cGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.025 + 0.16);
      osc.connect(cGain);
      cGain.connect(this.ctx.destination);
      osc.start(now + idx * 0.025);
      osc.stop(now + idx * 0.025 + 0.16);
    });
  }

  playFruit() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const start = now + i * 0.055;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.14, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.24);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 0.24);
    });
  }

  playDiamond() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const start = now + i * 0.045;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.15, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 0.22);
    });
  }

  playShieldDrop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const start = now + i * 0.05;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.13, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 0.28);
    });
  }

  playShieldBlock() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(960, now + 0.18);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  playRevive() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const start = now + i * 0.055;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.16, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.32);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 0.32);
    });
  }

  playReload() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const pairs = [{f1: 698.46, f2: 880.0, delay: 0}, {f1: 880.0, f2: 1318.51, delay: 0.075}];
    pairs.forEach(p => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(p.f1, now + p.delay);
      osc.frequency.exponentialRampToValueAtTime(p.f2, now + p.delay + 0.09);
      gain.gain.setValueAtTime(0.14, now + p.delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + p.delay + 0.11);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + p.delay);
      osc.stop(now + p.delay + 0.11);
    });
  }

  playDamage() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.linearRampToValueAtTime(72, now + 0.28);
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, now);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  playGameOver() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [440, 392, 349.23, 261.63];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const start = now + idx * 0.11;
      osc.frequency.setValueAtTime(freq, start);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.85, start + 0.22);
      gain.gain.setValueAtTime(0.16, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.24);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 0.24);
    });
  }

  playUI(pitchMult = 1.0) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(620 * pitchMult, now);
    osc.frequency.exponentialRampToValueAtTime(980 * pitchMult, now + 0.055);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  playCountdownTick(isGo = false) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const baseFreq = isGo ? 1046.5 : 659.25;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * (isGo ? 1.25 : 0.92), now + (isGo ? 0.24 : 0.14));
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (isGo ? 0.26 : 0.15));
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + (isGo ? 0.26 : 0.15));
  }

  playNewDay() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const chord = [523.25, 659.25, 783.99, 1174.66];
    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const start = now + idx * 0.04;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.09, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.55);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 0.55);
    });
  }
}

const sfx = new SoundEngine();

// =========================================================================
// 1. CONFIGURATION, CAMERA MODES & PASTEL PALETTES
// =========================================================================
const BOUNDARY_X = 16;
const PLAYER_Z = 13;
const SPAWN_Z = -95;
const BULLET_MAX_Z = -108;
const DIAMOND_REVIVE_COST = 3;

const BIOMES = ['Grass', 'Ground', 'Rock', 'Underwater', 'Sky'];
const ENEMY_TYPES = ['Zombies', 'Alien Ships', 'Skeletons', 'Ghosts', 'Entities'];
const CAMERA_MODES = [
  { name: 'Classic', offset: new THREE.Vector3(0, 9.8, 12.5), lookOffset: new THREE.Vector3(0, 1.8, -33), followX: 0.22 },
  { name: 'Action Close', offset: new THREE.Vector3(0, 4.4, 6.2), lookOffset: new THREE.Vector3(0, 1.9, -42), followX: 0.78 },
  { name: 'Top-Down', offset: new THREE.Vector3(0, 25.5, 8.5), lookOffset: new THREE.Vector3(0, 0, -24), followX: 0.35 },
  { name: 'First-Person', offset: new THREE.Vector3(0, 2.55, -0.65), lookOffset: new THREE.Vector3(0, 2.1, -60), followX: 1.0 },
  { name: 'Cinematic', offset: new THREE.Vector3(8.5, 6.4, 11.5), lookOffset: new THREE.Vector3(-2, 1.6, -34), followX: 0.5 },
  { name: 'Fixed Swivel', offset: new THREE.Vector3(0, 4.6, 5.2), lookOffset: new THREE.Vector3(0, 1.8, -40), followX: 0.0, isFixedSwivel: true }
];

const BIOME_CONFIG = {
  Grass: {
    primary: '#b8e0d2', secondary: '#95d5b2', accent: '#d8f3dc',
    propColor1: '#74c69d', propColor2: '#ffafcc', trunkColor: '#ddb892',
    fogTint: 0xd8f3dc, groundBase: 0xb8e0d2
  },
  Ground: {
    primary: '#ffd6a5', secondary: '#ffadad', accent: '#fdffb6',
    propColor1: '#ff9ebb', propColor2: '#fec89a', trunkColor: '#e5989b',
    fogTint: 0xffe5d9, groundBase: 0xffd6a5
  },
  Rock: {
    primary: '#bdb2ff', secondary: '#d8d2ff', accent: '#caffbf',
    propColor1: '#a0c4ff', propColor2: '#ffc6ff', trunkColor: '#9bf6ff',
    fogTint: 0xe2afff, groundBase: 0xbdb2ff
  },
  Underwater: {
    primary: '#a0c4ff', secondary: '#9bf6ff', accent: '#ffc6ff',
    propColor1: '#ffafcc', propColor2: '#caffbf', trunkColor: '#bdb2ff',
    fogTint: 0x9bf6ff, groundBase: 0xa0c4ff
  },
  Sky: {
    primary: '#fde2e4', secondary: '#bee1e6', accent: '#e2ece9',
    propColor1: '#ffafcc', propColor2: '#bdb2ff', trunkColor: '#ffffff',
    fogTint: 0xfde2e4, groundBase: 0xfde2e4
  }
};

const SKIN_TONES = ['#ffadc6', '#ffcaa6', '#f5b882', '#e08e55', '#b85d19', '#782f04', '#38bdf8', '#a855f7'];
const PASTEL_DRESS_SWATCHES = [
  '#2563eb', '#ec4899', '#7c3aed', '#059669',
  '#f59e0b', '#e11d48', '#0891b2', '#1e1b4b'
];
const ENEMY_DRESS_PRESETS = [
  { name: 'Royal Cobalt & Mint', primary: 0x2563eb, secondary: 0x1e1b4b, accent: 0x34d399 },
  { name: 'Crimson Velvet & Gold', primary: 0xe11d48, secondary: 0x881337, accent: 0xfde047 },
  { name: 'Solar Amber & Indigo', primary: 0xf59e0b, secondary: 0x312e81, accent: 0x38bdf8 },
  { name: 'Emerald Cyber & Rose', primary: 0x059669, secondary: 0x064e3b, accent: 0xf472b6 },
  { name: 'Glacier Cyan & Obsidian', primary: 0x06b6d4, secondary: 0x0f172a, accent: 0xfef08a },
  { name: 'Imperial Violet & Coral', primary: 0x7c3aed, secondary: 0x2e1065, accent: 0xfb7185 }
];

// Auto-detect low-memory (<= 2GB RAM) hardware and touch screens
const detectedLowRam = (typeof navigator !== 'undefined' && navigator.deviceMemory && navigator.deviceMemory <= 2);
const savedGfxPref = localStorage.getItem('novashot_gfx_mode') || (detectedLowRam ? 'ld' : 'hd');
const isTouchCapableDevice = (typeof window !== 'undefined') && (
  ('ontouchstart' in window) ||
  (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
  (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)
);

const state = {
  gameStarted: false,
  isPaused: false,
  isDead: false,
  isCountingDown: false,
  isModalScrolling: false,
  countdownValue: 0,
  enemyGraceTimer: 0,
  deviceMode: isTouchCapableDevice ? 'touch' : 'desktop',
  graphicsMode: savedGfxPref === 'ld' ? 'ld' : 'hd', // 'hd' (High Def) | 'ld' (Low Def 2GB RAM Smooth)
  uiTheme: 'light', // 'light' | 'dark'
  cameraModeIndex: 0,
  isMagnified: false,
  aimYaw: 0, // Player rotation yaw in radians (used in Fixed Swivel mode up to +-85 deg / ~170-180 deg arc)
  fixedCamInvokePos: new THREE.Vector3(0, 4.6, PLAYER_Z + 5.2),
  fixedPlayerInvokeX: 0,
  swivelCoreTimer: 15.0,
  swivelCoreMax: 15.0,
  swivelWarned: false,
  lastReloadTime: 0,
  health: 6,
  ammo: 40,
  fruitsEaten: 0,
  diamondsRun: 0,
  diamondsBank: Number(localStorage.getItem('novashot_diamonds_bank') || 6), // Stored across games & sessions
  aegisShields: Number(localStorage.getItem('novashot_shields_bank') || 1), // Special accident-prevention shields
  bulletsFired: 0,
  enemiesKilled: 0,
  daysSurvived: 1,
  sessionTime: 0,
  score: 0,
  highScore: Number(localStorage.getItem('shoooter_highscore') || 0),
  bestTime: Number(localStorage.getItem('skyshift_best_time') || 0),
  bestDays: Number(localStorage.getItem('skyshift_best_days') || 1),
  enemySpeedMult: 1.0,
  cycleSpeedMult: 1.0,
  skyPhaseMode: 'dynamic', // dynamic, forcedDay, forcedNight
  timeOfDay: 0.18,
  biomeIndex: 0,
  enemyTypeIndex: 0,
  selectedEnemies: ['Zombies'],
  enemyDressIndex: 0,
  character: {
    gender: 'female',
    outfit: 0,
    skinTone: '#ffcaa6',
    shirtColors: ['#ec4899', '#2563eb'],
    pantColor: '#1e1b4b'
  },
  keys: {},
  touchLeft: false,
  touchRight: false,
  touchFire: false,
  lastShotTime: 0,
  spawnTimer: 0,
  ammoSpawnTimer: 0,
  diamondSpawnTimer: 0,
  shieldSpawnTimer: 0
};

// =========================================================================
// 2. THREE.JS SCENE, CAMERA, RENDERER & 2GB RAM GRAPHICS ENGINE
// =========================================================================
const canvas = document.getElementById('game-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: state.graphicsMode === 'hd',
  powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(state.graphicsMode === 'ld' ? 1.0 : Math.min(window.devicePixelRatio || 1, 2));
renderer.shadowMap.enabled = state.graphicsMode === 'hd';
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.95;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xd8f3dc, 0.0085);

const camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 250);
camera.position.set(0, 9.8, 25.5);
camera.lookAt(0, 1.8, -20);

// =========================================================================
// 3. SMOOTH PASTEL CHECKER / TILE TEXTURE GENERATOR & SHIRT STRIPE TEXTURES
// =========================================================================
function createPastelTileTexture(c1, c2, accent) {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = c1;
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = c2;
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillRect(128, 128, 128, 128);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, 120, 120);
  ctx.strokeRect(132, 132, 120, 120);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(12, 35);
  return tex;
}

function createShirtMultiShadeTexture(shades, outfitIndex) {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d');
  const count = shades.length;
  const stripeHeight = 128 / Math.max(1, count);
  shades.forEach((hex, i) => {
    ctx.fillStyle = hex;
    ctx.fillRect(0, i * stripeHeight, 128, stripeHeight + 1);
  });
  if (outfitIndex === 0) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(48, 16, 32, 96);
  } else if (outfitIndex === 2) {
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 56, 128, 18);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

const biomeTextures = {};
BIOMES.forEach(name => {
  const cfg = BIOME_CONFIG[name];
  biomeTextures[name] = createPastelTileTexture(cfg.primary, cfg.secondary, cfg.accent);
});

// =========================================================================
// 4. PASTEL LIGHTING, SUN, MOON, STARS & FLUFFY 3D CLOUDS
// =========================================================================
const hemiLight = new THREE.HemisphereLight(0xfff8f0, 0xd8e2dc, 0.6);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xfff5eb, 0.8);
dirLight.position.set(28, 48, -18);
dirLight.castShadow = state.graphicsMode === 'hd';
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.camera.left = -38;
dirLight.shadow.camera.right = 38;
dirLight.shadow.camera.top = 65;
dirLight.shadow.camera.bottom = -65;
dirLight.shadow.bias = -0.0005;
scene.add(dirLight);

const celestialGroup = new THREE.Group();
scene.add(celestialGroup);

const sunGroup = new THREE.Group();
const sunCore = new THREE.Mesh(new THREE.SphereGeometry(5.2, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffe599 }));
const sunHalo = new THREE.Mesh(new THREE.SphereGeometry(7.2, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffd6a5, transparent: true, opacity: 0.35 }));
sunGroup.add(sunCore, sunHalo);
sunGroup.position.set(0, 58, -82);
celestialGroup.add(sunGroup);

const moonGroup = new THREE.Group();
const moonCore = new THREE.Mesh(new THREE.SphereGeometry(4.2, 32, 32), new THREE.MeshBasicMaterial({ color: 0xf1f0ff }));
const moonRing = new THREE.Mesh(new THREE.TorusGeometry(6.4, 0.35, 16, 48), new THREE.MeshBasicMaterial({ color: 0xbdb2ff, transparent: true, opacity: 0.7 }));
moonRing.rotation.x = Math.PI / 2.6;
moonGroup.add(moonCore, moonRing);
moonGroup.position.set(0, -58, -82);
celestialGroup.add(moonGroup);

const starGeo = new THREE.BufferGeometry();
const starPos = [];
for (let i = 0; i < 320; i++) starPos.push((Math.random() - 0.5) * 230, Math.random() * 80 + 14, -Math.random() * 145 - 20);
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
const starMat = new THREE.PointsMaterial({ color: 0xfff0f6, size: 0.85, transparent: true, opacity: 0 });
const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

const clouds = [];
const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.0, transparent: true, opacity: 0.92 });

function createFluffyCloud() {
  const group = new THREE.Group();
  const puffCount = 4 + Math.floor(Math.random() * 3);
  for (let i = 0; i < puffCount; i++) {
    const radius = 1.6 + Math.random() * 1.4;
    const puff = new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 16), cloudMat);
    puff.position.set((i - puffCount / 2) * 1.9, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 1.4);
    puff.scale.y = 0.72;
    group.add(puff);
  }
  return group;
}

for (let i = 0; i < 18; i++) {
  const cloud = createFluffyCloud();
  cloud.position.set((Math.random() - 0.5) * 120, 20 + Math.random() * 10, -Math.random() * 120 + 8);
  const s = 0.9 + Math.random() * 0.7;
  cloud.scale.set(s, s, s);
  scene.add(cloud);
  clouds.push({ mesh: cloud, speed: 1.0 + Math.random() * 1.2 });
}

// =========================================================================
// 5. STAGE FLOOR, PORTAL RAILS & STYLIZED BIOME SCENERY
// =========================================================================
const groundMat = new THREE.MeshStandardMaterial({ map: biomeTextures.Grass, roughness: 0.75, metalness: 0.05 });
const ground = new THREE.Mesh(new THREE.BoxGeometry(50, 2, 150), groundMat);
ground.position.set(0, -1, -48);
ground.receiveShadow = true;
scene.add(ground);

const laneTrack = new THREE.Mesh(new THREE.BoxGeometry(BOUNDARY_X * 2, 0.08, 1.8), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.38 }));
laneTrack.position.set(0, 0.04, PLAYER_Z);
scene.add(laneTrack);

const portalMat = new THREE.MeshStandardMaterial({ color: 0xffafcc, emissive: 0xffafcc, emissiveIntensity: 0.5, transparent: true, opacity: 0.55, roughness: 0.2 });
const leftPortal = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 145, 16), portalMat);
leftPortal.rotation.x = Math.PI / 2;
leftPortal.position.set(-BOUNDARY_X - 0.6, 1.2, -45);
scene.add(leftPortal);
const rightPortal = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 145, 16), portalMat);
rightPortal.rotation.x = Math.PI / 2;
rightPortal.position.set(BOUNDARY_X + 0.6, 1.2, -45);
scene.add(rightPortal);

const sceneryGroup = new THREE.Group();
scene.add(sceneryGroup);

const bubbles = [];
const bubbleMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.7, opacity: 0.65, transparent: true, roughness: 0.1, metalness: 0.1 });
for (let i = 0; i < 28; i++) {
  const b = new THREE.Mesh(new THREE.SphereGeometry(0.35 + Math.random() * 0.45, 16, 16), bubbleMat);
  b.position.set((Math.random() - 0.5) * 38, Math.random() * 14, -Math.random() * 100 + 12);
  b.visible = false;
  scene.add(b);
  bubbles.push(b);
}

function rebuildBiomeScenery(biomeName) {
  while (sceneryGroup.children.length > 0) sceneryGroup.remove(sceneryGroup.children[0]);
  const cfg = BIOME_CONFIG[biomeName];
  const mat1 = new THREE.MeshStandardMaterial({ color: cfg.propColor1, roughness: 0.55 });
  const mat2 = new THREE.MeshStandardMaterial({ color: cfg.propColor2, roughness: 0.55 });
  const trunkMat = new THREE.MeshStandardMaterial({ color: cfg.trunkColor, roughness: 0.7 });
  const stepZ = state.graphicsMode === 'ld' ? 14 : 9;
  const castShad = state.graphicsMode === 'hd';

  for (let z = -96; z <= 14; z += stepZ) {
    [-BOUNDARY_X - 4.2, BOUNDARY_X + 4.2].forEach((xBase, sideIdx) => {
      const xPos = xBase + (Math.random() - 0.5) * 1.8;
      const prop = new THREE.Group();
      if (biomeName === 'Grass') {
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.5, 2.2, 12), trunkMat); trunk.position.y = 1.1; trunk.castShadow = castShad; prop.add(trunk);
        const foliageMat = (Math.abs(z) + sideIdx) % 2 === 0 ? mat1 : mat2;
        const cone1 = new THREE.Mesh(new THREE.ConeGeometry(1.7, 2.8, 16), foliageMat); cone1.position.y = 3.0; cone1.castShadow = castShad;
        const cone2 = new THREE.Mesh(new THREE.ConeGeometry(1.3, 2.2, 16), foliageMat); cone2.position.y = 4.4; cone2.castShadow = castShad;
        prop.add(cone1, cone2);
      } else if (biomeName === 'Ground') {
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.75, 3.6, 16), mat1); body.position.y = 1.8; body.castShadow = castShad;
        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.65, 16, 16), mat1); cap.position.y = 3.6;
        const blossom = new THREE.Mesh(new THREE.SphereGeometry(0.38, 12, 12), mat2); blossom.position.y = 4.2;
        prop.add(body, cap, blossom);
      } else if (biomeName === 'Rock') {
        const h = 3.2 + Math.random() * 2.5;
        const crystal = new THREE.Mesh(new THREE.CylinderGeometry(0, 1.1, h, 6), mat1); crystal.position.y = h / 2; crystal.castShadow = castShad;
        const subCrystal = new THREE.Mesh(new THREE.CylinderGeometry(0, 0.7, h * 0.65, 6), mat2); subCrystal.position.set(0.7, (h * 0.65) / 2, 0.4); subCrystal.rotation.z = -0.2;
        prop.add(crystal, subCrystal);
      } else if (biomeName === 'Underwater') {
        const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.9, 3.8, 16), mat1); spire.position.y = 1.9;
        const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), mat2); pearl.position.set(0, 4.1, 0);
        prop.add(spire, pearl);
      } else {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 2.8, 16), trunkMat); pillar.position.y = 1.4;
        const puff = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 16), (z % 2 === 0) ? mat1 : mat2); puff.position.y = 3.2;
        prop.add(pillar, puff);
      }
      prop.position.set(xPos, 0, z); sceneryGroup.add(prop);
    });
  }
  const showBubbles = (biomeName === 'Underwater' || biomeName === 'Sky'); bubbles.forEach(b => { b.visible = showBubbles; });
}

function applyBiome(index) {
  const name = BIOMES[index];
  document.getElementById('biome-val').textContent = name;
  document.getElementById('touch-biome-label').textContent = name;
  groundMat.map = biomeTextures[name];
  groundMat.needsUpdate = true;
  rebuildBiomeScenery(name);
  sfx.playUI(1.1);
  showToast(`🌸 Biome: ${name}`);
}

// =========================================================================
// 6. STYLIZED 3D RANGER MODEL & 360° AVATAR STUDIO BUILDER
// =========================================================================
const player = new THREE.Group();
player.position.set(0, 0, PLAYER_Z);
scene.add(player);

// 3D Special Accident-Prevention Aegis Shield Aura around the player
const playerAegisAuraGroup = new THREE.Group();
const aegisShellMesh = new THREE.Mesh(
  new THREE.SphereGeometry(1.65, 24, 24),
  new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.16, wireframe: false })
);
aegisShellMesh.position.y = 1.45;
const aegisOrbitRing = new THREE.Mesh(
  new THREE.TorusGeometry(1.48, 0.045, 12, 36),
  new THREE.MeshBasicMaterial({ color: 0x6ee7b7, transparent: true, opacity: 0.72 })
);
aegisOrbitRing.rotation.x = Math.PI / 2;
aegisOrbitRing.position.y = 1.35;
playerAegisAuraGroup.add(aegisShellMesh, aegisOrbitRing);

const sharedAntennaGroup = new THREE.Group();
sharedAntennaGroup.position.set(0, 3.15, 0);
const antStem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.45, 8), new THREE.MeshStandardMaterial({ color: 0xbdb2ff }));
const antOrb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), new THREE.MeshBasicMaterial({ color: 0xff758f }));
antOrb.position.y = 0.25;
sharedAntennaGroup.add(antStem, antOrb);

const sharedBlasterGroup = new THREE.Group();
const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 1.55, 16), new THREE.MeshStandardMaterial({ color: 0xbdb2ff, roughness: 0.3, metalness: 0.3 }));
barrel.rotation.x = Math.PI / 2;
const muzzleRing = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.06, 12, 24), new THREE.MeshBasicMaterial({ color: 0xfdffb6 }));
muzzleRing.position.z = -0.78;
sharedBlasterGroup.add(barrel, muzzleRing);
sharedBlasterGroup.position.set(0.82, 1.32, -0.55);

// 3D Bullet Shot Pointer & Laser Sight (shows exact point & trajectory where bullet is shot)
const aimPointer3DGroup = new THREE.Group();
const aimBeamGeo = new THREE.CylinderGeometry(0.035, 0.035, 1, 8);
aimBeamGeo.rotateX(Math.PI / 2);
aimBeamGeo.translate(0, 0, -0.5);
const aimBeamMat = new THREE.MeshBasicMaterial({ color: 0xff758f, transparent: true, opacity: 0.55 });
const aimBeamMesh = new THREE.Mesh(aimBeamGeo, aimBeamMat);

const aimTargetMarker = new THREE.Group();
const aimMarkerOuterRing = new THREE.Mesh(
  new THREE.RingGeometry(0.52, 0.68, 28),
  new THREE.MeshBasicMaterial({ color: 0xff758f, side: THREE.DoubleSide, transparent: true, opacity: 0.92 })
);
const aimMarkerInnerRing = new THREE.Mesh(
  new THREE.RingGeometry(0.18, 0.28, 20),
  new THREE.MeshBasicMaterial({ color: 0xfdffb6, side: THREE.DoubleSide, transparent: true, opacity: 0.95 })
);
const aimMarkerCoreDot = new THREE.Mesh(
  new THREE.SphereGeometry(0.14, 12, 12),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
aimTargetMarker.add(aimMarkerOuterRing, aimMarkerInnerRing, aimMarkerCoreDot);
aimPointer3DGroup.add(aimBeamMesh, aimTargetMarker);
scene.add(aimPointer3DGroup);

function populateRangerGroup(targetGroup, includeSharedBlaster = true) {
  while (targetGroup.children.length > 0) targetGroup.remove(targetGroup.children[0]);

  const config = state.character;
  const gender = config.gender;
  const outfit = config.outfit;
  const shirtShades = config.shirtColors.length > 0 ? config.shirtColors : ['#2563eb'];
  const primaryShirtHex = shirtShades[0];
  const secondaryShirtHex = shirtShades[shirtShades.length > 1 ? 1 : 0];
  const shirtTex = createShirtMultiShadeTexture(shirtShades, outfit);

  const skinColorObj = new THREE.Color(config.skinTone);
  const skinMat = new THREE.MeshStandardMaterial({
    color: skinColorObj,
    emissive: skinColorObj,
    emissiveIntensity: 0.05,
    roughness: 0.42,
    metalness: 0.04
  });
  const shirtMat = new THREE.MeshStandardMaterial({ map: shirtTex, roughness: 0.26, metalness: 0.08 });
  const primaryShirtMat = new THREE.MeshStandardMaterial({ color: primaryShirtHex, roughness: 0.28, metalness: 0.1 });
  const secondaryShirtMat = new THREE.MeshStandardMaterial({ color: secondaryShirtHex, roughness: 0.28, metalness: 0.12 });
  const pantMat = new THREE.MeshStandardMaterial({ color: config.pantColor, roughness: 0.3, metalness: 0.1 });
  const whiteTrimMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.15 });
  const darkTrimMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.25, metalness: 0.25 });
  const goldTrimMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xf59e0b, emissiveIntensity: 0.25, roughness: 0.2, metalness: 0.6 });
  const neonCoreMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

  if (outfit === 0) {
    [-0.3, 0.3].forEach(xPos => {
      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.23, 0.52, 18), pantMat);
      thigh.position.set(xPos, 0.52, 0);
      thigh.castShadow = true;
      const kneeRing = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.045, 10, 20), goldTrimMat);
      kneeRing.rotation.x = Math.PI / 2;
      kneeRing.position.set(xPos, 0.35, 0);
      const boot = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.36, 18), whiteTrimMat);
      boot.position.set(xPos, 0.18, 0.03);
      boot.castShadow = true;
      const bootSole = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.1, 0.68), secondaryShirtMat);
      bootSole.position.set(xPos, 0.05, 0.06);
      targetGroup.add(thigh, kneeRing, boot, bootSole);
    });

    const pelvis = new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.6, 0.4, 24), pantMat);
    pelvis.position.y = 0.78;
    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.69, 0.69, 0.16, 24), darkTrimMat);
    belt.position.y = 0.92;
    const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.2, 0.15), goldTrimMat);
    buckle.position.set(0, 0.92, -0.66);
    targetGroup.add(pelvis, belt, buckle);

    const torsoMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.62, 0.88, 24), shirtMat);
    torsoMesh.position.y = 1.36;
    torsoMesh.castShadow = true;
    const chestPlate = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.54, 0.42), primaryShirtMat);
    chestPlate.position.set(0, 1.42, -0.44);
    const chestCoreRim = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.04, 12, 24), goldTrimMat);
    chestCoreRim.position.set(0, 1.44, -0.66);
    const chestCore = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), neonCoreMat);
    chestCore.position.set(0, 1.44, -0.66);
    const neckRing = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.06, 12, 28), whiteTrimMat);
    neckRing.rotation.x = Math.PI / 2;
    neckRing.position.y = 1.8;
    targetGroup.add(torsoMesh, chestPlate, chestCoreRim, chestCore, neckRing);

    [-1, 1].forEach(dir => {
      const pauldron = new THREE.Mesh(new THREE.SphereGeometry(0.34, 18, 18), secondaryShirtMat);
      pauldron.scale.set(1.1, 0.75, 1.0);
      pauldron.position.set(dir * 0.78, 1.66, 0);
      const pauldronRim = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.04, 10, 20), goldTrimMat);
      pauldronRim.rotation.y = dir * 0.35;
      pauldronRim.rotation.x = Math.PI / 2;
      pauldronRim.position.set(dir * 0.78, 1.62, 0);
      const bareForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.17, 0.52, 16), skinMat);
      bareForearm.position.set(dir * 0.84, 1.28, 0);
      bareForearm.rotation.z = -dir * 0.18;
      const wristCuff = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.035, 10, 18), goldTrimMat);
      wristCuff.rotation.x = Math.PI / 2;
      wristCuff.position.set(dir * 0.88, 1.06, 0);
      const bareHand = new THREE.Mesh(new THREE.SphereGeometry(0.21, 16, 16), skinMat);
      bareHand.position.set(dir * 0.91, 0.94, 0);
      targetGroup.add(pauldron, pauldronRim, bareForearm, wristCuff, bareHand);
    });

    const jetBase = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.92, 0.42), secondaryShirtMat);
    jetBase.position.set(0, 1.38, 0.48);
    [-0.28, 0.28].forEach(xOff => {
      const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.96, 16), whiteTrimMat);
      tank.position.set(xOff, 1.38, 0.62);
      const nozzle = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.24, 14), darkTrimMat);
      nozzle.position.set(xOff, 0.82, 0.62);
      targetGroup.add(tank, nozzle);
    });
    targetGroup.add(jetBase);

  } else if (outfit === 1 && gender === 'female') {
    [-0.25, 0.25].forEach(xPos => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.17, 0.64, 16), skinMat);
      leg.position.set(xPos, 0.36, 0);
      const sock = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.16, 0.2, 16), whiteTrimMat);
      sock.position.set(xPos, 0.15, 0);
      const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.14, 0.5), pantMat);
      shoe.position.set(xPos, 0.07, -0.05);
      targetGroup.add(leg, sock, shoe);
    });

    const skirtTierBottom = new THREE.Mesh(new THREE.ConeGeometry(1.22, 0.52, 28), pantMat);
    skirtTierBottom.position.y = 0.62;
    skirtTierBottom.castShadow = true;
    const ruffleRing1 = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.055, 12, 32), whiteTrimMat);
    ruffleRing1.rotation.x = Math.PI / 2;
    ruffleRing1.position.y = 0.38;

    const skirtTierMid = new THREE.Mesh(new THREE.ConeGeometry(0.98, 0.48, 28), shirtMat);
    skirtTierMid.position.y = 0.88;
    skirtTierMid.castShadow = true;
    const ruffleRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.94, 0.05, 12, 32), goldTrimMat);
    ruffleRing2.rotation.x = Math.PI / 2;
    ruffleRing2.position.y = 0.66;

    const skirtTierTop = new THREE.Mesh(new THREE.ConeGeometry(0.76, 0.42, 28), pantMat);
    skirtTierTop.position.y = 1.1;
    targetGroup.add(skirtTierBottom, ruffleRing1, skirtTierMid, ruffleRing2, skirtTierTop);

    const waistSash = new THREE.Mesh(new THREE.CylinderGeometry(0.54, 0.56, 0.18, 24), whiteTrimMat);
    waistSash.position.y = 1.16;
    const bowCenter = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), goldTrimMat);
    bowCenter.position.set(0, 1.16, -0.56);
    const bowLeft = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.28, 12), secondaryShirtMat);
    bowLeft.rotation.z = Math.PI / 2;
    bowLeft.position.set(-0.18, 1.16, -0.55);
    const bowRight = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.28, 12), secondaryShirtMat);
    bowRight.rotation.z = -Math.PI / 2;
    bowRight.position.set(0.18, 1.16, -0.55);
    targetGroup.add(waistSash, bowCenter, bowLeft, bowRight);

    const bodice = new THREE.Mesh(new THREE.CylinderGeometry(0.54, 0.48, 0.64, 24), shirtMat);
    bodice.position.y = 1.48;
    bodice.castShadow = true;
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.065, 12, 26), whiteTrimMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = 1.78;
    targetGroup.add(bodice, collar);

    [-1, 1].forEach(dir => {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(0.28, 18, 18), primaryShirtMat);
      puff.position.set(dir * 0.66, 1.62, 0);
      const cuff = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.035, 10, 18), whiteTrimMat);
      cuff.rotation.x = Math.PI / 2;
      cuff.position.set(dir * 0.72, 1.42, 0);
      const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.15, 0.48, 16), skinMat);
      forearm.position.set(dir * 0.78, 1.18, 0);
      forearm.rotation.z = -dir * 0.15;
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), skinMat);
      hand.position.set(dir * 0.84, 0.94, 0);
      targetGroup.add(puff, cuff, forearm, hand);
    });

    [-1, 1].forEach(dir => {
      const wing = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.95, 4), whiteTrimMat);
      wing.rotation.z = dir * 0.55;
      wing.rotation.x = -0.2;
      wing.position.set(dir * 0.42, 1.48, 0.48);
      targetGroup.add(wing);
    });

  } else if (outfit === 2) {
    [-0.29, 0.29].forEach((xPos, idx) => {
      const dir = idx === 0 ? -1 : 1;
      const baggyLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.31, 0.68, 18), pantMat);
      baggyLeg.position.set(xPos, 0.42, 0);
      baggyLeg.castShadow = true;
      const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.26, 0.28), darkTrimMat);
      pocket.position.set(xPos + dir * 0.26, 0.45, 0);
      const pocketFlap = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.07, 0.3), goldTrimMat);
      pocketFlap.position.set(xPos + dir * 0.26, 0.58, 0);
      const sneakerBase = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.16, 0.62), whiteTrimMat);
      sneakerBase.position.set(xPos, 0.08, -0.06);
      const sneakerTongue = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.14, 0.32), primaryShirtMat);
      sneakerTongue.position.set(xPos, 0.18, -0.08);
      targetGroup.add(baggyLeg, pocket, pocketFlap, sneakerBase, sneakerTongue);
    });

    const cargoPelvis = new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.66, 0.32, 24), pantMat);
    cargoPelvis.position.y = 0.78;
    const underHem = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.69, 0.12, 24), whiteTrimMat);
    underHem.position.y = 0.94;
    targetGroup.add(cargoPelvis, underHem);

    const boxyTee = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.86, 0.86), shirtMat);
    boxyTee.position.y = 1.36;
    boxyTee.castShadow = true;
    const chestBand = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.24, 0.89), secondaryShirtMat);
    chestBand.position.y = 1.44;
    const crewCollar = new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.06, 12, 24), darkTrimMat);
    crewCollar.rotation.x = Math.PI / 2;
    crewCollar.position.y = 1.8;
    targetGroup.add(boxyTee, chestBand, crewCollar);

    [-1, 1].forEach(dir => {
      const teeSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.4, 16), primaryShirtMat);
      teeSleeve.position.set(dir * 0.78, 1.54, 0);
      teeSleeve.rotation.z = -dir * 0.28;
      const sleeveStripe = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.03, 10, 18), whiteTrimMat);
      sleeveStripe.rotation.x = Math.PI / 2;
      sleeveStripe.rotation.y = -dir * 0.28;
      sleeveStripe.position.set(dir * 0.82, 1.38, 0);
      const bareArm = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.17, 0.48, 16), skinMat);
      bareArm.position.set(dir * 0.88, 1.15, 0);
      bareArm.rotation.z = -dir * 0.15;
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.21, 16, 16), skinMat);
      hand.position.set(dir * 0.93, 0.91, 0);
      targetGroup.add(teeSleeve, sleeveStripe, bareArm, hand);
    });

    const slingPack = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.82, 0.36), darkTrimMat);
    slingPack.rotation.z = 0.28;
    slingPack.position.set(0, 1.36, 0.54);
    targetGroup.add(slingPack);

  } else {
    [-0.27, 0.27].forEach(xPos => {
      const slackLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.72, 18), pantMat);
      slackLeg.position.set(xPos, 0.44, 0);
      slackLeg.castShadow = true;
      const cuffRing = new THREE.Mesh(new THREE.TorusGeometry(0.185, 0.025, 8, 18), darkTrimMat);
      cuffRing.rotation.x = Math.PI / 2;
      cuffRing.position.set(xPos, 0.14, 0);
      const loafer = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.14, 0.56), darkTrimMat);
      loafer.position.set(xPos, 0.07, -0.05);
      const buckleBit = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.04, 0.08), goldTrimMat);
      buckleBit.position.set(xPos, 0.15, -0.16);
      targetGroup.add(slackLeg, cuffRing, loafer, buckleBit);
    });

    const formalPelvis = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.56, 0.4, 24), pantMat);
    formalPelvis.position.y = 0.82;
    const leatherBelt = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.12, 24), darkTrimMat);
    leatherBelt.position.y = 0.98;
    const goldBuckle = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.1), goldTrimMat);
    goldBuckle.position.set(0, 0.98, -0.6);
    targetGroup.add(formalPelvis, leatherBelt, goldBuckle);

    const innerShirt = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.58, 0.84, 24), whiteTrimMat);
    innerShirt.position.y = 1.4;
    const vest = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.61, 0.74, 24), shirtMat);
    vest.position.y = 1.36;
    vest.castShadow = true;
    const vNeckFront = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.52, 4), whiteTrimMat);
    vNeckFront.rotation.x = Math.PI;
    vNeckFront.rotation.y = Math.PI / 4;
    vNeckFront.position.set(0, 1.58, -0.46);
    const tieKnot = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), secondaryShirtMat);
    tieKnot.position.set(0, 1.7, -0.58);
    const tieBlade = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.54, 0.08), secondaryShirtMat);
    tieBlade.position.set(0, 1.42, -0.62);
    [1.12, 1.24].forEach(yBtn => {
      const btn = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 10), goldTrimMat);
      btn.position.set(0, yBtn, -0.62);
      targetGroup.add(btn);
    });
    const dressCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.52, 0.14, 24), whiteTrimMat);
    dressCollar.position.y = 1.8;
    targetGroup.add(innerShirt, vest, vNeckFront, tieKnot, tieBlade, dressCollar);

    [-1, 1].forEach(dir => {
      const shirtSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.19, 0.34, 16), whiteTrimMat);
      shirtSleeve.position.set(dir * 0.72, 1.54, 0);
      shirtSleeve.rotation.z = -dir * 0.2;
      const frenchCuff = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.1, 16), primaryShirtMat);
      frenchCuff.position.set(dir * 0.76, 1.37, 0);
      frenchCuff.rotation.z = -dir * 0.2;
      const bareForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.15, 0.42, 16), skinMat);
      bareForearm.position.set(dir * 0.81, 1.15, 0);
      bareForearm.rotation.z = -dir * 0.18;
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), skinMat);
      hand.position.set(dir * 0.86, 0.94, 0);
      targetGroup.add(shirtSleeve, frenchCuff, bareForearm, hand);
    });

    const briefcasePack = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.68, 0.32), pantMat);
    briefcasePack.position.set(0, 1.36, 0.48);
    const clasp1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.16, 0.36), goldTrimMat);
    clasp1.position.set(-0.22, 1.36, 0.48);
    const clasp2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.16, 0.36), goldTrimMat);
    clasp2.position.set(0.22, 1.36, 0.48);
    targetGroup.add(briefcasePack, clasp1, clasp2);
  }

  const headPartsList = [];

  const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.4, 0.42, 24), skinMat);
  neckMesh.position.y = 1.94;
  neckMesh.castShadow = true;
  targetGroup.add(neckMesh);
  headPartsList.push(neckMesh);

  const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.76, 32, 32), skinMat);
  headMesh.position.y = 2.44;
  headMesh.castShadow = true;
  targetGroup.add(headMesh);
  headPartsList.push(headMesh);

  [-1, 1].forEach(dir => {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.21, 16, 16), skinMat);
    ear.scale.set(0.65, 1.05, 0.85);
    ear.position.set(dir * 0.75, 2.42, 0);
    targetGroup.add(ear);
    headPartsList.push(ear);
  });

  const noseMesh = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 14), skinMat);
  noseMesh.position.set(0, 2.4, -0.76);
  targetGroup.add(noseMesh);
  headPartsList.push(noseMesh);

  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
  const pupilShineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const blushMat = new THREE.MeshBasicMaterial({ color: 0xff758f, transparent: true, opacity: 0.55 });
  [-1, 1].forEach(dir => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 14), eyeMat);
    eye.scale.set(1.0, 1.25, 0.6);
    eye.position.set(dir * 0.26, 2.48, -0.69);
    const shine = new THREE.Mesh(new THREE.SphereGeometry(0.038, 10, 10), pupilShineMat);
    shine.position.set(dir * 0.24, 2.52, -0.74);
    const blush = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), blushMat);
    blush.scale.set(1.3, 0.65, 0.4);
    blush.position.set(dir * 0.42, 2.34, -0.65);
    targetGroup.add(eye, shine, blush);
    headPartsList.push(eye, shine, blush);
  });

  const haloCrown = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.065, 14, 32), goldTrimMat);
  haloCrown.rotation.x = Math.PI / 2 - 0.22;
  haloCrown.position.set(0, 2.74, -0.02);
  const browVisor = new THREE.Mesh(
    new THREE.SphereGeometry(0.62, 24, 16),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.42 })
  );
  browVisor.scale.set(1.12, 0.36, 0.55);
  browVisor.position.set(0, 2.72, -0.48);

  const antClone = sharedAntennaGroup.clone();
  antClone.position.set(0, 3.2, 0);
  targetGroup.add(haloCrown, browVisor, antClone);
  headPartsList.push(haloCrown, browVisor, antClone);

  if (includeSharedBlaster) {
    targetGroup.add(sharedBlasterGroup);
    targetGroup.add(playerAegisAuraGroup);
    playerAegisAuraGroup.visible = state.aegisShields > 0;
  } else {
    const previewBlaster = sharedBlasterGroup.clone();
    previewBlaster.position.set(0.82, 1.32, -0.55);
    targetGroup.add(previewBlaster);
  }

  targetGroup.userData.headParts = headPartsList;
}

function buildPlayerModel() {
  populateRangerGroup(player, true);
}

// =========================================================================
// 7. SETUP CHARACTER CUSTOMIZATION & 360° PREVIEW STUDIO
// =========================================================================
function setupCharacterCustomization() {
  const palette = document.getElementById('skin-tone-palette');
  SKIN_TONES.forEach((tone) => {
    const block = document.createElement('button');
    block.type = 'button';
    block.className = `char-tone-block swatch-btn w-full aspect-square rounded-xl border-2 border-white/50 ${tone === state.character.skinTone ? 'active' : ''}`;
    block.style.backgroundColor = tone;
    block.onclick = () => {
      state.character.skinTone = tone;
      document.querySelectorAll('.char-tone-block').forEach(b => b.classList.remove('active'));
      block.classList.add('active');
      sfx.playUI(1.1);
      buildPlayerModel();
      updateAvatarPreviewModel();
    };
    palette.appendChild(block);
  });

  const shirtPalette = document.getElementById('shirt-color-palette');
  PASTEL_DRESS_SWATCHES.forEach((col) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `swatch-btn w-full aspect-square rounded-xl border-2 border-white/50 ${state.character.shirtColors.includes(col) ? 'active' : ''}`;
    btn.style.backgroundColor = col;
    btn.onclick = () => {
      const idx = state.character.shirtColors.indexOf(col);
      if (idx >= 0) {
        if (state.character.shirtColors.length > 1) {
          state.character.shirtColors.splice(idx, 1);
          btn.classList.remove('active');
        }
      } else {
        if (state.character.shirtColors.length >= 2) {
          state.character.shirtColors.shift();
        }
        state.character.shirtColors.push(col);
        btn.classList.add('active');
      }
      document.querySelectorAll('#shirt-color-palette .swatch-btn').forEach(b => {
        const hex = rgbToHex(b.style.backgroundColor);
        b.classList.toggle('active', state.character.shirtColors.includes(hex));
      });
      document.getElementById('shirt-shade-mode-label').textContent = `${state.character.shirtColors.length} Shade${state.character.shirtColors.length > 1 ? 's' : ''}`;
      sfx.playUI(1.15);
      buildPlayerModel();
      updateAvatarPreviewModel();
    };
    shirtPalette.appendChild(btn);
  });

  const pantPalette = document.getElementById('pant-color-palette');
  PASTEL_DRESS_SWATCHES.forEach((col) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `swatch-btn w-full aspect-square rounded-xl border-2 border-white/50 ${col === state.character.pantColor ? 'active' : ''}`;
    btn.style.backgroundColor = col;
    btn.onclick = () => {
      state.character.pantColor = col;
      document.querySelectorAll('#pant-color-palette .swatch-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      sfx.playUI(1.1);
      buildPlayerModel();
      updateAvatarPreviewModel();
    };
    pantPalette.appendChild(btn);
  });

  const enemyPalette = document.getElementById('enemy-dress-palette');
  ENEMY_DRESS_PRESETS.forEach((preset, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `swatch-btn w-full aspect-square rounded-xl border-2 border-white/50 ${idx === 0 ? 'active' : ''}`;
    btn.style.backgroundColor = '#' + preset.primary.toString(16).padStart(6, '0');
    btn.onclick = () => {
      state.enemyDressIndex = idx;
      document.querySelectorAll('#enemy-dress-palette .swatch-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('enemy-dress-name').textContent = preset.name;
      sfx.playUI(1.1);
      enemies.forEach(en => {
        const pos = en.mesh.position.clone();
        const type = en.type;
        scene.remove(en.mesh);
        en.mesh = buildEnemyMesh(type);
        en.mesh.position.copy(pos);
        scene.add(en.mesh);
      });
    };
    enemyPalette.appendChild(btn);
  });

  const femaleBtn = document.getElementById('char-gender-female');
  const maleBtn = document.getElementById('char-gender-male');
  femaleBtn.onclick = () => {
    state.character.gender = 'female';
    femaleBtn.classList.add('active');
    maleBtn.classList.remove('active');
    sfx.playUI(1.1);
    buildPlayerModel();
    updateAvatarPreviewModel();
  };
  maleBtn.onclick = () => {
    state.character.gender = 'male';
    maleBtn.classList.add('active');
    femaleBtn.classList.remove('active');
    if (state.character.outfit === 1) {
      state.character.outfit = 0;
      document.getElementById('char-outfit-select').value = '0';
    }
    sfx.playUI(1.1);
    buildPlayerModel();
    updateAvatarPreviewModel();
  };

  const outfitSelect = document.getElementById('char-outfit-select');
  outfitSelect.onchange = (e) => {
    const val = parseInt(e.target.value);
    if (state.character.gender === 'male' && val === 1) {
      showToast('⚠️ Frock outfit is exclusive to Female Rangers');
      outfitSelect.value = '0';
      return;
    }
    state.character.outfit = val;
    sfx.playUI(1.1);
    buildPlayerModel();
    updateAvatarPreviewModel();
  };
}

function rgbToHex(rgbStr) {
  if (!rgbStr.startsWith('rgb')) return rgbStr;
  const rgb = rgbStr.match(/\d+/g).map(Number);
  return '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
}

// 360° Preview Room Setup
const previewContainer = document.getElementById('avatar-preview-container');
const previewCanvas = document.getElementById('avatar-preview-canvas');
if (previewContainer) previewContainer.style.touchAction = 'none';
if (previewCanvas) previewCanvas.style.touchAction = 'none';

const previewRenderer = new THREE.WebGLRenderer({ canvas: previewCanvas, antialias: state.graphicsMode === 'hd', alpha: true });
previewRenderer.setPixelRatio(state.graphicsMode === 'ld' ? 1.0 : Math.min(window.devicePixelRatio || 1, 2));
previewRenderer.shadowMap.enabled = state.graphicsMode === 'hd';
previewRenderer.toneMapping = THREE.ACESFilmicToneMapping;
previewRenderer.toneMappingExposure = 0.92;

const previewScene = new THREE.Scene();
const previewCamera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
previewCamera.position.set(0, 2.05, 5.4);
previewCamera.lookAt(0, 1.45, 0);

const previewKeyLight = new THREE.DirectionalLight(0xffffff, 0.78);
previewKeyLight.position.set(4, 7, 6);
const previewFillLight = new THREE.DirectionalLight(0xffd6a5, 0.35);
previewFillLight.position.set(-5, 4, 5);
const previewRimLight = new THREE.DirectionalLight(0x9bf6ff, 0.45);
previewRimLight.position.set(0, 5, -6);
previewScene.add(previewKeyLight, previewFillLight, previewRimLight, new THREE.AmbientLight(0xffffff, 0.52));

// Studio Turntable Pedestal
const previewPedestalGroup = new THREE.Group();
const pedestalDisc = new THREE.Mesh(
  new THREE.CylinderGeometry(1.35, 1.5, 0.18, 36),
  new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.25 })
);
pedestalDisc.position.y = -0.09;
const pedestalGlowRim = new THREE.Mesh(
  new THREE.TorusGeometry(1.42, 0.045, 14, 48),
  new THREE.MeshBasicMaterial({ color: 0xff758f })
);
pedestalGlowRim.rotation.x = Math.PI / 2;
pedestalGlowRim.position.y = 0.01;
previewPedestalGroup.add(pedestalDisc, pedestalGlowRim);
previewPedestalGroup.position.set(0, -0.25, 0);
previewScene.add(previewPedestalGroup);

const previewRangerGroup = new THREE.Group();
previewScene.add(previewRangerGroup);

function resizeAvatarPreview() {
  const w = previewContainer.clientWidth || 280;
  const h = previewContainer.clientHeight || 240;
  previewCamera.aspect = w / h;
  previewCamera.updateProjectionMatrix();
  previewRenderer.setSize(w, h, false);
}

function updateAvatarPreviewModel() {
  populateRangerGroup(previewRangerGroup, false);
  previewRangerGroup.position.set(0, -0.25, 0);
  previewRangerGroup.rotation.y = avatarRotationY;
  resizeAvatarPreview();
}

let isDraggingAvatar = false;
let prevMouseX = 0;
let avatarRotationY = Math.PI + 0.35;
let autoSpinAvatar = true;

previewContainer.addEventListener('pointerdown', (e) => {
  if (e.target.closest('#avatar-autospin-btn')) return;
  isDraggingAvatar = true;
  prevMouseX = e.clientX;
  autoSpinAvatar = false;
  document.getElementById('avatar-autospin-btn').textContent = '🔄 Auto-Spin: OFF';
});
window.addEventListener('pointermove', (e) => {
  if (!isDraggingAvatar) return;
  const deltaX = e.clientX - prevMouseX;
  prevMouseX = e.clientX;
  avatarRotationY += deltaX * 0.015;
  previewRangerGroup.rotation.y = avatarRotationY;
  previewPedestalGroup.rotation.y = avatarRotationY;
});
window.addEventListener('pointerup', () => { isDraggingAvatar = false; });

// Explicit Touch Listeners for 360° Studio Preview so mobile LD/HD touch rotation works seamlessly
previewContainer.addEventListener('touchstart', (e) => {
  if (e.target.closest('#avatar-autospin-btn')) return;
  if (e.touches.length > 0) {
    isDraggingAvatar = true;
    prevMouseX = e.touches[0].clientX;
    autoSpinAvatar = false;
    document.getElementById('avatar-autospin-btn').textContent = '🔄 Auto-Spin: OFF';
  }
}, { passive: true });
previewContainer.addEventListener('touchmove', (e) => {
  if (!isDraggingAvatar || e.touches.length === 0) return;
  const deltaX = e.touches[0].clientX - prevMouseX;
  prevMouseX = e.touches[0].clientX;
  avatarRotationY += deltaX * 0.015;
  previewRangerGroup.rotation.y = avatarRotationY;
  previewPedestalGroup.rotation.y = avatarRotationY;
}, { passive: true });
window.addEventListener('touchend', () => { isDraggingAvatar = false; }, { passive: true });

document.getElementById('avatar-autospin-btn').addEventListener('click', () => {
  autoSpinAvatar = !autoSpinAvatar;
  document.getElementById('avatar-autospin-btn').textContent = `🔄 Auto-Spin: ${autoSpinAvatar ? 'ON' : 'OFF'}`;
  sfx.playUI(1.1);
});

// =========================================================================
// 8. ENTITIES, PICKUPS (FRUIT, AMMO, CREDIT DIAMONDS, SPECIAL SHIELDS) & ENEMIES
// =========================================================================
const enemies = []; const projectiles = []; const pickups = []; const particles = []; const shockwaves = [];
const sharedVoxelGeo = new THREE.BoxGeometry(1, 1, 1);
const sharedShockwaveGeo = new THREE.RingGeometry(0.38, 0.65, 32); sharedShockwaveGeo.rotateX(-Math.PI / 2);

function buildEnemyMesh(type) {
  const group = new THREE.Group();
  const dressPreset = ENEMY_DRESS_PRESETS[state.enemyDressIndex];
  const primaryMat = new THREE.MeshStandardMaterial({ color: dressPreset.primary, roughness: 0.35 });
  const secondaryMat = new THREE.MeshStandardMaterial({ color: dressPreset.secondary, roughness: 0.4 });
  const accentMat = new THREE.MeshStandardMaterial({ color: dressPreset.accent, roughness: 0.25 });
  const castShad = state.graphicsMode === 'hd';

  if (type === 'Zombies') {
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.9, 20), secondaryMat); base.position.y = 0.45; base.castShadow = castShad; group.add(base);
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.58, 1.1, 20), primaryMat); torso.position.y = 1.35; torso.castShadow = castShad; group.add(torso);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.72, 24, 24), new THREE.MeshStandardMaterial({ color: 0x95d5b2, roughness: 0.4 })); head.position.y = 2.45; head.castShadow = castShad; group.add(head);
    const eyeGeo = new THREE.SphereGeometry(0.13, 12, 12); const eyeMat = new THREE.MeshBasicMaterial({ color: dressPreset.accent });
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat); leftEye.position.set(-0.24, 2.52, 0.62); const rightEye = new THREE.Mesh(eyeGeo, eyeMat); rightEye.position.set(0.24, 2.52, 0.62); group.add(leftEye, rightEye);
  } else if (type === 'Alien Ships') {
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.75, 0.42, 28), primaryMat); disc.position.y = 1.85; disc.castShadow = castShad; group.add(disc);
    const glowRim = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.12, 16, 36), accentMat); glowRim.rotation.x = Math.PI / 2; glowRim.position.y = 1.82; group.add(glowRim);
    const glassDome = new THREE.Mesh(new THREE.SphereGeometry(0.95, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xcaffbf, roughness: 0.15, transparent: true, opacity: 0.85 })); glassDome.position.y = 2.02; group.add(glassDome);
  } else if (type === 'Skeletons') {
    const ribcage = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.1, 0.5), primaryMat); ribcage.position.y = 1.4; ribcage.castShadow = castShad; group.add(ribcage);
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.6, 20, 20), secondaryMat); skull.position.y = 2.4; group.add(skull);
    const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.2, 0.4), accentMat); jaw.position.set(0, 2.05, 0.25); group.add(jaw);
  } else if (type === 'Ghosts') {
    const cloak = new THREE.Mesh(new THREE.ConeGeometry(0.9, 2.2, 20), primaryMat); cloak.position.y = 1.2; cloak.castShadow = castShad; group.add(cloak);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.65, 20, 20), accentMat); head.position.y = 2.1; group.add(head);
  } else {
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 1), accentMat); core.position.y = 1.6; core.castShadow = castShad; group.add(core);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.08, 16, 32), primaryMat); ring.rotation.x = Math.PI / 3; ring.position.y = 1.6; group.add(ring);
  }
  return group;
}

function spawnEnemy() {
  const activeList = state.selectedEnemies.length > 0 ? state.selectedEnemies : ENEMY_TYPES;
  const currentType = activeList[Math.floor(Math.random() * activeList.length)];
  const mesh = buildEnemyMesh(currentType);
  const xPos = (Math.random() - 0.5) * (BOUNDARY_X * 1.78);
  mesh.position.set(xPos, 0, SPAWN_Z);
  scene.add(mesh);
  enemies.push({ mesh, type: currentType, baseSpeed: 10.5 + Math.random() * 4.5, seed: Math.random() * 10 });
}

// Helper to place pickups side-by-side on the lane without overlapping each other or the player
function getNonOverlappingPickupPosition(preferredX = null) {
  const isSwivel = CAMERA_MODES[state.cameraModeIndex] && CAMERA_MODES[state.cameraModeIndex].isFixedSwivel;
  if (isSwivel) {
    const angleSpread = (Math.random() - 0.5) * 1.15;
    const dist = 7.5 + Math.random() * 5.5;
    const rawX = preferredX !== null ? preferredX : (player.position.x - Math.sin(angleSpread) * dist);
    const spawnX = THREE.MathUtils.clamp(rawX, -BOUNDARY_X + 1.5, BOUNDARY_X - 1.5);
    const spawnZ = PLAYER_Z - Math.cos(angleSpread) * dist;
    return new THREE.Vector3(spawnX, 0.35, spawnZ);
  }

  let candidateX = preferredX !== null ? preferredX : (Math.random() - 0.5) * (BOUNDARY_X * 1.6);
  candidateX = THREE.MathUtils.clamp(candidateX, -BOUNDARY_X + 1.8, BOUNDARY_X - 1.8);

  // Keep a clear gap from the player and from other active pickups on the lane
  for (let attempt = 0; attempt < 14; attempt++) {
    const tooCloseToPlayer = Math.abs(candidateX - player.position.x) < 2.8;
    const tooCloseToPickup = pickups.some(p => p.mesh && Math.abs(p.mesh.position.x - candidateX) < 2.4);
    if (!tooCloseToPlayer && !tooCloseToPickup) break;
    candidateX = (Math.random() - 0.5) * (BOUNDARY_X * 1.65);
  }
  return new THREE.Vector3(THREE.MathUtils.clamp(candidateX, -BOUNDARY_X + 1.8, BOUNDARY_X - 1.8), 0, PLAYER_Z);
}

// Spawn Healing Fruit / Apple + automatically spawn Diamond & Special Shield alongside it
function spawnFruit(spawnAlongsideItems = true) {
  const fruitGroup = new THREE.Group();
  const berry = new THREE.Mesh(
    new THREE.SphereGeometry(0.65, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0xff758f, roughness: 0.25 })
  );
  berry.position.y = 0.95;
  berry.castShadow = state.graphicsMode === 'hd';

  const leaf = new THREE.Mesh(
    new THREE.ConeGeometry(0.28, 0.5, 12),
    new THREE.MeshStandardMaterial({ color: 0x95d5b2, roughness: 0.4 })
  );
  leaf.position.set(0.12, 1.65, 0);
  leaf.rotation.z = -0.4;

  const aura = new THREE.Mesh(
    new THREE.TorusGeometry(0.85, 0.06, 12, 32),
    new THREE.MeshBasicMaterial({ color: 0xffd6a5 })
  );
  aura.rotation.x = Math.PI / 2;
  aura.position.y = 0.2;

  fruitGroup.add(berry, leaf, aura);

  const pos = getNonOverlappingPickupPosition();
  fruitGroup.position.copy(pos);
  scene.add(fruitGroup);
  pickups.push({ mesh: fruitGroup, kind: 'fruit' });

  // Spawn Credit Diamond & Special Aegis Shield directly alongside the Fruit/Apple
  if (spawnAlongsideItems) {
    if (pickups.filter(p => p.kind === 'diamond').length < 3) {
      spawnDiamondOrb(pos.x + 3.2);
    }
    if (pickups.filter(p => p.kind === 'shield').length < 2) {
      spawnSpecialShieldDrop(pos.x - 3.2);
    }
  }
}

// Spawn Blaster Ammo Capsule + companion Diamond/Shield alongside it when lane has room
function spawnAmmoPack(spawnAlongsideItems = false) {
  const ammoGroup = new THREE.Group();
  const core = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.45, 1.1, 20),
    new THREE.MeshStandardMaterial({ color: 0xfdffb6, roughness: 0.2, metalness: 0.3 })
  );
  core.position.y = 0.95;

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.65, 0.07, 12, 28),
    new THREE.MeshBasicMaterial({ color: 0x9bf6ff })
  );
  ring.position.y = 0.95;
  ammoGroup.add(core, ring);

  const pos = getNonOverlappingPickupPosition();
  ammoGroup.position.copy(pos);
  scene.add(ammoGroup);
  pickups.push({ mesh: ammoGroup, kind: 'ammo' });

  if (spawnAlongsideItems) {
    if (pickups.filter(p => p.kind === 'diamond').length < 3) {
      spawnDiamondOrb(pos.x + 3.0);
    }
    if (pickups.filter(p => p.kind === 'shield').length < 2) {
      spawnSpecialShieldDrop(pos.x - 3.0);
    }
  }
}

// Spawn Credit Orbs / Diamonds (💎) — Stored persistently across games & used to Revive on death
function spawnDiamondOrb(preferredX = null) {
  const diamondGroup = new THREE.Group();
  const crystalMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.55,
    roughness: 0.12,
    metalness: 0.65
  });
  const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.72, 0), crystalMat);
  gem.position.y = 1.05;
  gem.scale.set(0.95, 1.3, 0.95);

  const innerOrb = new THREE.Mesh(
    new THREE.SphereGeometry(0.34, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0xe0f2fe })
  );
  innerOrb.position.y = 1.05;

  const haloRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.86, 0.065, 10, 28),
    new THREE.MeshBasicMaterial({ color: 0x7dd3fc })
  );
  haloRing.rotation.x = Math.PI / 2;
  haloRing.position.y = 0.22;

  diamondGroup.add(gem, innerOrb, haloRing);

  const pos = getNonOverlappingPickupPosition(preferredX);
  diamondGroup.position.copy(pos);
  scene.add(diamondGroup);
  pickups.push({ mesh: diamondGroup, kind: 'diamond' });
}

// Spawn Special Accident-Prevention Aegis Shield Drop (🛡️)
function spawnSpecialShieldDrop(preferredX = null) {
  const shieldGroup = new THREE.Group();
  const coreShield = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.66, 1),
    new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.5,
      roughness: 0.18,
      metalness: 0.5
    })
  );
  coreShield.position.y = 1.05;

  const outerRing1 = new THREE.Mesh(
    new THREE.TorusGeometry(0.9, 0.075, 12, 28),
    new THREE.MeshBasicMaterial({ color: 0x6ee7b7 })
  );
  outerRing1.position.y = 1.05;

  const outerRing2 = new THREE.Mesh(
    new THREE.TorusGeometry(0.9, 0.055, 12, 28),
    new THREE.MeshBasicMaterial({ color: 0xfef08a })
  );
  outerRing2.rotation.x = Math.PI / 2;
  outerRing2.position.y = 0.22;

  shieldGroup.add(coreShield, outerRing1, outerRing2);

  const pos = getNonOverlappingPickupPosition(preferredX);
  shieldGroup.position.copy(pos);
  scene.add(shieldGroup);
  pickups.push({ mesh: shieldGroup, kind: 'shield' });
}

// Spawn all 4 collectibles (Fruit/Apple, Ammo, Diamond Orb, and Special Shield) side-by-side on the lane
function spawnAllPickupsAlongside() {
  if (pickups.filter(p => p.kind === 'fruit').length < 2) spawnFruit(false);
  if (pickups.filter(p => p.kind === 'ammo').length < 2) spawnAmmoPack(false);
  if (pickups.filter(p => p.kind === 'diamond').length < 2) spawnDiamondOrb();
  if (pickups.filter(p => p.kind === 'shield').length < 2) spawnSpecialShieldDrop();
}

function persistVaultCurrencies() {
  try {
    localStorage.setItem('novashot_diamonds_bank', String(state.diamondsBank));
    localStorage.setItem('novashot_shields_bank', String(state.aegisShields));
  } catch (err) {
    console.warn('Unable to persist vault currencies:', err);
  }
}

function spawnVoxelExplosion(pos, palette, count = 25, withShockwave = true) {
  const colorList = Array.isArray(palette) ? palette : [palette];
  const effectiveCount = state.graphicsMode === 'ld' ? Math.max(6, Math.round(count * 0.38)) : count;
  const castShad = state.graphicsMode === 'hd';
  for (let i = 0; i < effectiveCount; i++) {
    const chosenColor = colorList[Math.floor(Math.random() * colorList.length)];
    const size = 0.24 + Math.random() * 0.28;
    const voxelMat = new THREE.MeshStandardMaterial({ color: chosenColor, roughness: 0.35, metalness: 0.1 });
    const voxel = new THREE.Mesh(sharedVoxelGeo, voxelMat);
    voxel.scale.setScalar(size); voxel.position.set(pos.x + (Math.random() - 0.5) * 0.9, Math.max(0.4, pos.y + 0.9 + (Math.random() - 0.5) * 0.8), pos.z + (Math.random() - 0.5) * 0.9); voxel.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI); voxel.castShadow = castShad; scene.add(voxel);
    const angle = Math.random() * Math.PI * 2; const horizSpeed = 3.5 + Math.random() * 9.5;
    particles.push({ mesh: voxel, baseSize: size, vel: new THREE.Vector3(Math.cos(angle) * horizSpeed, 4.5 + Math.random() * 8.5, Math.sin(angle) * horizSpeed), rotVel: new THREE.Vector3((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14), life: 1.0, decay: 0.75 + Math.random() * 0.45 });
  }
  if (withShockwave) {
    const ringMat = new THREE.MeshBasicMaterial({ color: colorList[0], side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
    const ring = new THREE.Mesh(sharedShockwaveGeo, ringMat); ring.position.set(pos.x, Math.max(0.12, pos.y + 0.35), pos.z); scene.add(ring);
    shockwaves.push({ mesh: ring, life: 1.0 });
  }
}

function spawnPastelBurst(pos, paletteOrHex, count = 14) {
  const palette = Array.isArray(paletteOrHex) ? paletteOrHex : [paletteOrHex, 0xffffff, 0xfdffb6];
  spawnVoxelExplosion(pos, palette, count, false);
}

function shootBullet() {
  if (!state.gameStarted || state.isPaused || state.isDead || state.isCountingDown) return;
  const now = performance.now();
  if (now - state.lastShotTime < 145) return;
  if (state.ammo <= 0) { sfx.playUI(0.65); showToast('⚡ Out of Energy! Touch Lemon Capsules on Your Lane'); return; }
  state.lastShotTime = now; state.ammo--; state.bulletsFired++; sfx.playShoot();
  sharedBlasterGroup.position.z = -0.3;

  const yaw = player.rotation.y;
  const localMuzzle = new THREE.Vector3(0.82, 1.32, -1.5).applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
  const spawnPos = new THREE.Vector3(
    player.position.x + localMuzzle.x,
    1.32,
    player.position.z + localMuzzle.z
  );
  const speed = 62;
  const vel = new THREE.Vector3(-Math.sin(yaw) * speed, 0, -Math.cos(yaw) * speed);

  const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 2.1, 12), new THREE.MeshBasicMaterial({ color: 0xfdffb6 }));
  bolt.rotation.order = 'YXZ';
  bolt.rotation.y = yaw;
  bolt.rotation.x = Math.PI / 2;
  bolt.position.copy(spawnPos);
  bolt.userData.vel = vel;
  scene.add(bolt);
  projectiles.push(bolt);

  // Pulse the HUD aim pointer on shot
  const hudPointer = document.getElementById('bullet-aim-pointer');
  if (hudPointer) {
    hudPointer.style.transform += ' scale(1.32)';
    setTimeout(() => {
      hudPointer.style.transform = hudPointer.style.transform.replace(' scale(1.32)', '');
    }, 95);
  }

  recalcScore(); updateHUD();
}

// =========================================================================
// 9. SMOOTH THEME TRANSITION, GRAPHICS ENGINE, HIDE/UNHIDE & CAPSULE
// =========================================================================
let themeCurtainTimer = null;
function triggerUpperLeftToLowerRightTransition(targetTheme) {
  if (targetTheme !== 'dark' && targetTheme !== 'light') return;
  if (state.uiTheme === targetTheme) return;

  const curtain = document.getElementById('smooth-theme-curtain');
  if (curtain) {
    curtain.classList.remove('sweep-to-dark', 'sweep-to-light');
    void curtain.offsetWidth;
    curtain.classList.add(targetTheme === 'dark' ? 'sweep-to-dark' : 'sweep-to-light');
    clearTimeout(themeCurtainTimer);
    themeCurtainTimer = setTimeout(() => {
      curtain.classList.remove('sweep-to-dark', 'sweep-to-light');
    }, 500);
  }

  requestAnimationFrame(() => {
    document.body.classList.toggle('theme-dark', targetTheme === 'dark');
    document.body.classList.toggle('theme-light', targetTheme === 'light');
    state.uiTheme = targetTheme;
    document.getElementById('hud-theme-label').textContent = targetTheme === 'dark' ? 'Dark' : 'White';
    document.getElementById('init-theme-text').textContent = targetTheme === 'dark' ? 'Dark UI' : 'White UI';
    document.getElementById('init-theme-icon').textContent = targetTheme === 'dark' ? '🌙' : '☀️';

    document.querySelectorAll('.step2-theme-btn, .pause-theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === targetTheme);
    });
  });

  sfx.playUI(1.2);
}

// Switch between High Definition (HD) & Low Definition (2GB RAM Smooth Mode)
function applyGraphicsDefinitionMode(mode, announce = true) {
  const target = mode === 'ld' ? 'ld' : 'hd';
  state.graphicsMode = target;
  document.body.classList.toggle('gfx-ld', target === 'ld');
  document.body.classList.toggle('gfx-hd', target === 'hd');
  document.body.dataset.gfxMode = target;

  try {
    localStorage.setItem('novashot_gfx_mode', target);
  } catch (e) {}

  const dpr = target === 'ld' ? 1.0 : Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.shadowMap.enabled = target === 'hd';
  dirLight.castShadow = target === 'hd';
  previewRenderer.setPixelRatio(dpr);

  // Sync Initiation Screen & HUD & Pause UI Indicators (without touching device selection!)
  const hdBtn = document.getElementById('select-hd-btn');
  const ldBtn = document.getElementById('select-ld-btn');
  const badge = document.getElementById('gfx-selected-badge');
  const hdCheck = document.getElementById('hd-check-indicator');
  const ldCheck = document.getElementById('ld-check-indicator');
  const quickIcon = document.getElementById('init-gfx-pill-icon');
  const quickText = document.getElementById('init-gfx-pill-text');
  const hudGfxLabel = document.getElementById('hud-gfx-label');
  const deskGfxUi = document.getElementById('desk-gfx-ui');

  if (hdBtn && ldBtn) {
    hdBtn.classList.toggle('selected-device', target === 'hd');
    ldBtn.classList.toggle('selected-device', target === 'ld');
  }
  if (badge) {
    badge.textContent = target === 'hd' ? '✨ High Definition Active' : '⚡ Low Definition (2GB RAM Smooth)';
  }
  if (hdCheck) hdCheck.textContent = target === 'hd' ? '● Selected' : '○ Choose Mode';
  if (ldCheck) ldCheck.textContent = target === 'ld' ? '● Selected' : '○ Choose Mode';
  if (quickIcon) quickIcon.textContent = target === 'hd' ? '✨' : '⚡';
  if (quickText) quickText.textContent = target === 'hd' ? 'HD Mode' : 'LD Smooth';
  if (hudGfxLabel) hudGfxLabel.textContent = target === 'hd' ? 'HD' : 'LD';
  if (deskGfxUi) deskGfxUi.textContent = target === 'hd' ? 'HD' : 'LD';

  document.querySelectorAll('.pause-gfx-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.gfx === target);
  });

  // Preserve active device mode UI highlights
  const touchBtn = document.getElementById('select-touch-btn');
  const deskBtn = document.getElementById('select-desktop-btn');
  if (touchBtn && deskBtn) {
    touchBtn.classList.toggle('selected-device', state.deviceMode === 'touch');
    deskBtn.classList.toggle('selected-device', state.deviceMode === 'desktop');
  }

  rebuildBiomeScenery(BIOMES[state.biomeIndex]);
  syncViewportDimensions();

  if (announce) {
    sfx.playUI(target === 'hd' ? 1.2 : 1.05);
    showToast(target === 'hd'
      ? '✨ High Definition (HD) Mode Enabled!'
      : '⚡ Low Definition (2GB RAM Smooth Mode) Enabled!');
  }
}

let toastTimer = null;
function showToast(msg) {
  const toastEl = document.getElementById('toast-text');
  const capsule = document.getElementById('top-unified-capsule');
  const toastSeg = document.getElementById('toast-segment');
  const divider = document.getElementById('capsule-divider');
  const row = document.getElementById('top-announcement-row');

  toastEl.textContent = msg;
  row.classList.add('row-active');
  capsule.classList.add('capsule-visible');
  toastSeg.classList.add('toast-active');
  const hiddenCount = document.querySelectorAll('.ui-hidden-panel').length;
  if (hiddenCount > 0) {
    divider.classList.add('divider-active');
    document.getElementById('unhide-segment').classList.add('unhide-active');
  }

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastSeg.classList.remove('toast-active');
    divider.classList.remove('divider-active');
    const count = document.querySelectorAll('.ui-hidden-panel').length;
    if (count === 0) {
      capsule.classList.remove('capsule-visible');
      row.classList.remove('row-active');
    } else {
      document.getElementById('unhide-segment').classList.remove('unhide-active');
    }
  }, 2600);
}

function updateUnhideAllButtonState() {
  const hiddenPanels = document.querySelectorAll('.ui-hidden-panel');
  const count = hiddenPanels.length;
  const badge = document.getElementById('hidden-ui-count-badge');
  badge.textContent = count;

  const capsule = document.getElementById('top-unified-capsule');
  const unhideSeg = document.getElementById('unhide-segment');
  const row = document.getElementById('top-announcement-row');

  if (count > 0) {
    row.classList.add('row-active');
    capsule.classList.add('capsule-visible');
    unhideSeg.classList.add('unhide-active');
  } else {
    unhideSeg.classList.remove('unhide-active');
    if (!document.getElementById('toast-segment').classList.contains('toast-active')) {
      capsule.classList.remove('capsule-visible');
      row.classList.remove('row-active');
    }
  }
  updateTopHudAlignment();
}

function hideUiPanel(targetId) {
  const el = document.getElementById(targetId);
  if (el) {
    el.classList.add('ui-hidden-panel');
    sfx.playUI(0.85);
    updateUnhideAllButtonState();
    syncNonOverlappingUiScale();
  }
}

function unhideAllUiPanels() {
  document.querySelectorAll('.ui-hidden-panel').forEach(el => {
    el.classList.remove('ui-hidden-panel');
  });
  sfx.playUI(1.25);
  updateUnhideAllButtonState();
  syncNonOverlappingUiScale();
  showToast('👁️ All UI Panels Restored Successfully!');
}

function updateTopHudAlignment() {
  const brandHidden = document.getElementById('hud-brand-card').classList.contains('ui-hidden-panel');
  const healthHidden = document.getElementById('hud-health-card').classList.contains('ui-hidden-panel');
  const scoreHidden = document.getElementById('hud-score-card').classList.contains('ui-hidden-panel');

  const uppermostRow = document.getElementById('hud-uppermost-row');
  const leftSpacer = document.getElementById('lr-spacer-left');
  const midSpacer = document.getElementById('lr-spacer-middle');
  const rightSpacer = document.getElementById('lr-spacer-right');
  const topBar = document.getElementById('hud-top-bar');

  if (brandHidden) uppermostRow.classList.add('uppermost-row-collapsed');
  else uppermostRow.classList.remove('uppermost-row-collapsed');

  if (brandHidden && healthHidden && scoreHidden) {
    topBar.classList.add('all-top-hidden');
  } else {
    topBar.classList.remove('all-top-hidden');
  }

  if (brandHidden) {
    if (healthHidden && !scoreHidden) {
      leftSpacer.style.flexGrow = '1';
      midSpacer.style.flexGrow = '0';
      rightSpacer.style.flexGrow = '1';
    } else if (!healthHidden && scoreHidden) {
      leftSpacer.style.flexGrow = '1';
      midSpacer.style.flexGrow = '0';
      rightSpacer.style.flexGrow = '1';
    } else if (healthHidden && scoreHidden) {
      leftSpacer.style.flexGrow = '0';
      midSpacer.style.flexGrow = '1';
      rightSpacer.style.flexGrow = '0';
    } else {
      leftSpacer.style.flexGrow = '0';
      midSpacer.style.flexGrow = '1';
      rightSpacer.style.flexGrow = '0';
    }
  } else {
    leftSpacer.style.flexGrow = '0';
    midSpacer.style.flexGrow = '1';
    rightSpacer.style.flexGrow = '0';
  }
}

// =========================================================================
// 10. GAMEPLAY HELPERS, SCORE, ACCIDENT SHIELD, REVIVE & PAUSE MODALS
// =========================================================================
function adjustEnemySpeed(delta) {
  state.enemySpeedMult = Math.max(0.3, Math.min(3.5, +(state.enemySpeedMult + delta).toFixed(1)));
  sfx.playUI(delta > 0 ? 1.15 : 0.85); updateHUD(); showToast(`👾 Enemy Speed: ${state.enemySpeedMult.toFixed(1)}x`);
}
function adjustCycleSpeed(delta) {
  state.cycleSpeedMult = Math.max(0.25, Math.min(5.0, +(state.cycleSpeedMult + delta).toFixed(2)));
  sfx.playUI(delta > 0 ? 1.2 : 0.8); updateHUD(); showToast(`☀️ Sky Cycle Speed: ${state.cycleSpeedMult.toFixed(2)}x`);
}
function toggleBiome() {
  state.biomeIndex = (state.biomeIndex + 1) % BIOMES.length; applyBiome(state.biomeIndex);
}
function togglePhaseMode() {
  const modes = ['dynamic', 'forcedDay', 'forcedNight'];
  const labels = ['Dynamic', 'Forced Day', 'Forced Night'];
  let idx = (modes.indexOf(state.skyPhaseMode) + 1) % modes.length;
  state.skyPhaseMode = modes[idx];
  document.getElementById('cycle-mode-label').textContent = labels[idx];
  sfx.playUI(1.1); showToast(`☀️ Sky Phase: ${labels[idx]}`);
}
function setCameraMode(idx) {
  state.cameraModeIndex = idx;
  const modeObj = CAMERA_MODES[state.cameraModeIndex];
  const modeName = modeObj.name;
  if (modeObj.isFixedSwivel) {
    state.fixedPlayerInvokeX = player.position.x;
    state.fixedCamInvokePos.set(
      player.position.x,
      Math.max(3.8, camera.position.y * 0.65),
      player.position.z + 4.8
    );
    state.aimYaw = player.rotation.y;
    state.swivelCoreTimer = state.swivelCoreMax;
    state.swivelWarned = false;
  } else {
    state.aimYaw = 0;
    player.rotation.y = 0;
  }

  const swivelBar = document.getElementById('swivel-core-bar-wrap');
  const touchReloadBtn = document.getElementById('touch-reload-btn');
  const deskRBtn = document.getElementById('desk-r-btn');
  if (swivelBar) {
    swivelBar.classList.toggle('hidden', !modeObj.isFixedSwivel);
    swivelBar.classList.toggle('flex', !!modeObj.isFixedSwivel);
  }
  if (touchReloadBtn) {
    touchReloadBtn.classList.toggle('hidden', !modeObj.isFixedSwivel);
    touchReloadBtn.classList.toggle('flex', !!modeObj.isFixedSwivel);
  }
  if (deskRBtn) {
    deskRBtn.classList.toggle('hidden', !modeObj.isFixedSwivel);
    deskRBtn.classList.toggle('flex', !!modeObj.isFixedSwivel);
  }

  document.getElementById('hud-cam-label').textContent = modeName;
  document.getElementById('touch-cam-label').textContent = modeName;
  document.querySelectorAll('.step2-cam-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
  document.querySelectorAll('.pause-cam-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
  sfx.playUI(1.15);
  syncNonOverlappingUiScale();
  showToast(modeObj.isFixedSwivel ? `🎥 ${modeName}: Press R / 🔄 Reload before 15s Core Timer expires!` : `🎥 Camera: ${modeName}`);
}
function cycleCameraMode() {
  const nextIdx = (state.cameraModeIndex + 1) % CAMERA_MODES.length;
  setCameraMode(nextIdx);
}

function updateSwivelCoreUI() {
  const timerTxt = document.getElementById('swivel-core-timer-txt');
  const fillEl = document.getElementById('swivel-core-fill');
  const deskReloadUi = document.getElementById('desk-reload-ui');
  const touchReloadLbl = document.getElementById('touch-reload-label');
  const touchReloadBtn = document.getElementById('touch-reload-btn');

  const secStr = `${Math.max(0, state.swivelCoreTimer).toFixed(1)}s`;
  const pct = Math.max(0, Math.min(100, (state.swivelCoreTimer / state.swivelCoreMax) * 100));

  if (timerTxt) {
    timerTxt.textContent = secStr;
    timerTxt.className = state.swivelCoreTimer <= 4.5
      ? 'text-rose-500 font-black animate-pulse tabular-nums'
      : 'text-emerald-400 tabular-nums';
  }
  if (fillEl) {
    fillEl.style.width = `${pct}%`;
    fillEl.className = state.swivelCoreTimer <= 4.5
      ? 'h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-100'
      : 'h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 transition-all duration-100';
  }
  if (deskReloadUi) deskReloadUi.textContent = secStr;
  if (touchReloadLbl) touchReloadLbl.textContent = state.swivelCoreTimer <= 4.5 ? secStr : 'Reload';
  if (touchReloadBtn) {
    touchReloadBtn.classList.toggle('border-rose-500', state.swivelCoreTimer <= 4.5);
  }
}

function triggerSwivelReload() {
  if (!state.gameStarted || state.isPaused || state.isDead || state.isCountingDown) return;
  const modeObj = CAMERA_MODES[state.cameraModeIndex];
  if (!modeObj || !modeObj.isFixedSwivel) {
    showToast('🔄 Manual Core Reload is only needed in Fixed Swivel Cam Mode!');
    return;
  }

  const now = performance.now();
  if (now - state.lastReloadTime < 900) return;
  state.lastReloadTime = now;

  state.swivelCoreTimer = state.swivelCoreMax;
  state.swivelWarned = false;

  let absorbedFruits = 0;
  let absorbedAmmo = 0;
  let absorbedDiamonds = 0;
  let absorbedShields = 0;
  for (let i = pickups.length - 1; i >= 0; i--) {
    const p = pickups[i];
    if (!p || !p.mesh) continue;
    if (p.kind === 'fruit') {
      absorbedFruits++;
      state.fruitsEaten++;
      spawnPastelBurst(p.mesh.position, [0xff758f, 0xffafcc, 0x95d5b2], 12);
    } else if (p.kind === 'diamond') {
      absorbedDiamonds++;
      state.diamondsRun++;
      state.diamondsBank++;
      spawnPastelBurst(p.mesh.position, [0x38bdf8, 0x7dd3fc, 0xffffff], 12);
    } else if (p.kind === 'shield') {
      absorbedShields++;
      state.aegisShields = Math.min(5, state.aegisShields + 1);
      spawnPastelBurst(p.mesh.position, [0x10b981, 0x6ee7b7, 0xfef08a], 12);
    } else {
      absorbedAmmo++;
      spawnPastelBurst(p.mesh.position, [0xfdffb6, 0x9bf6ff, 0xffffff], 12);
    }
    scene.remove(p.mesh);
    pickups.splice(i, 1);
  }

  const ammoAdded = 20 + absorbedAmmo * 15;
  state.ammo = Math.min(120, state.ammo + ammoAdded);

  const healAmount = Math.max(1, absorbedFruits);
  const prevHealth = state.health;
  state.health = Math.min(6, state.health + healAmount);
  const healed = state.health > prevHealth;

  persistVaultCurrencies();
  sfx.playReload();
  if (healed) sfx.playFruit();
  if (absorbedDiamonds > 0) sfx.playDiamond();
  if (absorbedShields > 0) sfx.playShieldDrop();
  spawnPastelBurst(player.position, [0x34d399, 0x38bdf8, 0xfdffb6, 0xff758f], 18);

  // Immediately respawn fresh pickups alongside each other
  spawnAllPickupsAlongside();

  updateSwivelCoreUI();
  recalcScore();
  updateHUD();
  showToast(`🔄 Core Reloaded! +${ammoAdded}⚡ Ammo${healed ? ' & +0.5 ♥ Shield Restored!' : ' & 15s Timer Reset!'}`);
}

function toggleMagnifyEnemy(forceState) {
  if (!state.gameStarted || state.isPaused || state.isDead) return;
  state.isMagnified = forceState !== undefined ? forceState : !state.isMagnified;

  const touchMagBtn = document.getElementById('touch-magnify-btn');
  const touchMagLabel = document.getElementById('touch-magnify-label');
  const deskZoomUi = document.getElementById('desk-zoom-ui');
  const deskMBtn = document.getElementById('desk-m-btn');
  const reticleZoomTag = document.getElementById('aim-reticle-zoom-tag');

  if (touchMagBtn) touchMagBtn.classList.toggle('magnify-active-btn', state.isMagnified);
  if (touchMagLabel) touchMagLabel.textContent = state.isMagnified ? '2.5×' : 'Zoom';
  if (deskZoomUi) deskZoomUi.textContent = state.isMagnified ? '2.5×' : 'OFF';
  if (deskMBtn) deskMBtn.classList.toggle('magnify-active-btn', state.isMagnified);
  if (reticleZoomTag) reticleZoomTag.classList.toggle('hidden', !state.isMagnified);

  sfx.playUI(state.isMagnified ? 1.32 : 0.88);
  showToast(state.isMagnified ? '🔍 Enemy Magnification Active (2.5× Optical Lock)' : '🔍 Enemy Magnification Off');
}

function togglePause(paused) {
  if (!state.gameStarted || state.isDead || state.isCountingDown) return;
  state.isPaused = paused !== undefined ? paused : !state.isPaused;
  const pauseModal = document.getElementById('pause-modal');
  if (state.isPaused) {
    updateBestTimeRecord(true);
    persistVaultCurrencies();
    pauseModal.classList.remove('hidden-modal');
    document.getElementById('pause-curr-score').textContent = state.score;
    document.getElementById('pause-best-score').textContent = state.highScore;
    document.getElementById('pause-curr-time').textContent = formatStopwatch(state.sessionTime);
    document.getElementById('pause-best-time').textContent = formatStopwatch(state.bestTime);
    const pauseDiamondEl = document.getElementById('pause-diamonds-bank');
    const pauseAegisEl = document.getElementById('pause-aegis-count');
    if (pauseDiamondEl) pauseDiamondEl.textContent = state.diamondsBank;
    if (pauseAegisEl) pauseAegisEl.textContent = state.aegisShields;
    sfx.playUI(0.85);
  } else {
    pauseModal.classList.add('hidden-modal');
    startCircularCountdown(() => { sfx.playUI(1.25); showToast('▶ Game Resumed!'); }, 3);
  }
}

// Special Accident-Prevention Shield Check: Prevents Enemy Hits, Infiltrations & Core Overloads!
function consumeAegisAccidentShield(accidentReason) {
  if (state.aegisShields > 0) {
    state.aegisShields--;
    state.enemyGraceTimer = 1.5;
    persistVaultCurrencies();
    sfx.playShieldBlock();
    spawnVoxelExplosion(player.position, [0x10b981, 0x6ee7b7, 0xfef08a, 0xffffff], 22, true);
    // Spawn a replacement shield & fruit alongside each other on the lane
    spawnFruit(true);
    updateHUD();
    showToast(`🛡️ Aegis Shield Prevented Accident (${accidentReason})! ${state.aegisShields} Shield Left`);
    return true;
  }
  return false;
}

function takeDamage(reason) {
  if (!state.gameStarted || state.isDead || state.isCountingDown) return;
  // First check if a Special Accident-Prevention Shield is active
  if (consumeAegisAccidentShield(reason)) {
    return;
  }
  state.health -= 1;
  // Spawn Healing Fruit along with Diamond & Special Shield alongside it!
  spawnFruit(true);
  spawnVoxelExplosion(player.position, [0xff758f, 0xffafcc, 0xbdb2ff, 0xffd6a5], 18, true);
  if (state.health <= 0) {
    triggerYouDied();
  } else {
    sfx.playDamage();
    showToast(`${reason}! −0.5 ♥ • 🍑 Fruit + 💎 Diamond + 🛡️ Shield Spawned!`);
  }
  recalcScore(); updateHUD();
}

function triggerYouDied(customMessage) {
  state.isDead = true;
  updateBestTimeRecord(true);
  persistVaultCurrencies();
  sfx.playGameOver();
  document.getElementById('died-score-val').textContent = state.score;
  document.getElementById('died-best-val').textContent = state.highScore;
  document.getElementById('died-time-val').textContent = formatStopwatch(state.sessionTime);

  const diedDiamondsEl = document.getElementById('died-diamonds-val');
  const diedVaultEl = document.getElementById('died-vault-balance');
  const reviveBtn = document.getElementById('died-diamond-revive-btn');
  const subTextEl = document.getElementById('died-reason-subtext');

  if (diedDiamondsEl) diedDiamondsEl.textContent = state.diamondsBank;
  if (diedVaultEl) diedVaultEl.textContent = state.diamondsBank;
  if (subTextEl) {
    subTextEl.textContent = customMessage || 'Your high score, survival records, and collected diamonds have been safely archived.';
  }
  if (reviveBtn) {
    const canRevive = state.diamondsBank >= DIAMOND_REVIVE_COST;
    reviveBtn.disabled = !canRevive;
    reviveBtn.style.opacity = canRevive ? '1' : '0.48';
    reviveBtn.innerHTML = canRevive
      ? `<span>💎 Revive &amp; Continue Run (Use ${DIAMOND_REVIVE_COST} 💎 • ${state.diamondsBank} Available)</span>`
      : `<span>💎 Need ${DIAMOND_REVIVE_COST} Stored Diamonds to Revive (Vault: ${state.diamondsBank} 💎)</span>`;
  }

  document.getElementById('you-died-modal').classList.remove('hidden-modal');
  showToast(customMessage || '💔 Pastel Shield Depleted — You Died');
}

// Revive using Stored Diamonds without losing current run Score, Time, or Day progress
function reviveWithDiamonds() {
  if (state.diamondsBank < DIAMOND_REVIVE_COST) {
    sfx.playUI(0.65);
    showToast(`💎 Collect ${DIAMOND_REVIVE_COST - state.diamondsBank} more Credit Diamond(s) to Revive!`);
    return;
  }
  state.diamondsBank -= DIAMOND_REVIVE_COST;
  state.aegisShields = Math.max(1, state.aegisShields + 1); // Grant bonus Aegis Shield on revive
  persistVaultCurrencies();

  document.getElementById('you-died-modal').classList.add('hidden-modal');
  state.isDead = false;
  state.health = 6;
  state.ammo = Math.max(40, state.ammo + 25);
  state.swivelCoreTimer = state.swivelCoreMax;
  state.swivelWarned = false;
  updateSwivelCoreUI();

  for (let i = enemies.length - 1; i >= 0; i--) {
    scene.remove(enemies[i].mesh);
    enemies.splice(i, 1);
  }
  state.enemyGraceTimer = 2.5;
  sfx.playRevive();
  spawnVoxelExplosion(player.position, [0x38bdf8, 0x10b981, 0xfef08a, 0xffffff], 26, true);
  spawnAllPickupsAlongside();
  recalcScore();
  updateHUD();
  startCircularCountdown(() => {
    sfx.playUI(1.35);
    showToast('💎 Revived with Stored Diamonds! Score Preserved + 🛡️ Aegis Shield Active!');
  }, 3);
}

function respawnGame() {
  document.getElementById('you-died-modal').classList.add('hidden-modal');
  state.isDead = false;
  state.health = 6; state.ammo = 40; state.fruitsEaten = 0; state.diamondsRun = 0; state.bulletsFired = 0; state.enemiesKilled = 0; state.daysSurvived = 1; state.sessionTime = 0; state.score = 0;
  state.swivelCoreTimer = state.swivelCoreMax;
  state.swivelWarned = false;
  updateSwivelCoreUI();
  for (let i = enemies.length - 1; i >= 0; i--) { scene.remove(enemies[i].mesh); enemies.splice(i, 1); }
  state.enemyGraceTimer = 1.0;
  spawnAllPickupsAlongside();
  startCircularCountdown(() => { sfx.playUI(1.3); showToast('⚡ Respawned & Grace Shield Active (1s)!'); }, 3);
  recalcScore(); updateHUD();
}

let lastBestTimeDisplayTick = -1;
let lastBestTimePersistSecond = Math.floor(state.bestTime);

function updateBestTimeRecord(forcePersist = false) {
  if (state.sessionTime > state.bestTime) state.bestTime = state.sessionTime;

  const displayTick = Math.floor(state.bestTime * 10);
  if (forcePersist || displayTick !== lastBestTimeDisplayTick) {
    const formatted = formatStopwatch(state.bestTime);
    const hudBestTime = document.getElementById('hud-best-time-val');
    const menuBestTime = document.getElementById('menu-best-time');
    if (hudBestTime) hudBestTime.textContent = formatted;
    if (menuBestTime) menuBestTime.textContent = formatted;
    lastBestTimeDisplayTick = displayTick;
  }

  const wholeSecond = Math.floor(state.bestTime);
  if (forcePersist || wholeSecond > lastBestTimePersistSecond) {
    try {
      localStorage.setItem('skyshift_best_time', String(state.bestTime));
    } catch (error) {
      console.warn('Unable to persist Best Time in this browser session.', error);
    }
    lastBestTimePersistSecond = wholeSecond;
  }
}

function recalcScore() {
  state.score = (state.enemiesKilled * 50) + (state.fruitsEaten * 100) + (state.diamondsRun * 150) + (state.bulletsFired * 5) + (state.daysSurvived * 200);
  if (state.score > state.highScore) { state.highScore = state.score; localStorage.setItem('shoooter_highscore', String(state.highScore)); }
  updateBestTimeRecord();
  if (state.daysSurvived > state.bestDays) { state.bestDays = state.daysSurvived; localStorage.setItem('skyshift_best_days', String(state.bestDays)); }
}

function formatStopwatch(totalSecs) {
  const mins = Math.floor(totalSecs / 60);
  const secs = (totalSecs % 60).toFixed(1);
  return `${String(mins).padStart(2, '0')}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateHUD() {
  updateBestTimeRecord();
  document.getElementById('score-val').textContent = state.score;
  document.getElementById('high-score-val').textContent = state.highScore;
  document.getElementById('menu-best-score').textContent = state.highScore;
  document.getElementById('menu-best-time').textContent = formatStopwatch(state.bestTime);
  document.getElementById('menu-best-days').textContent = state.bestDays;
  document.getElementById('fruits-count').textContent = state.fruitsEaten;
  document.getElementById('ammo-count').textContent = state.ammo;
  document.getElementById('kills-count').textContent = state.enemiesKilled;
  document.getElementById('health-text').textContent = `${state.health} / 6 HITS (${(state.health / 2).toFixed(1)} ♥)`;

  // Update Credit Orbs / Diamonds & Special Accident Shield Counters
  const menuDiamondsBank = document.getElementById('menu-diamonds-bank');
  const menuShieldsBank = document.getElementById('menu-shields-bank');
  const hudDiamondsRun = document.getElementById('diamonds-count');
  const hudDiamondsBank = document.getElementById('diamonds-bank-hud');
  const scoreCardDiamonds = document.getElementById('score-card-diamonds-val');
  const aegisCountEl = document.getElementById('aegis-shield-count');
  const aegisStatusEl = document.getElementById('aegis-shield-status');
  const healthCardEl = document.getElementById('hud-health-card');

  if (menuDiamondsBank) menuDiamondsBank.textContent = state.diamondsBank;
  if (menuShieldsBank) menuShieldsBank.textContent = state.aegisShields;
  if (hudDiamondsRun) hudDiamondsRun.textContent = state.diamondsRun;
  if (hudDiamondsBank) hudDiamondsBank.textContent = `(Vault: ${state.diamondsBank})`;
  if (scoreCardDiamonds) scoreCardDiamonds.textContent = state.diamondsBank;
  if (aegisCountEl) aegisCountEl.textContent = state.aegisShields;
  if (aegisStatusEl) {
    aegisStatusEl.textContent = state.aegisShields > 0 ? 'PROTECTED' : 'STANDBY';
    aegisStatusEl.className = state.aegisShields > 0
      ? 'text-[9px] text-emerald-400 font-extrabold'
      : 'text-[9px] text-slate-400 font-bold';
  }
  if (healthCardEl) {
    healthCardEl.classList.toggle('aegis-shield-protected', state.aegisShields > 0);
  }
  playerAegisAuraGroup.visible = state.aegisShields > 0;

  const eSpd = `${state.enemySpeedMult.toFixed(1)}x`; const cSpd = `${state.cycleSpeedMult.toFixed(1)}x`;
  document.getElementById('enemy-speed-ui').textContent = eSpd; document.getElementById('cycle-speed-ui').textContent = cSpd;
  document.getElementById('touch-enemy-spd').textContent = eSpd; document.getElementById('touch-cycle-spd').textContent = cSpd;
  const segs = document.querySelectorAll('#health-bar .health-seg'); segs.forEach((seg, idx) => { seg.classList.toggle('active', idx < state.health); });
}

// =========================================================================
// 11. 3-SECOND ROTATING CIRCULAR COUNTDOWN ENGINE
// =========================================================================
let countdownRafId = null;
function startCircularCountdown(onComplete, seconds = 3) {
  if (countdownRafId) cancelAnimationFrame(countdownRafId);
  state.isCountingDown = true;
  state.countdownValue = seconds;
  const overlay = document.getElementById('countdown-overlay');
  const numeralEl = document.getElementById('countdown-numeral');
  const msStopwatchEl = document.getElementById('countdown-ms-stopwatch');
  const arcEl = document.getElementById('countdown-progress-arc');
  const outerRimEl = document.getElementById('countdown-outer-rim');
  const subLabel = document.getElementById('countdown-sublabel');
  overlay.classList.add('active');

  const totalDuration = seconds * 1000;
  const startTime = performance.now();
  const circumference = 2 * Math.PI * 76;
  arcEl.style.strokeDasharray = circumference;
  arcEl.style.strokeDashoffset = '0';
  numeralEl.textContent = String(seconds);
  subLabel.textContent = 'GET READY';

  let lastPlayedSec = seconds;
  sfx.playCountdownTick(false);

  function stepCountdown(now) {
    const elapsed = now - startTime;
    const remainingMs = Math.max(0, totalDuration - elapsed);
    const curSecs = Math.ceil(remainingMs / 1000);
    const secDecimal = (remainingMs / 1000).toFixed(2);

    msStopwatchEl.textContent = `0${secDecimal}s`;
    const progressFrac = remainingMs / totalDuration;
    arcEl.style.strokeDashoffset = String(circumference * (1 - progressFrac));

    if (outerRimEl) {
      const deg = (elapsed / 1000) * 360;
      outerRimEl.style.transform = `rotate(${deg.toFixed(2)}deg)`;
    }

    if (curSecs !== lastPlayedSec && curSecs > 0) {
      lastPlayedSec = curSecs;
      numeralEl.textContent = String(curSecs);
      sfx.playCountdownTick(false);
      numeralEl.style.transform = 'scale(1.22)';
      setTimeout(() => { numeralEl.style.transform = 'scale(1)'; }, 140);
    }

    if (remainingMs <= 0) {
      numeralEl.textContent = 'GO!';
      subLabel.textContent = 'FIGHTING';
      msStopwatchEl.textContent = '00.00s';
      sfx.playCountdownTick(true);
      numeralEl.style.transform = 'scale(1.35)';
      setTimeout(() => {
        overlay.classList.remove('active');
        state.isCountingDown = false;
        numeralEl.style.transform = 'scale(1)';
        numeralEl.textContent = '3';
        subLabel.textContent = 'GET READY';
        if (outerRimEl) outerRimEl.style.transform = 'rotate(0deg)';
        if (onComplete) onComplete();
      }, 320);
      return;
    }
    countdownRafId = requestAnimationFrame(stepCountdown);
  }

  countdownRafId = requestAnimationFrame(stepCountdown);
}

// =========================================================================
// 12. INITIALIZATION, INITIATION STEPS & TOUCH / DESKTOP CONTROLS BINDING
// =========================================================================
const deviceModal = document.getElementById('device-modal');
const touchControlsLayer = document.getElementById('touch-controls-layer');
const desktopControlsLayer = document.getElementById('desktop-controls-layer');

function syncActiveControlDockLayer() {
  if (state.deviceMode === 'touch') {
    touchControlsLayer.classList.remove('hidden');
    touchControlsLayer.classList.add('flex');
    desktopControlsLayer.classList.remove('flex');
    desktopControlsLayer.classList.add('hidden');
  } else {
    desktopControlsLayer.classList.remove('hidden');
    desktopControlsLayer.classList.add('flex');
    touchControlsLayer.classList.remove('flex');
    touchControlsLayer.classList.add('hidden');
  }
  syncNonOverlappingUiScale();
}

function setDeviceMode(mode, announce = true) {
  sfx.init();
  state.deviceMode = mode === 'touch' ? 'touch' : 'desktop';
  const touchBtn = document.getElementById('select-touch-btn');
  const deskBtn = document.getElementById('select-desktop-btn');
  if (touchBtn && deskBtn) {
    touchBtn.classList.toggle('selected-device', state.deviceMode === 'touch');
    deskBtn.classList.toggle('selected-device', state.deviceMode === 'desktop');
  }
  if (state.gameStarted) {
    syncActiveControlDockLayer();
  }
  if (announce) {
    sfx.playUI(1.2);
    showToast(state.deviceMode === 'touch' ? '📱 Touch Mode Selected' : '💻 Desktop Mode Selected');
  }
}

// Step 1 -> Step 2 Navigation
document.getElementById('select-touch-btn').addEventListener('click', () => setDeviceMode('touch', true));
document.getElementById('select-desktop-btn').addEventListener('click', () => setDeviceMode('desktop', true));

// If user interacts with the screen via touch on Step 1, automatically ensure Touch Controls are ready
window.addEventListener('touchstart', () => {
  if (!state.gameStarted && state.deviceMode !== 'touch') {
    setDeviceMode('touch', false);
  }
}, { once: true, passive: true });

// 1st Screen High / Low Definition Mode Selection Bindings
document.getElementById('select-hd-btn').addEventListener('click', () => applyGraphicsDefinitionMode('hd', true));
document.getElementById('select-ld-btn').addEventListener('click', () => applyGraphicsDefinitionMode('ld', true));
document.getElementById('init-gfx-quick-pill').addEventListener('click', () => {
  applyGraphicsDefinitionMode(state.graphicsMode === 'hd' ? 'ld' : 'hd', true);
});
document.getElementById('hud-gfx-btn').addEventListener('click', () => {
  applyGraphicsDefinitionMode(state.graphicsMode === 'hd' ? 'ld' : 'hd', true);
});
document.getElementById('desk-g-btn').addEventListener('click', () => {
  applyGraphicsDefinitionMode(state.graphicsMode === 'hd' ? 'ld' : 'hd', true);
});
document.querySelectorAll('.pause-gfx-btn').forEach(btn => {
  btn.addEventListener('click', () => applyGraphicsDefinitionMode(btn.dataset.gfx, true));
});

document.getElementById('step-1-next-btn').addEventListener('click', () => {
  sfx.playUI(1.15);
  document.getElementById('init-step-1').classList.add('hidden');
  document.getElementById('init-step-2').classList.remove('hidden');
  document.getElementById('step-dot-1').className = 'w-2.5 h-2.5 rounded-full bg-slate-400/40';
  document.getElementById('step-dot-2').className = 'w-2.5 h-2.5 rounded-full bg-rose-400 shadow-sm';
  document.getElementById('step-label-text').textContent = 'Step 2 of 2';
  document.getElementById('modal-subtitle').textContent = 'Part 2: Customize your 360° Ranger avatar, dress palettes, enemy waves & world biome.';
  requestAnimationFrame(() => {
    resizeAvatarPreview();
    updateAvatarPreviewModel();
  });
});

document.getElementById('step-2-back-btn').addEventListener('click', () => {
  sfx.playUI(0.9);
  document.getElementById('init-step-2').classList.add('hidden');
  document.getElementById('init-step-1').classList.remove('hidden');
  document.getElementById('step-dot-2').className = 'w-2.5 h-2.5 rounded-full bg-slate-400/40';
  document.getElementById('step-dot-1').className = 'w-2.5 h-2.5 rounded-full bg-rose-400 shadow-sm';
  document.getElementById('step-label-text').textContent = 'Step 1 of 2';
  document.getElementById('modal-subtitle').textContent = 'Part 1: Select your control hardware & graphics definition to calibrate precision targeting.';
});

// Final Launch Button
document.getElementById('initiate-game-btn').addEventListener('click', () => {
  sfx.init(); sfx.playUI(1.3);
  state.gameStarted = true;
  state.isModalScrolling = false;
  document.body.classList.remove('is-scrolling-modal');
  state.enemyGraceTimer = 1.0;
  deviceModal.classList.add('hidden-modal');

  syncActiveControlDockLayer();
  showToast(state.deviceMode === 'touch'
    ? '📱 Touch Controls & Web Audio Active!'
    : '💻 Keyboard Controls & Web Audio Active!');

  buildPlayerModel();
  spawnAllPickupsAlongside();
  syncNonOverlappingUiScale();
  startCircularCountdown(() => { sfx.playUI(1.4); showToast('🚀 Novashot Started! 1s Grace Shield Active!'); }, 3);
});

// Step 2 & Pause Button bindings for Biomes, Phases, Themes, Cams, Enemies
document.querySelectorAll('.step2-biome-btn').forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.step2-biome-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.biomeIndex = idx;
    applyBiome(idx);
  });
});

document.querySelectorAll('.pause-biome-btn').forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    state.biomeIndex = idx; applyBiome(idx);
    document.querySelectorAll('.pause-biome-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

document.querySelectorAll('.step2-phase-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.step2-phase-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.skyPhaseMode = btn.dataset.phase;
    sfx.playUI(1.1); showToast(`☀️ Sky Phase: ${btn.textContent}`);
  });
});

document.querySelectorAll('.pause-phase-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    state.skyPhaseMode = btn.dataset.phase;
    document.querySelectorAll('.pause-phase-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    sfx.playUI(1.1); showToast(`☀️ Sky Phase: ${btn.textContent}`);
  });
});

document.querySelectorAll('.step2-theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.step2-theme-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    triggerUpperLeftToLowerRightTransition(btn.dataset.theme);
  });
});

document.querySelectorAll('.pause-theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    triggerUpperLeftToLowerRightTransition(btn.dataset.theme);
    document.querySelectorAll('.pause-theme-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

document.querySelectorAll('.step2-cam-btn').forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    setCameraMode(idx);
  });
});

document.querySelectorAll('.pause-cam-btn').forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    setCameraMode(idx);
  });
});

// Multi-Enemy Selector Buttons
document.querySelectorAll('.multi-enemy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.enemyType;
    const idx = state.selectedEnemies.indexOf(type);
    if (idx >= 0) {
      if (state.selectedEnemies.length > 1) {
        state.selectedEnemies.splice(idx, 1);
        btn.classList.remove('active');
      } else {
        showToast('⚠️ At least 1 enemy type must remain active');
      }
    } else {
      state.selectedEnemies.push(type);
      btn.classList.add('active');
    }
    sfx.playUI(1.1);
    showToast(`👾 Active Visitor Wave: ${state.selectedEnemies.join(', ')}`);
  });
});

document.getElementById('step2-select-all-enemies').addEventListener('click', () => {
  state.selectedEnemies = [...ENEMY_TYPES];
  document.querySelectorAll('.multi-enemy-btn').forEach(b => b.classList.add('active'));
  sfx.playUI(1.2); showToast('👾 All 5 Enemy Types Activated!');
});

// Theme toggle buttons in HUD & Initiation
document.getElementById('init-theme-toggle-btn').addEventListener('click', () => {
  triggerUpperLeftToLowerRightTransition(state.uiTheme === 'light' ? 'dark' : 'light');
});
document.getElementById('hud-theme-btn').addEventListener('click', () => {
  triggerUpperLeftToLowerRightTransition(state.uiTheme === 'light' ? 'dark' : 'light');
});

document.getElementById('mute-audio-btn').addEventListener('click', () => {
  const isMuted = sfx.toggleMute();
  document.getElementById('mute-audio-btn').innerHTML = isMuted ? '🔇 <span id="audio-state-label">Muted</span>' : '🔊 <span id="audio-state-label">Audio</span>';
  if (!isMuted) sfx.playUI(1.15); showToast(isMuted ? '🔇 Audio Muted' : '🔊 Audio Unmuted');
});

document.getElementById('cycle-mode-btn').addEventListener('click', togglePhaseMode);
document.getElementById('hud-pause-btn').addEventListener('click', () => togglePause(true));
document.getElementById('pause-resume-btn').addEventListener('click', () => togglePause(false));
document.getElementById('pause-QuickResume-btn').addEventListener('click', () => togglePause(false));
document.getElementById('hud-cam-btn').addEventListener('click', cycleCameraMode);

document.getElementById('pause-main-menu-btn').addEventListener('click', () => {
  sfx.playUI(0.9);
  updateBestTimeRecord(true);
  persistVaultCurrencies();
  recalcScore();
  updateHUD();
  state.isPaused = false;
  state.gameStarted = false;
  document.getElementById('pause-modal').classList.add('hidden-modal');
  deviceModal.classList.remove('hidden-modal');
  showToast('🏠 Game & Diamonds Saved — Returned to Main Menu');
});

document.getElementById('died-diamond-revive-btn').addEventListener('click', reviveWithDiamonds);
document.getElementById('died-respawn-btn').addEventListener('click', respawnGame);
document.getElementById('died-avatar-settings-btn').addEventListener('click', () => {
  document.getElementById('you-died-modal').classList.add('hidden-modal');
  state.isDead = false;
  state.gameStarted = false;
  updateHUD();
  deviceModal.classList.remove('hidden-modal');
});

// Individual UI Hide & Unhide All bindings
document.querySelectorAll('.hide-ui-chip').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    hideUiPanel(btn.dataset.hideTarget);
  });
});
document.getElementById('unhide-all-ui-btn').addEventListener('click', unhideAllUiPanels);

// Speed controls
document.getElementById('btn-enemy-faster').addEventListener('click', () => adjustEnemySpeed(0.2));
document.getElementById('btn-enemy-slower').addEventListener('click', () => adjustEnemySpeed(-0.2));
document.getElementById('btn-cycle-faster').addEventListener('click', () => adjustCycleSpeed(0.25));
document.getElementById('btn-cycle-slower').addEventListener('click', () => adjustCycleSpeed(-0.25));
document.getElementById('btn-toggle-enemy').addEventListener('click', () => {
  state.enemyTypeIndex = (state.enemyTypeIndex + 1) % ENEMY_TYPES.length;
  const t = ENEMY_TYPES[state.enemyTypeIndex];
  document.getElementById('enemy-mode-val').textContent = t;
  document.getElementById('touch-enemy-label').textContent = t;
  sfx.playUI(1.05); showToast(`👾 Visitors: ${t}`);
});
document.getElementById('btn-toggle-biome').addEventListener('click', toggleBiome);
document.getElementById('btn-toggle-cam').addEventListener('click', cycleCameraMode);

document.getElementById('pause-enemy-faster').addEventListener('click', () => adjustEnemySpeed(0.2));
document.getElementById('pause-enemy-slower').addEventListener('click', () => adjustEnemySpeed(-0.2));
document.getElementById('pause-cycle-faster').addEventListener('click', () => adjustCycleSpeed(0.25));
document.getElementById('pause-cycle-slower').addEventListener('click', () => adjustCycleSpeed(-0.25));

document.getElementById('desk-shoot-pill').addEventListener('click', shootBullet);
document.getElementById('desk-a-btn').addEventListener('click', () => adjustEnemySpeed(0.2));
document.getElementById('desk-d-btn').addEventListener('click', () => adjustEnemySpeed(-0.2));
document.getElementById('desk-w-btn').addEventListener('click', () => adjustCycleSpeed(0.25));
document.getElementById('desk-s-btn').addEventListener('click', () => adjustCycleSpeed(-0.25));
document.getElementById('desk-e-btn').addEventListener('click', () => {
  state.enemyTypeIndex = (state.enemyTypeIndex + 1) % ENEMY_TYPES.length;
  const t = ENEMY_TYPES[state.enemyTypeIndex];
  document.getElementById('enemy-mode-val').textContent = t;
  sfx.playUI(1.05); showToast(`👾 Visitors: ${t}`);
});
document.getElementById('desk-b-btn').addEventListener('click', toggleBiome);
document.getElementById('desk-c-btn').addEventListener('click', cycleCameraMode);
document.getElementById('desk-m-btn').addEventListener('click', () => toggleMagnifyEnemy());
document.getElementById('desk-r-btn').addEventListener('click', () => triggerSwivelReload());
document.getElementById('desk-p-btn').addEventListener('click', () => togglePause(true));
document.getElementById('touch-magnify-btn').addEventListener('click', () => toggleMagnifyEnemy());
document.getElementById('touch-reload-btn').addEventListener('click', () => triggerSwivelReload());

// Bulletproof Multi-Touch + Pointer Hold Binding (Works in both LD & HD Modes on all mobile devices)
function bindHoldButton(btnId, onStateChange, onImmediatePress) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.style.touchAction = 'none';

  const start = (e) => {
    if (e.cancelable) e.preventDefault();
    sfx.init();
    btn.classList.add('pressed');
    onStateChange(true);
    if (onImmediatePress) onImmediatePress();
  };

  const end = (e) => {
    if (e && e.cancelable) e.preventDefault();
    btn.classList.remove('pressed');
    onStateChange(false);
  };

  // Explicit Touch Events for 100% compatibility on low-RAM Android/iOS browsers
  btn.addEventListener('touchstart', start, { passive: false });
  btn.addEventListener('touchend', end, { passive: false });
  btn.addEventListener('touchcancel', end, { passive: false });

  // Pointer Events for desktop/hybrid touch devices
  btn.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') return; // Handled by touchstart
    start(e);
  });
  btn.addEventListener('pointerup', (e) => {
    if (e.pointerType === 'touch') return;
    end(e);
  });
  btn.addEventListener('pointerleave', (e) => {
    if (e.pointerType === 'touch') return;
    end(e);
  });
  btn.addEventListener('pointercancel', (e) => {
    if (e.pointerType === 'touch') return;
    end(e);
  });
}

bindHoldButton('touch-left-btn', (val) => { state.touchLeft = val; });
bindHoldButton('touch-right-btn', (val) => { state.touchRight = val; });
bindHoldButton('touch-fire-btn', (val) => { state.touchFire = val; }, () => shootBullet());

// Direct Playfield Canvas Touch Support (Works in both LD & HD Mode!)
// If a player touches/drags on the 3D canvas directly on mobile, auto-reveal the touch pad and steer/shoot
let canvasTouchActive = false;
let canvasTouchStartX = 0;

canvas.addEventListener('touchstart', (e) => {
  if (!state.gameStarted || state.isPaused || state.isDead || state.isCountingDown) return;
  if (state.deviceMode !== 'touch') {
    setDeviceMode('touch', false);
  }
  if (e.touches.length > 0) {
    canvasTouchActive = true;
    canvasTouchStartX = e.touches[0].clientX;
    const screenThird = window.innerWidth / 3;
    if (canvasTouchStartX < screenThird) {
      state.touchLeft = true;
      state.touchRight = false;
    } else if (canvasTouchStartX > screenThird * 2) {
      state.touchRight = true;
      state.touchLeft = false;
    } else {
      state.touchFire = true;
      shootBullet();
    }
  }
}, { passive: true });

canvas.addEventListener('touchmove', (e) => {
  if (!canvasTouchActive || !state.gameStarted || e.touches.length === 0) return;
  const curX = e.touches[0].clientX;
  const deltaX = curX - canvasTouchStartX;
  if (Math.abs(deltaX) > 14) {
    state.touchLeft = deltaX < 0;
    state.touchRight = deltaX > 0;
  }
}, { passive: true });

const endCanvasTouch = () => {
  if (!canvasTouchActive) return;
  canvasTouchActive = false;
  state.touchLeft = false;
  state.touchRight = false;
  state.touchFire = false;
};
canvas.addEventListener('touchend', endCanvasTouch, { passive: true });
canvas.addEventListener('touchcancel', endCanvasTouch, { passive: true });

window.addEventListener('keydown', (e) => {
  state.keys[e.code] = true;
  if (e.code === 'ArrowUp' || e.code === 'Space') { e.preventDefault(); shootBullet(); }
  else if (e.code === 'KeyP') togglePause();
  else if (e.code === 'KeyC') cycleCameraMode();
  else if (e.code === 'KeyM') toggleMagnifyEnemy();
  else if (e.code === 'KeyR') triggerSwivelReload();
  else if (e.code === 'KeyG') applyGraphicsDefinitionMode(state.graphicsMode === 'hd' ? 'ld' : 'hd', true);
  else if (e.code === 'KeyA') adjustEnemySpeed(0.2);
  else if (e.code === 'KeyD') adjustEnemySpeed(-0.2);
  else if (e.code === 'KeyW') adjustCycleSpeed(0.25);
  else if (e.code === 'KeyS') adjustCycleSpeed(-0.25);
  else if (e.code === 'KeyE') {
    state.enemyTypeIndex = (state.enemyTypeIndex + 1) % ENEMY_TYPES.length;
    const t = ENEMY_TYPES[state.enemyTypeIndex];
    document.getElementById('enemy-mode-val').textContent = t;
    sfx.playUI(1.05); showToast(`👾 Visitors: ${t}`);
  }
  else if (e.code === 'KeyB') toggleBiome();
});
window.addEventListener('keyup', (e) => { state.keys[e.code] = false; });

// Scroll Lag Elimination: Pause heavy decorative blurs while actively scrolling modal cards
let modalScrollTimeout = null;
document.querySelectorAll('.modal-fit-card, .modal-backdrop').forEach(scroller => {
  scroller.addEventListener('scroll', () => {
    if (!state.isModalScrolling) {
      state.isModalScrolling = true;
      document.body.classList.add('is-scrolling-modal');
    }
    clearTimeout(modalScrollTimeout);
    modalScrollTimeout = setTimeout(() => {
      state.isModalScrolling = false;
      document.body.classList.remove('is-scrolling-modal');
    }, 90);
  }, { passive: true });
});

// =========================================================================
// 13. SMOOTH CAMERA CONTROLLER & AIM POINTER UPDATER
// =========================================================================
const camPosTarget = new THREE.Vector3();
const camLookTarget = new THREE.Vector3();
const aimScreenVec = new THREE.Vector3();

function findMagnifyTargetEnemy() {
  if (enemies.length === 0) return null;
  const yaw = player.rotation.y;
  const dir = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw)).normalize();
  let bestEnemy = null;
  let bestScore = Infinity;

  for (let i = 0; i < enemies.length; i++) {
    const en = enemies[i];
    if (!en || !en.mesh || en.mesh.position.z > PLAYER_Z + 1) continue;
    const dx = en.mesh.position.x - player.position.x;
    const dz = en.mesh.position.z - player.position.z;
    const forwardDist = -(dx * dir.x + dz * dir.z);
    if (forwardDist <= 0) continue;
    const lateralDist = Math.abs(dx * dir.z - dz * dir.x);
    const score = lateralDist * 3.2 + forwardDist * 0.35;
    if (score < bestScore) {
      bestScore = score;
      bestEnemy = en;
    }
  }
  return bestEnemy;
}

function updateAimPointer(dt) {
  const hudPointer = document.getElementById('bullet-aim-pointer');
  if (!state.gameStarted || state.isPaused || state.isDead || state.isCountingDown) {
    aimPointer3DGroup.visible = false;
    if (hudPointer) hudPointer.classList.remove('visible-pointer');
    return;
  }

  aimPointer3DGroup.visible = true;
  const yaw = player.rotation.y;
  const localMuzzle = new THREE.Vector3(0.82, 1.32, -1.35).applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
  const startPos = new THREE.Vector3(
    player.position.x + localMuzzle.x,
    1.32,
    player.position.z + localMuzzle.z
  );
  const dir = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw)).normalize();

  let targetDist = 36;
  let lockedEnemy = false;
  for (let i = 0; i < enemies.length; i++) {
    const en = enemies[i];
    if (!en || !en.mesh) continue;
    const toEnemy = new THREE.Vector3(
      en.mesh.position.x - startPos.x,
      0,
      en.mesh.position.z - startPos.z
    );
    const proj = toEnemy.dot(dir);
    if (proj > 1.0 && proj < targetDist) {
      const perpSq = toEnemy.lengthSq() - proj * proj;
      if (perpSq < 2.6) {
        targetDist = proj;
        lockedEnemy = true;
      }
    }
  }

  aimBeamMesh.position.copy(startPos);
  aimBeamMesh.rotation.y = yaw;
  aimBeamMesh.scale.set(1, 1, targetDist);

  const targetWorldPos = startPos.clone().addScaledVector(dir, targetDist);
  aimTargetMarker.position.copy(targetWorldPos);
  aimTargetMarker.rotation.y = yaw;
  aimMarkerOuterRing.rotation.z += dt * (lockedEnemy ? 6.0 : 2.5);

  const pulseScale = 1 + Math.sin(performance.now() * 0.01) * 0.1;
  aimTargetMarker.scale.setScalar(lockedEnemy ? pulseScale * 1.2 : pulseScale);
  aimMarkerOuterRing.material.color.setHex(lockedEnemy ? 0xfacc15 : 0xff758f);
  aimBeamMat.color.setHex(lockedEnemy ? 0xfacc15 : 0xff758f);

  if (hudPointer) {
    aimScreenVec.copy(targetWorldPos);
    aimScreenVec.project(camera);
    if (aimScreenVec.z < 1.0) {
      const sx = (aimScreenVec.x * 0.5 + 0.5) * window.innerWidth;
      const sy = (-(aimScreenVec.y * 0.5) + 0.5) * window.innerHeight;
      const zoomScale = state.isMagnified ? 1.28 : 1.0;
      hudPointer.classList.add('visible-pointer');
      hudPointer.classList.toggle('locked-on', lockedEnemy);
      hudPointer.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0) scale(${zoomScale})`;
      const outerCircle = document.getElementById('aim-reticle-outer');
      const centerDot = document.getElementById('aim-reticle-dot');
      if (outerCircle && centerDot) {
        outerCircle.setAttribute('stroke', lockedEnemy ? '#facc15' : (state.isMagnified ? '#38bdf8' : '#ff758f'));
        centerDot.setAttribute('fill', lockedEnemy ? '#facc15' : (state.isMagnified ? '#38bdf8' : '#ff758f'));
      }
    } else {
      hudPointer.classList.remove('visible-pointer');
    }
  }
}

function updateCameraSmooth(dt) {
  const mode = CAMERA_MODES[state.cameraModeIndex];
  const desiredFov = state.isMagnified ? 22 : 54;
  if (Math.abs(camera.fov - desiredFov) > 0.05) {
    camera.fov = THREE.MathUtils.lerp(camera.fov, desiredFov, 10 * dt);
    camera.updateProjectionMatrix();
  }

  if (mode.isFixedSwivel) {
    camPosTarget.copy(state.fixedCamInvokePos);
    const yaw = player.rotation.y;
    const lookDist = 38;
    camLookTarget.set(
      player.position.x - Math.sin(yaw) * lookDist,
      1.85,
      player.position.z - Math.cos(yaw) * lookDist
    );
  } else {
    const targetX = player.position.x * mode.followX;
    camPosTarget.set(targetX + mode.offset.x, mode.offset.y, player.position.z + mode.offset.z);
    camLookTarget.set(targetX + mode.lookOffset.x, mode.lookOffset.y, player.position.z + mode.lookOffset.z);
  }

  if (state.isMagnified) {
    const focusEnemy = findMagnifyTargetEnemy();
    if (focusEnemy && focusEnemy.mesh) {
      const enemyFocusPoint = new THREE.Vector3(
        focusEnemy.mesh.position.x,
        1.8,
        focusEnemy.mesh.position.z
      );
      camLookTarget.lerp(enemyFocusPoint, 0.72);
    }
  }

  camera.position.lerp(camPosTarget, 10 * dt);
  const currentLook = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
  currentLook.lerp(camLookTarget, 10 * dt);
  camera.lookAt(currentLook);
}

// =========================================================================
// 14. PASTEL DAY & NIGHT SKY ENGINE + MAIN ANIMATION LOOP
// =========================================================================
const clock = new THREE.Clock();
const skyDay = new THREE.Color(0xa0c4ff); const skySunset = new THREE.Color(0xffafcc); const skyNight = new THREE.Color(0x231942);

function updatePastelDayNight(dt) {
  const prevTime = state.timeOfDay;
  state.timeOfDay = (state.timeOfDay + dt * 0.024 * state.cycleSpeedMult) % 1;

  if (state.gameStarted && !state.isPaused && state.timeOfDay < prevTime) {
    state.daysSurvived++; sfx.playNewDay(); recalcScore(); updateHUD(); showToast(`☀️ Day ${state.daysSurvived} Reached! +200 Score`);
  }

  let effectiveTimeOfDay;
  if (state.skyPhaseMode === 'forcedDay') effectiveTimeOfDay = 0.25;
  else if (state.skyPhaseMode === 'forcedNight') effectiveTimeOfDay = 0.75;
  else effectiveTimeOfDay = state.timeOfDay;

  const angle = effectiveTimeOfDay * Math.PI * 2;
  celestialGroup.rotation.z = angle;
  const isNight = effectiveTimeOfDay >= 0.5;
  document.getElementById('cycle-readout').textContent = `Day ${state.daysSurvived} • ${isNight ? '🌙 Pastel Night' : '☀️ Pastel Day'}`;

  const phaseRemaining = isNight ? (1.0 - effectiveTimeOfDay) * 83.3 : (0.5 - effectiveTimeOfDay) * 83.3;
  const cdStr = `${Math.ceil(phaseRemaining)}s`;
  document.getElementById('hud-phase-countdown').textContent = cdStr;
  document.getElementById('score-card-phase-cd').textContent = `Next: ${cdStr}`;

  const elev = Math.sin(angle); const currentSky = new THREE.Color();
  if (elev > 0.22) { currentSky.copy(skyDay); starMat.opacity = 0; }
  else if (elev > -0.22) { const t = (elev + 0.22) / 0.44; currentSky.copy(skyNight).lerp(skySunset, t); starMat.opacity = (1 - t) * 0.85; }
  else { currentSky.copy(skyNight); starMat.opacity = 0.9; }

  const biomeCfg = BIOME_CONFIG[BIOMES[state.biomeIndex]];
  const biomeFog = new THREE.Color(biomeCfg.fogTint);
  if (!isNight) currentSky.lerp(biomeFog, 0.32);

  scene.background = currentSky; scene.fog.color.copy(currentSky);

  if (!isNight) {
    hemiLight.intensity = THREE.MathUtils.lerp(0.3, 0.45, Math.max(0, elev - 0.22) * 1.5);
    dirLight.intensity = THREE.MathUtils.lerp(0.5, 0.8, Math.max(0, elev - 0.22) * 1.5);
    const groundColor = new THREE.Color(biomeCfg.groundBase);
    groundColor.lerp(new THREE.Color(0xdddddd), 0.3);
    groundMat.color.copy(groundColor);
  } else {
    hemiLight.intensity = Math.max(0.15, (elev + 0.55) * 0.4);
    dirLight.intensity = Math.max(0.1, (elev + 0.35) * 0.5);
    groundMat.color.set(0xffffff);
  }
  return isNight;
}

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.1);

  // If the user is actively scrolling inside a setup/pause modal, skip heavy WebGL draws so scrolling is 100% lag-free
  if (state.isModalScrolling && (!state.gameStarted || state.isPaused || state.isDead)) {
    return;
  }

  if (!document.getElementById('init-step-2').classList.contains('hidden')) {
    if (previewCanvas.width === 0 || previewCanvas.clientWidth !== Math.round(previewCanvas.width / previewRenderer.getPixelRatio())) {
      resizeAvatarPreview();
    }
    if (autoSpinAvatar) {
      avatarRotationY += dt * 0.85;
      previewRangerGroup.rotation.y = avatarRotationY;
      previewPedestalGroup.rotation.y = avatarRotationY;
    }
    previewRenderer.render(previewScene, previewCamera);
  }

  if (!state.gameStarted || state.isPaused || state.isDead || state.isCountingDown) {
    renderer.render(scene, camera);
    return;
  }

  state.sessionTime += dt;
  updateBestTimeRecord();
  const timerStr = formatStopwatch(state.sessionTime);
  document.getElementById('hud-timer-val').textContent = timerStr;
  document.getElementById('score-card-timer-val').textContent = timerStr;

  if (state.enemyGraceTimer > 0) {
    state.enemyGraceTimer -= dt;
  }

  // Animate 3D Aegis Shield aura around player when active
  if (playerAegisAuraGroup.visible) {
    aegisOrbitRing.rotation.z += dt * 2.6;
    const pulse = 1 + Math.sin(performance.now() * 0.006) * 0.05;
    aegisShellMesh.scale.setScalar(pulse);
  }

  const isNight = updatePastelDayNight(dt);
  clouds.forEach(c => { c.mesh.position.x += dt * c.speed; if (c.mesh.position.x > 65) c.mesh.position.x = -65; });
  bubbles.forEach((b, idx) => { if (b.visible) { b.position.y += dt * (1.8 + (idx % 3) * 0.6); if (b.position.y > 16) b.position.y = 0.5; } });
  sharedBlasterGroup.position.z += (-0.55 - sharedBlasterGroup.position.z) * 12 * dt;

  const moveSpeed = 19.5; const movingLeft = state.keys['ArrowLeft'] || state.touchLeft; const movingRight = state.keys['ArrowRight'] || state.touchRight;
  const currentCamMode = CAMERA_MODES[state.cameraModeIndex];

  if (currentCamMode.isFixedSwivel) {
    const rotSpeed = 1.85;
    const maxYaw = THREE.MathUtils.degToRad(85);
    if (movingLeft) {
      state.aimYaw = Math.min(maxYaw, state.aimYaw + rotSpeed * dt);
      player.rotation.z = THREE.MathUtils.lerp(player.rotation.z, 0.08, 10 * dt);
    } else if (movingRight) {
      state.aimYaw = Math.max(-maxYaw, state.aimYaw - rotSpeed * dt);
      player.rotation.z = THREE.MathUtils.lerp(player.rotation.z, -0.08, 10 * dt);
    } else {
      player.rotation.z = THREE.MathUtils.lerp(player.rotation.z, 0, 10 * dt);
    }
    player.rotation.y = THREE.MathUtils.lerp(player.rotation.y, state.aimYaw, 14 * dt);

    state.swivelCoreTimer -= dt;
    updateSwivelCoreUI();
    if (state.swivelCoreTimer <= 4.5 && !state.swivelWarned) {
      state.swivelWarned = true;
      sfx.playDamage();
      showToast('⚠️ Swivel Core Critical! Press R or 🔄 Reload Now or You Will Die!');
    }
    if (state.swivelCoreTimer <= 0) {
      // Check if Special Accident-Prevention Shield can save the player from Core Overload accident!
      if (consumeAegisAccidentShield('Swivel Core Overload')) {
        state.swivelCoreTimer = state.swivelCoreMax;
        state.swivelWarned = false;
        updateSwivelCoreUI();
      } else {
        spawnVoxelExplosion(player.position, [0xff758f, 0xfacc15, 0xef4444, 0xffffff], 32, true);
        triggerYouDied('💥 Swivel Core Overload — Forgot to Reload on Time!');
        renderer.render(scene, camera);
        return;
      }
    }
  } else {
    state.aimYaw = 0;
    player.rotation.y = THREE.MathUtils.lerp(player.rotation.y, 0, 12 * dt);
    if (movingLeft) { player.position.x -= moveSpeed * dt; player.rotation.z = THREE.MathUtils.lerp(player.rotation.z, 0.14, 10 * dt); }
    else if (movingRight) { player.position.x += moveSpeed * dt; player.rotation.z = THREE.MathUtils.lerp(player.rotation.z, -0.14, 10 * dt); }
    else player.rotation.z = THREE.MathUtils.lerp(player.rotation.z, 0, 10 * dt);

    if (player.position.x > BOUNDARY_X) { player.position.x = -BOUNDARY_X; sfx.playUI(1.3); spawnPastelBurst(player.position, [0xffafcc, 0xbdb2ff, 0xffffff], 12); }
    else if (player.position.x < -BOUNDARY_X) { player.position.x = BOUNDARY_X; sfx.playUI(1.3); spawnPastelBurst(player.position, [0x9bf6ff, 0xa0c4ff, 0xffffff], 12); }
  }

  if (state.keys['ArrowUp'] || state.touchFire) shootBullet();

  const maxEnemiesCap = state.graphicsMode === 'ld' ? 18 : 28;
  state.spawnTimer += dt;
  const baseInterval = isNight ? 0.62 : 1.42;
  const effectiveInterval = baseInterval / Math.max(0.45, state.enemySpeedMult * 0.85);
  if (state.spawnTimer >= effectiveInterval) {
    state.spawnTimer = 0;
    if (enemies.length < maxEnemiesCap) spawnEnemy();
  }

  // 1) Spawn Ammo + Fruit/Apple + companion Diamond & Shield alongside each other on the lane
  state.ammoSpawnTimer += dt;
  if (state.ammoSpawnTimer >= 5.2) {
    state.ammoSpawnTimer = 0;
    if (pickups.filter(p => p.kind === 'ammo').length < 3) {
      spawnAmmoPack(true);
    }
    if (pickups.filter(p => p.kind === 'fruit').length < 2) {
      spawnFruit(false);
    }
  }

  // 2) Spawn Credit Orbs / Diamonds (💎) alongside Food/Fruit on the lane
  state.diamondSpawnTimer += dt;
  if (state.diamondSpawnTimer >= 5.5) {
    state.diamondSpawnTimer = 0;
    if (pickups.filter(p => p.kind === 'diamond').length < 3) {
      spawnDiamondOrb();
    }
  }

  // 3) Spawn Special Accident-Prevention Shield Drops (🛡️) alongside Food & Diamonds on the lane
  state.shieldSpawnTimer += dt;
  if (state.shieldSpawnTimer >= 8.0) {
    state.shieldSpawnTimer = 0;
    if (pickups.filter(p => p.kind === 'shield').length < 2 && state.aegisShields < 5) {
      spawnSpecialShieldDrop();
    }
  }

  for (let i = projectiles.length - 1; i >= 0; i--) {
    const b = projectiles[i];
    if (b.userData.vel) {
      b.position.addScaledVector(b.userData.vel, dt);
    } else {
      b.position.z -= 62 * dt;
    }
    if (b.position.z < BULLET_MAX_Z || b.position.z > PLAYER_Z + 15 || Math.abs(b.position.x) > BOUNDARY_X + 35) {
      scene.remove(b);
      projectiles.splice(i, 1);
    }
  }

  const now = performance.now() * 0.006;
  for (let i = enemies.length - 1; i >= 0; i--) {
    const en = enemies[i];
    if (!en || !en.mesh) continue;
    en.mesh.position.z += en.baseSpeed * state.enemySpeedMult * dt;
    if (en.type === 'Alien Ships') { en.mesh.rotation.y += 2.8 * dt; en.mesh.position.y = Math.sin(now + en.seed) * 0.3; }
    else { en.mesh.position.y = Math.abs(Math.sin(now * 1.4 + en.seed)) * 0.28; en.mesh.rotation.z = Math.sin(now * 1.4 + en.seed) * 0.08; }

    let hitByBullet = false;
    for (let j = projectiles.length - 1; j >= 0; j--) {
      const b = projectiles[j];
      if (Math.abs(b.position.z - en.mesh.position.z) < 1.9 && Math.abs(b.position.x - en.mesh.position.x) < 1.65) {
        const preset = ENEMY_DRESS_PRESETS[state.enemyDressIndex];
        const enemyDeathX = en.mesh.position.x;
        spawnVoxelExplosion(en.mesh.position, [preset.primary, preset.secondary, preset.accent, 0xffffff], 26, true);
        sfx.playExplosion(); scene.remove(b); projectiles.splice(j, 1); scene.remove(en.mesh); enemies.splice(i, 1);
        if (state.gameStarted && !state.isDead) {
          state.enemiesKilled++;
          // Defeated enemies drop bonus Credit Diamond Orbs or Shield Drops on your lane
          if (Math.random() < 0.30 && pickups.filter(p => p.kind === 'diamond').length < 3) {
            spawnDiamondOrb(enemyDeathX);
          } else if (Math.random() < 0.15 && pickups.filter(p => p.kind === 'shield').length < 2) {
            spawnSpecialShieldDrop(enemyDeathX);
          }
          recalcScore();
          updateHUD();
        }
        hitByBullet = true; break;
      }
    }
    if (hitByBullet) { if (enemies.length === 0) break; continue; }
    if (Math.abs(en.mesh.position.z - PLAYER_Z) < 1.45 && Math.abs(en.mesh.position.x - player.position.x) < 1.55) {
      const preset = ENEMY_DRESS_PRESETS[state.enemyDressIndex];
      spawnVoxelExplosion(en.mesh.position, [preset.primary, preset.secondary, preset.accent], 20, true);
      scene.remove(en.mesh); enemies.splice(i, 1);
      if (state.enemyGraceTimer <= 0) takeDamage('💥 Enemy Touched You');
      else showToast('🛡️ Grace Shield Blocked Damage!');
      if (enemies.length === 0) break;
      continue;
    }
    if (en.mesh.position.z > PLAYER_Z + 2.6) {
      scene.remove(en.mesh); enemies.splice(i, 1);
      if (state.enemyGraceTimer <= 0) takeDamage('⚠️ Enemy Infiltrated');
      if (enemies.length === 0) break;
    }
  }

  for (let i = pickups.length - 1; i >= 0; i--) {
    const p = pickups[i]; p.mesh.rotation.y += 2.4 * dt; p.mesh.position.y = Math.sin(now + i) * 0.15;
    let collected = false;

    if (currentCamMode.isFixedSwivel) {
      for (let j = projectiles.length - 1; j >= 0; j--) {
        const b = projectiles[j];
        if (Math.abs(b.position.z - p.mesh.position.z) < 1.75 && Math.abs(b.position.x - p.mesh.position.x) < 1.75) {
          scene.remove(b);
          projectiles.splice(j, 1);
          collected = true;
          break;
        }
      }
    } else if (Math.abs(p.mesh.position.x - player.position.x) < 1.75 && Math.abs(p.mesh.position.z - player.position.z) < 2.2) {
      collected = true;
    }

    if (collected) {
      if (p.kind === 'fruit') {
        state.fruitsEaten++; state.health = Math.min(6, state.health + 1); sfx.playFruit();
        if (currentCamMode.isFixedSwivel) {
          state.swivelCoreTimer = state.swivelCoreMax;
          state.swivelWarned = false;
          updateSwivelCoreUI();
        }
        spawnPastelBurst(p.mesh.position, [0xff758f, 0xffafcc, 0x95d5b2, 0xffd6a5], 16); showToast('🍑 Ate Pastel Peach! +0.5 ♥ & +100 Score');
      } else if (p.kind === 'diamond') {
        state.diamondsRun++;
        state.diamondsBank++;
        persistVaultCurrencies();
        sfx.playDiamond();
        if (currentCamMode.isFixedSwivel) {
          state.swivelCoreTimer = state.swivelCoreMax;
          state.swivelWarned = false;
          updateSwivelCoreUI();
        }
        spawnPastelBurst(p.mesh.position, [0x38bdf8, 0x7dd3fc, 0xe0f2fe, 0xffffff], 16);
        showToast(`💎 Credit Diamond Stored! Vault: ${state.diamondsBank} 💎 (+150 Score)`);
      } else if (p.kind === 'shield') {
        state.aegisShields = Math.min(5, state.aegisShields + 1);
        persistVaultCurrencies();
        sfx.playShieldDrop();
        if (currentCamMode.isFixedSwivel) {
          state.swivelCoreTimer = state.swivelCoreMax;
          state.swivelWarned = false;
          updateSwivelCoreUI();
        }
        spawnPastelBurst(p.mesh.position, [0x10b981, 0x6ee7b7, 0xfef08a, 0xffffff], 18);
        showToast(`🛡️ Special Aegis Shield Equipped (${state.aegisShields} Active)! Blocks Next Accident!`);
      } else {
        state.ammo += 20; sfx.playReload();
        if (currentCamMode.isFixedSwivel) {
          state.swivelCoreTimer = state.swivelCoreMax;
          state.swivelWarned = false;
          updateSwivelCoreUI();
        }
        spawnPastelBurst(p.mesh.position, [0xfdffb6, 0xffd6a5, 0x9bf6ff, 0xffffff], 16); showToast('⚡ Auto-Reloaded +20 Blaster Energy!');
      }
      scene.remove(p.mesh); pickups.splice(i, 1); recalcScore(); updateHUD();
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const pt = particles[i]; pt.life -= dt * pt.decay;
    if (pt.life <= 0) { scene.remove(pt.mesh); pt.mesh.material.dispose(); particles.splice(i, 1); }
    else {
      pt.mesh.position.addScaledVector(pt.vel, dt); pt.vel.y -= 26 * dt;
      if (pt.mesh.position.y <= 0.25 && pt.vel.y < 0) { pt.mesh.position.y = 0.25; pt.vel.y = Math.abs(pt.vel.y) * 0.48; pt.vel.x *= 0.78; pt.vel.z *= 0.78; }
      pt.mesh.rotation.x += pt.rotVel.x * dt; pt.mesh.rotation.y += pt.rotVel.y * dt; pt.mesh.rotation.z += pt.rotVel.z * dt;
      pt.mesh.scale.setScalar(pt.baseSize * Math.max(0.05, pt.life));
    }
  }

  for (let i = shockwaves.length - 1; i >= 0; i--) {
    const sw = shockwaves[i]; sw.life -= dt * 2.4;
    if (sw.life <= 0) { scene.remove(sw.mesh); sw.mesh.material.dispose(); shockwaves.splice(i, 1); }
    else { sw.mesh.scale.setScalar(1 + (1 - sw.life) * 3.6); sw.mesh.material.opacity = sw.life * 0.85; }
  }

  updateCameraSmooth(dt);
  updateAimPointer(dt);
  renderer.render(scene, camera);
}

// =========================================================================
// 15. PROPORTIONAL SCREEN SCALING & STRICT NON-OVERLAPPING UI ENGINE
// =========================================================================
function syncNonOverlappingUiScale() {
  const root = document.documentElement;
  const topStack = document.getElementById('hud-top-stack');
  const bottomStack = document.getElementById('hud-bottom-stack');
  if (!topStack || !bottomStack) return;

  // Reset scale to 1 first to measure natural heights accurately
  root.style.setProperty('--ui-dynamic-scale', '1');

  const viewport = window.visualViewport;
  const vh = Math.max(1, Math.round(viewport ? viewport.height : window.innerHeight));
  const vw = Math.max(1, Math.round(viewport ? viewport.width : window.innerWidth));

  // Base proportional scale according to screen size (larger screen = larger UI, smaller screen = smaller UI)
  let targetScale = 1.0;
  if (vw >= 2200 && vh >= 1150) {
    targetScale = 1.18;
  } else if (vw >= 1650 && vh >= 920) {
    targetScale = 1.08;
  } else if (vw < 360 || vh < 560) {
    targetScale = 0.88;
  }

  // Measure actual rendered heights to strictly prevent any vertical overlap between top HUD and bottom controls
  const topH = topStack.offsetHeight || 0;
  const botH = bottomStack.offsetHeight || 0;
  const minPlayfieldClearance = Math.max(76, vh * 0.16);
  const availableForUi = Math.max(180, vh - minPlayfieldClearance - 20);
  const combinedUiHeight = (topH + botH) * targetScale;

  if (combinedUiHeight > availableForUi && (topH + botH) > 0) {
    targetScale = Math.max(0.68, Math.min(targetScale, availableForUi / (topH + botH)));
  }

  root.style.setProperty('--ui-dynamic-scale', targetScale.toFixed(3));
}

let viewportSyncFrame = 0;
let lastViewportWidth = 0;
let lastViewportHeight = 0;

function syncViewportDimensions() {
  if (viewportSyncFrame) cancelAnimationFrame(viewportSyncFrame);
  viewportSyncFrame = requestAnimationFrame(() => {
    viewportSyncFrame = 0;
    const viewport = window.visualViewport;
    const vh = Math.max(1, Math.round(viewport ? viewport.height : window.innerHeight));
    const vw = Math.max(1, Math.round(viewport ? viewport.width : window.innerWidth));
    document.documentElement.style.setProperty('--app-height', `${vh}px`);

    if (vw !== lastViewportWidth || vh !== lastViewportHeight) {
      lastViewportWidth = vw;
      lastViewportHeight = vh;
      camera.aspect = vw / vh;
      camera.updateProjectionMatrix();
      renderer.setSize(vw, vh, true);
    }
    resizeAvatarPreview();
    syncNonOverlappingUiScale();
  });
}

window.addEventListener('resize', syncViewportDimensions, { passive: true });
window.addEventListener('orientationchange', syncViewportDimensions, { passive: true });
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', syncViewportDimensions, { passive: true });
}

window.onload = function () {
  setDeviceMode(state.deviceMode, false);
  applyGraphicsDefinitionMode(state.graphicsMode, false);
  syncViewportDimensions();
  buildPlayerModel();
  setupCharacterCustomization();
  updateAvatarPreviewModel();
  rebuildBiomeScenery('Grass');
  spawnAllPickupsAlongside();
  recalcScore();
  updateHUD();
  syncNonOverlappingUiScale();
  animate();
};
