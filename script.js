// Game Store Application

class GameStore {
    constructor() {
        this.games = this.loadGames();
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderGames();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('suggestionForm').addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Search input
        document.getElementById('searchInput').addEventListener('input', () => this.filterAndRender());

        // Platform filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handlePlatformFilter(e));
        });

        // Genre filter
        document.getElementById('genreFilter').addEventListener('change', () => this.filterAndRender());

        // Add link button
        document.getElementById('addLinkBtn').addEventListener('click', () => this.addLinkInput());

        // Platform checkboxes
        document.querySelectorAll('.platform-check').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updatePlatformsHidden());
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();

        // Get form values
        const gameName = document.getElementById('gameName').value.trim();
        const gameDescription = document.getElementById('gameDescription').value.trim();
        const gameGenre = document.getElementById('gameGenre').value;
        const platforms = document.getElementById('gamePlatforms').value.split(',').filter(p => p);
        const linkInputs = document.querySelectorAll('.link-input');
        const gameLinks = {};

        // Validate platforms
        if (platforms.length === 0) {
            this.showToast('Please select at least one platform', 'error');
            return;
        }

        // Get download links
        linkInputs.forEach(input => {
            const value = input.value.trim();
            if (value) {
                const [platform, url] = value.split(':').map(s => s.trim());
                if (platform && url) {
                    gameLinks[platform] = url;
                }
            }
        });

        // Create game object
        const newGame = {
            id: Date.now(),
            name: gameName,
            description: gameDescription,
            genre: gameGenre,
            platforms: platforms,
            links: gameLinks,
            suggestions: 1,
            timestamp: new Date().toISOString()
        };

        // Check if game already exists (similar name)
        const existingGame = this.games.find(g => g.name.toLowerCase() === gameName.toLowerCase());
        if (existingGame) {
            existingGame.suggestions += 1;
            this.showToast(`Game "${gameName}" already exists! Added 1 suggestion.`, 'warning');
        } else {
            this.games.push(newGame);
            this.showToast(`✨ Game "${gameName}" added successfully!`, 'success');
        }

        // Save and reset
        this.saveGames();
        this.resetForm();
        this.filterAndRender();
    }

    addLinkInput() {
        const container = document.getElementById('linksContainer');
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'link-input';
        input.placeholder = 'e.g., Steam: https://store.steampowered.com/app/...';
        container.appendChild(input);
    }

    updatePlatformsHidden() {
        const checkboxes = document.querySelectorAll('.platform-check:checked');
        const platforms = Array.from(checkboxes).map(cb => cb.value).join(',');
        document.getElementById('gamePlatforms').value = platforms;
    }

    handlePlatformFilter(e) {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Set filter
        this.currentFilter = e.target.dataset.filter;
        this.filterAndRender();
    }

    filterAndRender() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const selectedGenre = document.getElementById('genreFilter').value;

        let filtered = this.games.filter(game => {
            // Search filter
            const matchesSearch = game.name.toLowerCase().includes(searchTerm) ||
                                game.description.toLowerCase().includes(searchTerm);

            // Genre filter
            const matchesGenre = !selectedGenre || game.genre === selectedGenre;

            // Platform filter
            const matchesPlatform = this.currentFilter === 'all' || game.platforms.includes(this.currentFilter);

            return matchesSearch && matchesGenre && matchesPlatform;
        });

        // Sort by suggestions (most suggested first)
        filtered.sort((a, b) => b.suggestions - a.suggestions);

        this.renderGames(filtered);
    }

    renderGames(gamesToRender = this.games) {
        const grid = document.getElementById('gamesGrid');

        if (gamesToRender.length === 0) {
            grid.innerHTML = '<p class="no-games">No games found. Be the first to suggest one! 🎯</p>';
            return;
        }

        grid.innerHTML = gamesToRender.map(game => this.createGameCard(game)).join('');
    }

    createGameCard(game) {
        const platformBadges = game.platforms.map(p => `<span class="platform-badge">${p}</span>`).join('');
        const downloadLinks = Object.entries(game.links)
            .map(([platform, url]) => `
                <a href="${url}" target="_blank" rel="noopener noreferrer" class="download-btn ${platform.toLowerCase()}">
                    📥 ${platform}
                </a>
            `).join('');

        return `
            <div class="game-card">
                <div class="game-card-header">
                    <div>
                        <h3 class="game-title">${this.escapeHtml(game.name)}</h3>
                        <span class="game-genre">${game.genre}</span>
                    </div>
                    <div style="font-size: 0.85em; opacity: 0.9;">👍 ${game.suggestions} suggestion${game.suggestions > 1 ? 's' : ''}</div>
                </div>
                <div class="game-card-body">
                    <p class="game-description">${this.escapeHtml(game.description)}</p>
                    <div class="game-platforms">
                        ${platformBadges}
                    </div>
                    ${downloadLinks ? `<div class="game-links">${downloadLinks}</div>` : '<p style="color: var(--text-light); font-size: 0.9em;">No download links available yet</p>'}
                </div>
            </div>
        `;
    }

    resetForm() {
        document.getElementById('suggestionForm').reset();
        document.getElementById('gamePlatforms').value = '';
        document.querySelectorAll('.platform-check').forEach(cb => cb.checked = false);
        
        // Reset links to single input
        const container = document.getElementById('linksContainer');
        container.innerHTML = '<input type="text" class="link-input" placeholder="e.g., PlayStore: https://play.google.com/store/apps/...">';
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast show ${type}`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // LocalStorage Management
    saveGames() {
        localStorage.setItem('apizGames', JSON.stringify(this.games));
    }

    loadGames() {
        const stored = localStorage.getItem('apizGames');
        // Return stored games or sample data
        return stored ? JSON.parse(stored) : this.getSampleGames();
    }

    getSampleGames() {
        return [
            {
                id: 1,
                name: 'Elden Ring',
                description: 'An action RPG masterpiece with open-world exploration and challenging combat.',
                genre: 'RPG',
                platforms: ['PC', 'Console'],
                links: {
                    'Steam': 'https://store.steampowered.com/app/1331910/ELDEN_RING/',
                    'PlayStation': 'https://www.playstation.com/en-us/games/elden-ring/'
                },
                suggestions: 42,
                timestamp: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Genshin Impact',
                description: 'Free-to-play action RPG with beautiful graphics and cross-platform play.',
                genre: 'Action',
                platforms: ['PC', 'Android', 'iOS', 'Console'],
                links: {
                    'PlayStore': 'https://play.google.com/store/apps/details?id=com.mihoyo.genshinimpact',
                    'AppStore': 'https://apps.apple.com/us/app/genshin-impact/id1517783697'
                },
                suggestions: 38,
                timestamp: new Date().toISOString()
            },
            {
                id: 3,
                name: 'Celeste',
                description: 'A challenging platformer about climbing a mountain. Featuring a touching story and incredible soundtrack.',
                genre: 'Puzzle',
                platforms: ['PC', 'Console', 'Android'],
                links: {
                    'Steam': 'https://store.steampowered.com/app/504230/Celeste/',
                    'PlayStore': 'https://play.google.com/store/apps/details?id=com.xgauthier.celeste'
                },
                suggestions: 28,
                timestamp: new Date().toISOString()
            }
        ];
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new GameStore();
});
