<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎮 Apiz Store</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #667eea;
            --secondary: #764ba2;
            --success: #10b981;
            --light-bg: #f8fafc;
            --dark-bg: #0f172a;
            --text-dark: #1e293b;
            --text-light: #64748b;
            --border: #e2e8f0;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: var(--text-dark);
            min-height: 100vh;
            padding: 15px;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            color: white;
            margin-bottom: 30px;
            padding: 30px 20px;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .header p {
            font-size: 1.1em;
            opacity: 0.95;
        }

        /* Search Section */
        .search-box {
            background: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 30px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .search-input {
            flex: 1;
            min-width: 200px;
            padding: 12px 15px;
            border: 2px solid var(--border);
            border-radius: 8px;
            font-size: 1em;
        }

        .search-input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .btn {
            padding: 12px 25px;
            border: none;
            border-radius: 8px;
            font-size: 0.95em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-search {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
        }

        .btn-search:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 15px rgba(102, 126, 234, 0.4);
        }

        /* Filter Buttons */
        .filters {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-bottom: 20px;
        }

        .filter-btn {
            padding: 8px 16px;
            background: white;
            color: var(--text-dark);
            border: 2px solid var(--border);
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .filter-btn.active,
        .filter-btn:hover {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }

        /* Games Grid */
        .games-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .game-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }

        .game-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 24px rgba(102, 126, 234, 0.2);
            border-color: var(--primary);
        }

        .game-header {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 20px;
        }

        .game-title {
            font-size: 1.4em;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .game-genre {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.85em;
        }

        .game-body {
            padding: 20px;
        }

        .game-description {
            color: var(--text-light);
            margin-bottom: 15px;
            line-height: 1.5;
            font-size: 0.95em;
        }

        .game-platforms {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-bottom: 15px;
        }

        .platform-tag {
            background: var(--light-bg);
            color: var(--primary);
            padding: 5px 12px;
            border-radius: 6px;
            font-size: 0.8em;
            font-weight: 600;
        }

        .download-links {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .download-btn {
            display: inline-block;
            padding: 10px 15px;
            background: var(--success);
            color: white;
            text-decoration: none;
            border-radius: 6px;
            text-align: center;
            font-size: 0.9em;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }

        .download-btn:hover {
            background: #059669;
            transform: translateY(-2px);
        }

        .suggestions-count {
            font-size: 0.85em;
            color: var(--text-light);
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid var(--border);
        }

        /* Suggestion Form */
        .form-section {
            background: white;
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 30px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .form-section h2 {
            color: var(--primary);
            margin-bottom: 20px;
            font-size: 1.5em;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--text-dark);
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 12px;
            border: 2px solid var(--border);
            border-radius: 8px;
            font-size: 1em;
            font-family: inherit;
            transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 80px;
        }

        .checkboxes {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 10px;
        }

        .checkbox-label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: normal;
            margin: 0;
            cursor: pointer;
        }

        .checkbox-label input {
            width: auto;
            margin: 0;
        }

        .submit-btn {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 15px 40px;
            width: 100%;
            font-size: 1.1em;
        }

        .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .no-games {
            text-align: center;
            padding: 60px 20px;
            color: white;
            font-size: 1.2em;
        }

        .message {
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 8px;
            display: none;
        }

        .message.success {
            background: #d1fae5;
            color: #065f46;
            display: block;
        }

        .message.error {
            background: #fee2e2;
            color: #991b1b;
            display: block;
        }

        .footer {
            text-align: center;
            color: white;
            padding: 20px;
            opacity: 0.9;
        }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 1.8em;
            }

            .games-grid {
                grid-template-columns: 1fr;
            }

            .search-box {
                flex-direction: column;
            }

            .search-input {
                min-width: 100%;
            }

            .btn-search {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>🎮 Apiz Store</h1>
            <p>Discover, Suggest & Download Your Favorite Games</p>
        </div>

        <!-- Message Display -->
        <div id="message" class="message"></div>

        <!-- Search Section -->
        <div class="search-box">
            <input 
                type="text" 
                id="searchInput" 
                class="search-input" 
                placeholder="Search games..."
            >
            <button class="btn btn-search" onclick="filterGames()">🔍 Search</button>
        </div>

        <!-- Filters -->
        <div class="filters">
            <button class="filter-btn active" onclick="filterByPlatform('all')">All</button>
            <button class="filter-btn" onclick="filterByPlatform('PC')">PC</button>
            <button class="filter-btn" onclick="filterByPlatform('Android')">Android</button>
            <button class="filter-btn" onclick="filterByPlatform('iOS')">iOS</button>
            <button class="filter-btn" onclick="filterByPlatform('Console')">Console</button>
        </div>

        <!-- Suggest a Game Form -->
        <div class="form-section">
            <h2>✨ Suggest a Game</h2>
            <form onsubmit="submitGame(event)">
                <div class="form-group">
                    <label>Game Name *</label>
                    <input type="text" id="gameName" required placeholder="e.g., Elden Ring">
                </div>

                <div class="form-group">
                    <label>Description *</label>
                    <textarea id="gameDesc" required placeholder="Describe the game..."></textarea>
                </div>

                <div class="form-group">
                    <label>Available Platforms *</label>
                    <div class="checkboxes">
                        <label class="checkbox-label">
                            <input type="checkbox" value="PC" class="platform-check"> PC
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" value="Android" class="platform-check"> Android
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" value="iOS" class="platform-check"> iOS
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" value="Console" class="platform-check"> Console
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" value="Web" class="platform-check"> Web
                        </label>
                    </div>
                </div>

                <div class="form-group">
                    <label>Genre *</label>
                    <select id="gameGenre" required>
                        <option value="">Select Genre</option>
                        <option value="Action">Action</option>
                        <option value="RPG">RPG</option>
                        <option value="Puzzle">Puzzle</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Strategy">Strategy</option>
                        <option value="Sports">Sports</option>
                        <option value="Racing">Racing</option>
                        <option value="Casual">Casual</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Download Link (Optional)</label>
                    <input type="url" id="gameLink" placeholder="e.g., https://play.google.com/store/apps/...">
                </div>

                <button type="submit" class="btn submit-btn">🚀 Submit Suggestion</button>
            </form>
        </div>

        <!-- Games Grid -->
        <div id="gamesGrid" class="games-grid">
            <p class="no-games">No games yet. Be the first to suggest one! 🎯</p>
        </div>
    </div>

    <!-- Footer -->
    <div class="footer">
        <p>Made with ❤️ for gamers | Apiz Store</p>
    </div>

    <script>
        // Game Store Class
        class GameStore {
            constructor() {
                this.games = this.loadGames();
                this.currentFilter = 'all';
                this.renderGames();
            }

            loadGames() {
                const stored = localStorage.getItem('apizGames');
                if (stored) {
                    return JSON.parse(stored);
                }
                // Sample games
                return [
                    {
                        id: 1,
                        name: 'Elden Ring',
                        description: 'An action RPG with open-world exploration and challenging combat.',
                        genre: 'RPG',
                        platforms: ['PC', 'Console'],
                        link: 'https://store.steampowered.com/app/1331910/ELDEN_RING/',
                        suggestions: 42
                    },
                    {
                        id: 2,
                        name: 'Genshin Impact',
                        description: 'Free-to-play action RPG with beautiful graphics.',
                        genre: 'Action',
                        platforms: ['PC', 'Android', 'iOS', 'Console'],
                        link: 'https://play.google.com/store/apps/details?id=com.mihoyo.genshinimpact',
                        suggestions: 38
                    },
                    {
                        id: 3,
                        name: 'Celeste',
                        description: 'A challenging platformer with an amazing story.',
                        genre: 'Puzzle',
                        platforms: ['PC', 'Console', 'Android'],
                        link: 'https://store.steampowered.com/app/504230/Celeste/',
                        suggestions: 28
                    }
                ];
            }

            saveGames() {
                localStorage.setItem('apizGames', JSON.stringify(this.games));
            }

            addGame(name, desc, platforms, genre, link) {
                // Check if game exists
                const existing = this.games.find(g => g.name.toLowerCase() === name.toLowerCase());
                
                if (existing) {
                    existing.suggestions += 1;
                    this.showMessage(`Game already exists! Added 1 vote for "${name}"`, 'success');
                } else {
                    const newGame = {
                        id: Date.now(),
                        name,
                        description: desc,
                        genre,
                        platforms,
                        link: link || '',
                        suggestions: 1
                    };
                    this.games.push(newGame);
                    this.showMessage(`✨ "${name}" added successfully!`, 'success');
                }

                this.saveGames();
                this.renderGames();
            }

            filterByPlatform(platform) {
                this.currentFilter = platform;
                this.renderGames();
            }

            filterBySearch(term) {
                const filtered = this.games.filter(game =>
                    game.name.toLowerCase().includes(term.toLowerCase()) ||
                    game.description.toLowerCase().includes(term.toLowerCase())
                );

                if (filtered.length === 0) {
                    document.getElementById('gamesGrid').innerHTML = '<p class="no-games">No games found 🔍</p>';
                    return;
                }

                this.renderGamesList(filtered);
            }

            renderGames() {
                let filtered = this.games;

                if (this.currentFilter !== 'all') {
                    filtered = filtered.filter(game => game.platforms.includes(this.currentFilter));
                }

                // Sort by suggestions
                filtered.sort((a, b) => b.suggestions - a.suggestions);

                if (filtered.length === 0) {
                    document.getElementById('gamesGrid').innerHTML = '<p class="no-games">No games for this filter. Be the first to suggest! 🎯</p>';
                    return;
                }

                this.renderGamesList(filtered);
            }

            renderGamesList(games) {
                const grid = document.getElementById('gamesGrid');
                grid.innerHTML = games.map(game => this.createGameCard(game)).join('');
            }

            createGameCard(game) {
                const platforms = game.platforms.map(p => `<span class="platform-tag">${p}</span>`).join('');
                const downloadBtn = game.link ? 
                    `<a href="${game.link}" target="_blank" class="download-btn">📥 Download</a>` : 
                    '<button class="download-btn" disabled>No Link</button>';

                return `
                    <div class="game-card">
                        <div class="game-header">
                            <div class="game-title">${game.name}</div>
                            <span class="game-genre">${game.genre}</span>
                        </div>
                        <div class="game-body">
                            <p class="game-description">${game.description}</p>
                            <div class="game-platforms">${platforms}</div>
                            <div class="download-links">
                                ${downloadBtn}
                            </div>
                            <div class="suggestions-count">👍 ${game.suggestions} suggestion${game.suggestions > 1 ? 's' : ''}</div>
                        </div>
                    </div>
                `;
            }

            showMessage(text, type) {
                const msg = document.getElementById('message');
                msg.textContent = text;
                msg.className = `message ${type}`;
                setTimeout(() => {
                    msg.className = 'message';
                }, 3000);
            }
        }

        // Initialize
        const store = new GameStore();

        // Form submission
        function submitGame(e) {
            e.preventDefault();

            const name = document.getElementById('gameName').value.trim();
            const desc = document.getElementById('gameDesc').value.trim();
            const genre = document.getElementById('gameGenre').value;
            const link = document.getElementById('gameLink').value.trim();

            const platforms = Array.from(document.querySelectorAll('.platform-check:checked'))
                .map(c => c.value);

            if (platforms.length === 0) {
                store.showMessage('Please select at least one platform!', 'error');
                return;
            }

            store.addGame(name, desc, platforms, genre, link);

            // Reset form
            document.querySelector('form').reset();
        }

        // Filter by platform
        function filterByPlatform(platform) {
            store.filterByPlatform(platform);
            
            // Update button styles
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
        }

        // Search games
        function filterGames() {
            const term = document.getElementById('searchInput').value;
            if (term) {
                store.filterBySearch(term);
            } else {
                store.renderGames();
            }
        }

        // Real-time search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            if (e.target.value) {
                store.filterBySearch(e.target.value);
            } else {
                store.renderGames();
            }
        });
    </script>
</body>
</html>
