// Ignite Unblocked Games - Pure JavaScript Client
// Works universally: GitHub Pages, unpkg CDN, Vite dev server, and offline

// Fallback dataset in case fetch('./games.json') is blocked (e.g. file:// protocol)
const FALLBACK_GAMES = [
  {
    id: "slope",
    title: "Slope 3D",
    category: "Action",
    description: "Speed down a high-velocity 3D neon tunnel course, dodging red barriers in an endless downhill rush.",
    iframe: '<iframe src="./games/slope/index.html" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="autoplay; fullscreen; gamepad"></iframe>',
    iframeUrl: "./games/slope/index.html",
    thumbnail: "slope",
    controls: "Arrow keys or A / D to steer left and right",
    keys: ["A", "D", "←", "→"],
    badge: "Hot",
    author: "Y8 / Rob Kay",
    tags: ["3d", "speed", "runner", "neon", "reflex"]
  },
  {
    id: "2048",
    title: "2048",
    category: "Puzzle",
    description: "Join matching numbers on the grid and test your logic to create the legendary 2048 tile.",
    iframe: '<iframe src="./games/2048/index.html" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="autoplay; fullscreen; gamepad"></iframe>',
    iframeUrl: "./games/2048/index.html",
    thumbnail: "2048",
    controls: "Arrow keys or WASD to slide tiles across the board",
    keys: ["W", "A", "S", "D", "Arrows"],
    badge: "Classic",
    author: "Gabriele Cirulli",
    tags: ["puzzle", "numbers", "math", "strategy", "relax"]
  },
  {
    id: "snake",
    title: "Snake Neon",
    category: "Retro",
    description: "The timeless retro arcade classic reimagined with glowing neon graphics and sound effects.",
    iframe: '<iframe src="./games/snake/index.html" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="autoplay; fullscreen; gamepad"></iframe>',
    iframeUrl: "./games/snake/index.html",
    thumbnail: "snake",
    controls: "Arrow keys or WASD to turn, Space to pause",
    keys: ["W", "A", "S", "D", "Space"],
    badge: "Popular",
    author: "Nokia / Gremlin",
    tags: ["retro", "arcade", "snake", "classic", "neon"]
  },
  {
    id: "tetris",
    title: "Tetris Classic",
    category: "Puzzle",
    description: "Drop, rotate, and clear lines with falling tetromino bricks in the most famous puzzle game in history.",
    iframe: '<iframe src="./games/tetris/index.html" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="autoplay; fullscreen; gamepad"></iframe>',
    iframeUrl: "./games/tetris/index.html",
    thumbnail: "tetris",
    controls: "Left / Right to move, Up to rotate, Down for soft drop, Space for instant drop",
    keys: ["←", "→", "↑", "↓", "Space"],
    badge: "Top Rated",
    author: "Alexey Pajitnov",
    tags: ["puzzle", "blocks", "retro", "tetris", "classic"]
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    category: "Arcade",
    description: "Tap your wings to navigate through pipes. Deceptively simple yet wildly addictive.",
    iframe: '<iframe src="./games/flappy-bird/index.html" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="autoplay; fullscreen; gamepad"></iframe>',
    iframeUrl: "./games/flappy-bird/index.html",
    thumbnail: "flappy",
    controls: "Spacebar or Left Click to flap and gain altitude",
    keys: ["Space", "Click"],
    badge: "Trending",
    author: "Dong Nguyen",
    tags: ["arcade", "tap", "flappy", "physics", "reflex"]
  },
  {
    id: "dino-runner",
    title: "T-Rex Dino Runner",
    category: "Arcade",
    description: "The beloved offline Chrome browser desert runner. Jump over cacti and dodge pterodactyls.",
    iframe: '<iframe src="./games/dino-runner/index.html" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="autoplay; fullscreen; gamepad"></iframe>',
    iframeUrl: "./games/dino-runner/index.html",
    thumbnail: "dino",
    controls: "Space or Up Arrow to jump, Down Arrow to duck",
    keys: ["Space", "↑", "↓"],
    badge: "Offline",
    author: "Chromium Team",
    tags: ["runner", "dino", "pixel", "endless", "jump"]
  },
  {
    id: "breakout",
    title: "Breakout Brick Buster",
    category: "Arcade",
    description: "Smash your way through vibrant brick walls by bouncing the energy ball with your paddle.",
    iframe: '<iframe src="./games/breakout/index.html" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="autoplay; fullscreen; gamepad"></iframe>',
    iframeUrl: "./games/breakout/index.html",
    thumbnail: "breakout",
    controls: "Mouse or Left / Right arrow keys to maneuver the paddle",
    keys: ["Mouse", "←", "→"],
    badge: "Retro",
    author: "Atari / Steve Wozniak",
    tags: ["arcade", "bricks", "paddle", "bounce", "retro"]
  },
  {
    id: "space-invaders",
    title: "Space Invaders",
    category: "Action",
    description: "Defend Earth against advancing waves of descending alien warships in this legendary arcade shooter.",
    iframe: '<iframe src="./games/space-invaders/index.html" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="autoplay; fullscreen; gamepad"></iframe>',
    iframeUrl: "./games/space-invaders/index.html",
    thumbnail: "space",
    controls: "Arrow keys or A / D to move, Spacebar to fire cannon",
    keys: ["A", "D", "Space"],
    badge: "Classic",
    author: "Tomohiro Nishikado",
    tags: ["space", "shooter", "retro", "aliens", "arcade"]
  },
  {
    id: "pong",
    title: "Pong Retro Table Tennis",
    category: "Sports",
    description: "The genesis of video gaming. Battle the AI or test your reaction speed on the virtual table.",
    iframe: '<iframe src="./games/pong/index.html" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="autoplay; fullscreen; gamepad"></iframe>',
    iframeUrl: "./games/pong/index.html",
    thumbnail: "pong",
    controls: "W / S keys or Mouse to move your paddle up and down",
    keys: ["W", "S", "Mouse"],
    badge: "Original",
    author: "Allan Alcorn",
    tags: ["sports", "pong", "retro", "tennis", "classic"]
  },
  {
    id: "minesweeper",
    title: "Minesweeper",
    category: "Puzzle",
    description: "Clear the minefield without detonating any hidden bombs using numerical clues.",
    iframe: '<iframe src="./games/minesweeper/index.html" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="autoplay; fullscreen; gamepad"></iframe>',
    iframeUrl: "./games/minesweeper/index.html",
    thumbnail: "mines",
    controls: "Left click to uncover cell, Right click to plant a flag",
    keys: ["Left Click", "Right Click"],
    badge: "Logic",
    author: "Curt Johnson",
    tags: ["puzzle", "mines", "logic", "windows", "brain"]
  },
  {
    id: "retro-bowl",
    title: "Retro Bowl",
    category: "Sports",
    description: "Manage your NFL franchise, call plays, and lead your football team to glory in 8-bit retro style.",
    iframe: '<iframe src="https://game316009.hostingerapp.com/" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="autoplay; fullscreen; gamepad"></iframe>',
    iframeUrl: "https://game316009.hostingerapp.com/",
    thumbnail: "retro-bowl",
    controls: "Mouse click and drag to pass, Arrow keys / W/S to dive and juke",
    keys: ["Mouse", "W", "S"],
    badge: "Featured",
    author: "New Star Games",
    tags: ["sports", "football", "retro", "simulation", "nfl"]
  },
  {
    id: "cookie-clicker",
    title: "Cookie Clicker",
    category: "Arcade",
    description: "Bake millions of cookies! Click the giant cookie, hire grandmas, and build intergalactic baking factories.",
    iframe: '<iframe src="https://cookieclicker.ee/" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="autoplay; fullscreen"></iframe>',
    iframeUrl: "https://cookieclicker.ee/",
    thumbnail: "cookie",
    controls: "Left click on cookie and upgrades",
    keys: ["Mouse Click"],
    badge: "Idle",
    author: "Julien Thiennot (Orteil)",
    tags: ["idle", "clicker", "arcade", "casual", "empire"]
  },
  {
    id: "tunnel-rush",
    title: "Tunnel Rush",
    category: "Action",
    description: "Blaze through kaleidoscopic 3D color-shifting tunnels while dodging rotating obstacles.",
    iframe: '<iframe src="https://games.crazygames.com/en_US/tunnel-rush/index.html" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="autoplay; fullscreen"></iframe>',
    iframeUrl: "https://games.crazygames.com/en_US/tunnel-rush/index.html",
    thumbnail: "tunnel",
    controls: "Left and Right arrow keys or A / D to rotate around the tunnel",
    keys: ["A", "D", "←", "→"],
    badge: "Fast",
    author: "Deer Cat Games",
    tags: ["action", "tunnel", "3d", "speed", "reflex"]
  },
  {
    id: "moto-x3m",
    title: "Moto X3M Bike Race",
    category: "Racing",
    description: "Perform insane backflips and frontflips across explosive stunt courses on your motocross bike.",
    iframe: '<iframe src="https://html5.gamedistribution.com/b9794bf3424147748443ce818c39e830/" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="autoplay; fullscreen"></iframe>',
    iframeUrl: "https://html5.gamedistribution.com/b9794bf3424147748443ce818c39e830/",
    thumbnail: "moto",
    controls: "Up arrow to accelerate, Down to brake, Left / Right to tilt and balance",
    keys: ["↑", "↓", "←", "→"],
    badge: "Racing",
    author: "MadPuffers",
    tags: ["racing", "bike", "physics", "stunts", "extreme"]
  },
  {
    id: "paper-io-2",
    title: "Paper.io 2",
    category: "Action",
    description: "Conquer as much territory as possible, encircle land, and eliminate rivals in the multiplayer arena.",
    iframe: '<iframe src="https://paper-io.com/" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="autoplay; fullscreen"></iframe>',
    iframeUrl: "https://paper-io.com/",
    thumbnail: "paper",
    controls: "Mouse direction or Arrow keys / WASD to steer line",
    keys: ["Mouse", "WASD"],
    badge: "Arena",
    author: "Voodoo",
    tags: ["action", "io", "multiplayer", "territory", "arena"]
  }
];

const THUMB_GRADIENTS = {
  slope: 'from-cyan-600 via-blue-700 to-indigo-900',
  '2048': 'from-amber-500 via-orange-600 to-red-700',
  snake: 'from-emerald-600 via-teal-700 to-slate-900',
  tetris: 'from-indigo-600 via-purple-700 to-pink-900',
  flappy: 'from-sky-500 via-amber-500 to-emerald-700',
  dino: 'from-slate-600 via-zinc-700 to-slate-900',
  breakout: 'from-pink-600 via-rose-700 to-amber-700',
  space: 'from-purple-600 via-violet-800 to-slate-950',
  pong: 'from-sky-600 via-blue-800 to-slate-950',
  mines: 'from-slate-700 via-slate-800 to-zinc-900',
  'retro-bowl': 'from-amber-700 via-yellow-800 to-stone-900',
  cookie: 'from-amber-600 via-yellow-700 to-orange-900',
  tunnel: 'from-fuchsia-600 via-rose-700 to-violet-950',
  moto: 'from-orange-600 via-red-700 to-zinc-950',
  paper: 'from-emerald-500 via-cyan-600 to-blue-800',
};

const GAME_SYMBOLS = {
  slope: '⚡',
  '2048': '2048',
  snake: '🐍',
  tetris: '🧱',
  flappy: '🐥',
  dino: '🦖',
  breakout: '🏓',
  space: '👾',
  pong: '⚪',
  mines: '💣',
  'retro-bowl': '🏈',
  cookie: '🍪',
  tunnel: '🌀',
  moto: '🏍️',
  paper: '🗺️',
};

const CLOAK_PRESETS = [
  {
    name: 'Default',
    title: 'Ignite Unblocked Games',
    favicon: './vite.svg'
  },
  {
    name: 'Google Classroom',
    title: 'Classes - Google Classroom',
    favicon: 'https://ssl.gstatic.com/classroom/favicon.png'
  },
  {
    name: 'Google Docs',
    title: 'Untitled document - Google Docs',
    favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico'
  },
  {
    name: 'Google Drive',
    title: 'My Drive - Google Drive',
    favicon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png'
  },
  {
    name: 'Canvas LMS',
    title: 'Dashboard',
    favicon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico'
  },
  {
    name: 'Wikipedia',
    title: 'Wikipedia, the free encyclopedia',
    favicon: 'https://en.wikipedia.org/static/favicon/wikipedia.ico'
  }
];

// App State
let allGames = [];
let favorites = ['slope', '2048', 'tetris', 'snake'];
let activeCategory = 'All';
let searchQuery = '';
let selectedGame = null;
let activeCloak = 'Default';
let isTheater = false;

// Initialization
async function initApp() {
  loadFavorites();
  await loadGames();
  setupEventListeners();
  renderCategoryPills();
  renderView();
}

// LocalStorage helpers
function loadFavorites() {
  try {
    const saved = localStorage.getItem('ignite_favorites');
    if (saved) favorites = JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
}

function saveFavorites() {
  try {
    localStorage.setItem('ignite_favorites', JSON.stringify(favorites));
  } catch (e) {
    console.error(e);
  }
}

function getCustomGames() {
  try {
    const saved = localStorage.getItem('ignite_custom_games');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

function saveCustomGames(customGames) {
  try {
    localStorage.setItem('ignite_custom_games', JSON.stringify(customGames));
  } catch (e) {
    console.error(e);
  }
}

// Load games from games.json with fallback
async function loadGames() {
  let baseGames = FALLBACK_GAMES;
  try {
    const res = await fetch('./games.json');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        baseGames = data;
      }
    }
  } catch (err) {
    console.warn('Loading fallback games data:', err);
  }

  const customGames = getCustomGames();
  allGames = [...baseGames, ...customGames];
}

// Setup Event Listeners
function setupEventListeners() {
  // Brand logo home click
  document.getElementById('brand-logo')?.addEventListener('click', () => {
    selectedGame = null;
    activeCategory = 'All';
    searchQuery = '';
    const searchInput = document.getElementById('game-search-input');
    if (searchInput) searchInput.value = '';
    renderCategoryPills();
    renderView();
  });

  // Search Input
  const searchInput = document.getElementById('game-search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  searchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    if (clearSearchBtn) {
      clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
    }
    if (selectedGame) selectedGame = null;
    renderView();
  });

  clearSearchBtn?.addEventListener('click', () => {
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    renderView();
  });

  // Header buttons
  document.getElementById('filter-favorites-btn')?.addEventListener('click', () => {
    activeCategory = activeCategory === 'Favorites' ? 'All' : 'Favorites';
    if (selectedGame) selectedGame = null;
    renderCategoryPills();
    renderView();
  });

  document.getElementById('btn-random-game')?.addEventListener('click', playRandomGame);
  document.getElementById('random-quick-play-btn')?.addEventListener('click', playRandomGame);

  document.getElementById('btn-add-custom-game')?.addEventListener('click', openAddGameModal);
  document.getElementById('btn-view-json')?.addEventListener('click', openJsonModal);
  document.getElementById('browse-json-storage-btn')?.addEventListener('click', openJsonModal);
  document.getElementById('footer-view-json')?.addEventListener('click', openJsonModal);

  document.getElementById('btn-tab-cloak')?.addEventListener('click', openTabCloakModal);
  document.getElementById('footer-tab-cloak')?.addEventListener('click', openTabCloakModal);

  // Add game modal submit
  document.getElementById('add-game-form')?.addEventListener('submit', handleAddGameSubmit);

  // Close modal buttons
  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', closeAllModals);
  });
}

function playRandomGame() {
  if (!allGames.length) return;
  const rand = allGames[Math.floor(Math.random() * allGames.length)];
  playGame(rand);
}

function playGame(game) {
  selectedGame = game;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderView();
}

function toggleFavorite(id, e) {
  if (e) e.stopPropagation();
  if (favorites.includes(id)) {
    favorites = favorites.filter((f) => f !== id);
  } else {
    favorites.push(id);
  }
  saveFavorites();
  updateFavoritesCount();
  renderView();
}

function updateFavoritesCount() {
  const countEl = document.getElementById('favorites-badge-count');
  if (countEl) countEl.textContent = favorites.length;
}

// Category Pills
function renderCategoryPills() {
  const container = document.getElementById('category-pills-container');
  if (!container) return;

  const categories = [
    { id: 'All', label: 'All Games', icon: '🧭' },
    { id: 'Action', label: 'Action', icon: '🔥' },
    { id: 'Arcade', label: 'Arcade', icon: '🎮' },
    { id: 'Puzzle', label: 'Puzzle', icon: '🧩' },
    { id: 'Sports', label: 'Sports', icon: '🏆' },
    { id: 'Retro', label: 'Retro', icon: '✨' },
    { id: 'Racing', label: 'Racing', icon: '🏎️' },
  ];

  // Calculate counts
  const counts = { All: allGames.length };
  allGames.forEach((g) => {
    counts[g.category] = (counts[g.category] || 0) + 1;
  });

  container.innerHTML = categories
    .map((cat) => {
      const isActive = activeCategory === cat.id;
      const count = counts[cat.id] || 0;
      return `
        <button
          onclick="selectCategory('${cat.id}')"
          class="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 border ${
            isActive
              ? 'bg-orange-500 text-slate-950 font-bold border-orange-400 shadow-md shadow-orange-500/20 scale-[1.02]'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700'
          }"
        >
          <span>${cat.icon}</span>
          <span>${cat.label}</span>
          <span class="text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
            isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
          }">
            ${count}
          </span>
        </button>
      `;
    })
    .join('');
}

window.selectCategory = function (cat) {
  activeCategory = cat;
  if (selectedGame) selectedGame = null;
  renderCategoryPills();
  renderView();
};

// Render Main View (Catalog or Player)
function renderView() {
  updateFavoritesCount();

  const catalogView = document.getElementById('catalog-view');
  const playerView = document.getElementById('player-view');

  if (selectedGame) {
    if (catalogView) catalogView.style.display = 'none';
    if (playerView) {
      playerView.style.display = 'block';
      renderPlayer(selectedGame);
    }
  } else {
    if (playerView) playerView.style.display = 'none';
    if (catalogView) {
      catalogView.style.display = 'block';
      renderCatalog();
    }
  }
}

// Render Catalog Grid
function renderCatalog() {
  const grid = document.getElementById('games-grid');
  const emptyState = document.getElementById('empty-state');
  const statusEl = document.getElementById('filter-status-text');

  // Filter games
  let filtered = allGames.filter((game) => {
    if (activeCategory === 'Favorites') {
      if (!favorites.includes(game.id)) return false;
    } else if (activeCategory !== 'All' && game.category !== activeCategory) {
      return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = game.title.toLowerCase().includes(q);
      const matchDesc = game.description.toLowerCase().includes(q);
      const matchCat = game.category.toLowerCase().includes(q);
      const matchTags = game.tags && game.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchCat && !matchTags) return false;
    }

    return true;
  });

  // Update status text
  if (statusEl) {
    statusEl.innerHTML = `Showing <b class="text-slate-100">${filtered.length}</b> ${
      filtered.length === 1 ? 'game' : 'games'
    }${activeCategory !== 'All' ? ` in <b class="text-orange-400">${activeCategory}</b>` : ''}${
      searchQuery ? ` matching "<b class="text-slate-200">${escapeHtml(searchQuery)}</b>"` : ''
    }`;
  }

  if (filtered.length === 0) {
    if (grid) grid.style.display = 'none';
    if (emptyState) emptyState.style.display = 'flex';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (grid) {
    grid.style.display = 'grid';
    grid.innerHTML = filtered
      .map((game) => {
        const isFav = favorites.includes(game.id);
        const gradient = THUMB_GRADIENTS[game.thumbnail] || 'from-orange-600 via-slate-800 to-slate-950';
        const symbol = GAME_SYMBOLS[game.thumbnail] || '🎮';

        return `
          <div
            id="game-card-${game.id}"
            onclick="playGameById('${game.id}')"
            class="group relative bg-slate-900/90 rounded-xl border border-slate-800 hover:border-orange-500/50 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 select-none"
          >
            <div class="relative w-full h-36 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden">
              <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:16px_16px] opacity-40"></div>
              <span class="text-5xl drop-shadow-md group-hover:scale-110 transition-transform duration-200">
                ${symbol}
              </span>
              ${
                game.badge
                  ? `<span class="absolute top-2.5 left-2.5 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-950/70 backdrop-blur-md text-orange-300 border border-orange-500/30 tracking-wider shadow-sm flex items-center gap-1">
                      ✨ ${game.badge}
                    </span>`
                  : ''
              }
              <button
                onclick="event.stopPropagation(); window.toggleFav('${game.id}', event);"
                title="${isFav ? 'Remove from favorites' : 'Add to favorites'}"
                class="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-slate-950/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-slate-950 hover:scale-110 transition-all"
              >
                <span class="${isFav ? 'text-amber-400' : 'text-slate-400'} text-xs">★</span>
              </button>
              <div class="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <div class="w-12 h-12 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-orange-500/40 group-hover:scale-105 transition-transform text-lg pl-0.5">
                  ▶
                </div>
              </div>
            </div>
            <div class="p-3.5 flex flex-col flex-1 justify-between gap-2">
              <div>
                <div class="flex items-center justify-between gap-1 mb-1">
                  <h3 class="font-bold text-sm text-slate-100 group-hover:text-orange-400 transition-colors truncate">
                    ${escapeHtml(game.title)}
                  </h3>
                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 shrink-0">
                    ${escapeHtml(game.category)}
                  </span>
                </div>
                <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  ${escapeHtml(game.description)}
                </p>
              </div>
              <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span class="truncate">${escapeHtml(game.author || 'Ignite Game')}</span>
                <span class="text-orange-400 font-semibold group-hover:underline flex items-center gap-1">
                  Play Game →
                </span>
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  }
}

window.playGameById = function (id) {
  const g = allGames.find((item) => item.id === id);
  if (g) playGame(g);
};

window.toggleFav = function (id, e) {
  toggleFavorite(id, e);
};

// Render Game Player
function renderPlayer(game) {
  const isFav = favorites.includes(game.id);
  const container = document.getElementById('player-view');
  if (!container) return;

  const related = allGames.filter(
    (g) => g.id !== game.id && (g.category === game.category || favorites.includes(g.id))
  ).slice(0, 6);

  container.innerHTML = `
    <div class="w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 flex flex-col gap-4">
      <!-- Top Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-md">
        <div class="flex items-center gap-3">
          <button
            id="player-back-btn"
            onclick="window.exitPlayer()"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <span>←</span>
            <span>All Games</span>
          </button>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-base sm:text-lg font-extrabold text-slate-100 truncate max-w-[200px] sm:max-w-xs">
                ${escapeHtml(game.title)}
              </h2>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                ${escapeHtml(game.category)}
              </span>
            </div>
            ${game.author ? `<p class="text-[11px] text-slate-400">By ${escapeHtml(game.author)}</p>` : ''}
          </div>
        </div>

        <div class="flex items-center gap-1.5 sm:gap-2">
          <!-- Favorite -->
          <button
            onclick="window.toggleFav('${game.id}', event);"
            title="${isFav ? 'Starred' : 'Star this game'}"
            class="p-2 rounded-lg border text-xs font-semibold transition-all ${
              isFav ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }"
          >
            <span class="${isFav ? 'text-amber-400' : 'text-slate-400'}">★</span>
          </button>

          <!-- Reload -->
          <button
            onclick="window.reloadIframe()"
            title="Reload game iframe"
            class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all text-xs"
          >
            🔄
          </button>

          <!-- Theater Mode -->
          <button
            onclick="window.toggleTheater()"
            title="Toggle Theater Mode"
            class="px-2.5 py-1.5 rounded-lg border text-xs font-semibold hidden md:flex items-center gap-1.5 transition-all ${
              isTheater ? 'bg-orange-600 text-white border-orange-500' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }"
          >
            <span>⛶ Theater</span>
          </button>

          <!-- Stealth Tab -->
          <button
            onclick="window.openStealthTab()"
            title="Open in an unblocked about:blank cloaked tab"
            class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition-all"
          >
            <span class="text-sky-400">↗</span>
            <span class="hidden sm:inline">Stealth Tab</span>
          </button>

          <!-- Fullscreen -->
          <button
            onclick="window.toggleFullscreen()"
            title="Enter Fullscreen"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shadow-md shadow-orange-600/30 transition-all"
          >
            <span>Fullscreen</span>
          </button>
        </div>
      </div>

      <!-- Stage Viewport -->
      <div
        id="game-viewport-container"
        class="relative w-full rounded-2xl bg-black border-2 border-slate-800 shadow-2xl overflow-hidden transition-all duration-300 flex items-center justify-center ${
          isTheater ? 'h-[80vh] max-h-[850px]' : 'h-[560px] max-h-[75vh]'
        }"
      >
        <iframe
          id="active-game-iframe"
          src="${escapeHtml(game.iframeUrl)}"
          title="${escapeHtml(game.title)}"
          class="w-full h-full border-0 block"
          allowfullscreen="true"
          allow="autoplay; fullscreen; gamepad; microphone; camera"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock allow-modals"
        ></iframe>
      </div>

      <!-- Controls & Iframe Info -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-orange-400">🎮</span>
              <h3 class="text-sm font-bold text-slate-100">Controls & How to Play</h3>
            </div>
            ${
              game.keys && game.keys.length > 0
                ? `<div class="flex flex-wrap gap-1">
                    ${game.keys
                      .map(
                        (k) =>
                          `<kbd class="px-2 py-0.5 text-[11px] font-mono font-bold bg-slate-800 border border-slate-700 text-orange-300 rounded shadow-sm">${escapeHtml(
                            k
                          )}</kbd>`
                      )
                      .join('')}
                  </div>`
                : ''
            }
          </div>

          <p class="text-sm text-slate-300 leading-relaxed font-medium">
            ${escapeHtml(game.controls)}
          </p>

          <div class="pt-3 border-t border-slate-800 flex items-start gap-2 text-xs text-slate-400">
            <span>ℹ️</span>
            <p>${escapeHtml(game.description)}</p>
          </div>

          ${
            game.tags && game.tags.length > 0
              ? `<div class="flex flex-wrap gap-1.5 pt-1">
                  ${game.tags
                    .map(
                      (tag) =>
                        `<span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/60">#${escapeHtml(
                          tag
                        )}</span>`
                    )
                    .join('')}
                </div>`
              : ''
          }
        </div>

        <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-3">
          <div>
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-1.5">
                <span class="text-cyan-400">💻</span>
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300">
                  JSON Iframe Record
                </h4>
              </div>
              <button
                id="copy-iframe-code-btn"
                onclick="window.copyCurrentIframe()"
                class="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 font-semibold"
              >
                📋 Copy Iframe
              </button>
            </div>
            <p class="text-xs text-slate-400 mb-2">
              This game is stored directly inside <code class="text-orange-300">games.json</code>:
            </p>
            <div class="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 break-all select-all">
              ${escapeHtml(game.iframe)}
            </div>
          </div>
          <div class="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-2">
            <span>ID: <code class="text-slate-300 font-mono">${escapeHtml(game.id)}</code></span>
            <span class="text-emerald-400 font-medium">Unblocked • 0 AI</span>
          </div>
        </div>
      </div>

      <!-- Related Games Strip -->
      ${
        related.length > 0
          ? `<div class="mt-2">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                More ${escapeHtml(game.category)} Games You Might Like
              </h4>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                ${related
                  .map(
                    (rel) => `
                  <div
                    onclick="playGameById('${rel.id}')"
                    class="bg-slate-900 border border-slate-800 hover:border-orange-500/50 rounded-lg p-2.5 cursor-pointer group transition-all"
                  >
                    <div class="text-center font-bold text-xs text-slate-200 group-hover:text-orange-400 truncate mb-1">
                      ${escapeHtml(rel.title)}
                    </div>
                    <div class="text-[10px] text-slate-400 text-center">
                      ${escapeHtml(rel.category)}
                    </div>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>`
          : ''
      }
    </div>
  `;
}

// Window player functions
window.exitPlayer = function () {
  selectedGame = null;
  renderView();
};

window.reloadIframe = function () {
  const frame = document.getElementById('active-game-iframe');
  if (frame) {
    const src = frame.src;
    frame.src = '';
    setTimeout(() => {
      frame.src = src;
    }, 100);
  }
};

window.toggleTheater = function () {
  isTheater = !isTheater;
  const viewport = document.getElementById('game-viewport-container');
  if (viewport) {
    if (isTheater) {
      viewport.classList.remove('h-[560px]', 'max-h-[75vh]');
      viewport.classList.add('h-[80vh]', 'max-h-[850px]');
    } else {
      viewport.classList.remove('h-[80vh]', 'max-h-[850px]');
      viewport.classList.add('h-[560px]', 'max-h-[75vh]');
    }
  }
};

window.toggleFullscreen = function () {
  const viewport = document.getElementById('game-viewport-container');
  if (!viewport) return;
  if (!document.fullscreenElement) {
    viewport.requestFullscreen().catch(console.error);
  } else {
    document.exitFullscreen().catch(console.error);
  }
};

window.openStealthTab = function () {
  if (!selectedGame) return;
  const newWindow = window.open('about:blank', '_blank');
  if (!newWindow) {
    alert('Popup blocked! Please allow popups to open game in stealth window.');
    return;
  }
  newWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Google Docs</title>
        <link rel="icon" href="https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" />
        <style>
          html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
          iframe { width: 100%; height: 100%; border: none; }
        </style>
      </head>
      <body>
        ${selectedGame.iframe}
      </body>
    </html>
  `);
  newWindow.document.close();
};

window.copyCurrentIframe = function () {
  if (!selectedGame) return;
  navigator.clipboard.writeText(selectedGame.iframe);
  const btn = document.getElementById('copy-iframe-code-btn');
  if (btn) {
    btn.innerHTML = '✅ Copied!';
    setTimeout(() => {
      btn.innerHTML = '📋 Copy Iframe';
    }, 2000);
  }
};

// Modals Handling
function closeAllModals() {
  document.getElementById('add-game-modal')?.classList.add('hidden');
  document.getElementById('json-viewer-modal')?.classList.add('hidden');
  document.getElementById('tab-cloak-modal')?.classList.add('hidden');
}

function openAddGameModal() {
  closeAllModals();
  document.getElementById('add-game-modal')?.classList.remove('hidden');
}

function openJsonModal() {
  closeAllModals();
  const modal = document.getElementById('json-viewer-modal');
  const codeEl = document.getElementById('json-modal-code');
  if (modal && codeEl) {
    codeEl.textContent = JSON.stringify(allGames, null, 2);
    modal.classList.remove('hidden');
  }
}

function openTabCloakModal() {
  closeAllModals();
  const listEl = document.getElementById('cloak-options-list');
  if (listEl) {
    listEl.innerHTML = CLOAK_PRESETS.map((preset) => {
      const isSelected = activeCloak === preset.name;
      return `
        <button
          onclick="window.applyCloak('${preset.name}')"
          class="w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
            isSelected
              ? 'bg-sky-500/15 border-sky-500/50 text-white'
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
          }"
        >
          <div class="flex items-center gap-3">
            <img src="${preset.favicon}" alt="${preset.name}" class="w-5 h-5 object-contain" onerror="this.style.display='none'" />
            <div>
              <div class="font-semibold text-xs text-slate-200">${preset.name}</div>
              <div class="text-[10px] text-slate-400 truncate max-w-[240px]">${preset.title}</div>
            </div>
          </div>
          ${isSelected ? '<span class="text-sky-400 font-bold">✓</span>' : ''}
        </button>
      `;
    }).join('');
  }
  document.getElementById('tab-cloak-modal')?.classList.remove('hidden');
}

window.applyCloak = function (name) {
  const preset = CLOAK_PRESETS.find((p) => p.name === name);
  if (!preset) return;
  activeCloak = preset.name;
  document.title = preset.title;

  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = preset.favicon;

  const footerBtn = document.getElementById('footer-tab-cloak');
  if (footerBtn) footerBtn.textContent = `Tab Cloaker (${activeCloak})`;

  closeAllModals();
};

function handleAddGameSubmit(e) {
  e.preventDefault();
  const title = document.getElementById('custom-title-input')?.value.trim();
  const category = document.getElementById('custom-cat-input')?.value || 'Arcade';
  const iframeInput = document.getElementById('custom-iframe-input')?.value.trim();
  const controls = document.getElementById('custom-controls-input')?.value.trim() || 'Keyboard and Mouse';
  const description = document.getElementById('custom-desc-input')?.value.trim() || 'Custom user-added game.';
  const errorEl = document.getElementById('custom-game-error');

  if (!title || !iframeInput) {
    if (errorEl) {
      errorEl.textContent = 'Please provide both a title and iframe code or URL.';
      errorEl.classList.remove('hidden');
    }
    return;
  }

  let rawIframe = iframeInput;
  let extractedUrl = '';

  if (rawIframe.startsWith('<iframe') || rawIframe.includes('<iframe')) {
    const match = rawIframe.match(/src=["']([^"']+)["']/);
    if (match && match[1]) {
      extractedUrl = match[1];
    } else {
      if (errorEl) {
        errorEl.textContent = 'Invalid iframe: missing src attribute.';
        errorEl.classList.remove('hidden');
      }
      return;
    }
  } else if (rawIframe.startsWith('http://') || rawIframe.startsWith('https://') || rawIframe.startsWith('./') || rawIframe.startsWith('/')) {
    extractedUrl = rawIframe;
    rawIframe = `<iframe src="${extractedUrl}" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="autoplay; fullscreen; gamepad"></iframe>`;
  } else {
    if (errorEl) {
      errorEl.textContent = 'Please enter a valid URL or <iframe> embed code.';
      errorEl.classList.remove('hidden');
    }
    return;
  }

  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `custom-${Date.now()}`;
  const newGame = {
    id: `${id}-${Date.now().toString().slice(-4)}`,
    title,
    category,
    description,
    iframe: rawIframe,
    iframeUrl: extractedUrl,
    thumbnail: 'slope',
    controls,
    keys: ['Mouse', 'WASD'],
    badge: 'Custom',
    author: 'User Added',
    tags: ['custom', category.toLowerCase()],
    isCustom: true
  };

  const customGames = getCustomGames();
  customGames.unshift(newGame);
  saveCustomGames(customGames);

  allGames.unshift(newGame);
  closeAllModals();
  document.getElementById('add-game-form')?.reset();
  renderCategoryPills();
  playGame(newGame);
}

// Global utilities
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

window.copyJsonData = function () {
  navigator.clipboard.writeText(JSON.stringify(allGames, null, 2));
  const btn = document.getElementById('copy-json-btn');
  if (btn) {
    btn.innerHTML = '✅ Copied!';
    setTimeout(() => {
      btn.innerHTML = '📋 Copy JSON';
    }, 2000);
  }
};

window.downloadJsonData = function () {
  const blob = new Blob([JSON.stringify(allGames, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'games.json';
  a.click();
  URL.revokeObjectURL(url);
};

window.resetSearchAndCategory = function () {
  activeCategory = 'All';
  searchQuery = '';
  const searchInput = document.getElementById('game-search-input');
  if (searchInput) searchInput.value = '';
  renderCategoryPills();
  renderView();
};

window.openAddGameModal = openAddGameModal;

// Launch on DOM ready
document.addEventListener('DOMContentLoaded', initApp);
