# 🎮 Apiz Game Store - Suggestion Platform

A modern, interactive web application where gaming enthusiasts can suggest games and discover titles across multiple platforms.

## ✨ Features

### 🎯 User-Friendly Suggestion System
- **Easy Game Submission**: Submit game suggestions with name, description, genre, and platforms
- **Multi-Platform Support**: Add games available on PC, Android, iOS, Console, and Web
- **Direct Download Links**: Include download links for each platform (PlayStore, Steam, AppStore, etc.)
- **Genre Classification**: Organize games by genres (Action, RPG, Strategy, Puzzle, etc.)

### 🔍 Advanced Search & Filtering
- **Real-time Search**: Search games by name or description
- **Platform Filtering**: Filter games by available platforms (PC, Android, iOS, Console, Web)
- **Genre Filtering**: Browse by game genre
- **Suggestion Ranking**: Games are ranked by number of suggestions/votes

### 📱 One-Click Download
- **Direct Links**: Click to go directly to PlayStore, Steam, AppStore, or other platforms
- **Multi-Platform Links**: Each game can have download links for multiple platforms
- **Quick Access**: Seamless redirection to official store pages

### 💾 Data Persistence
- **LocalStorage**: All game data is saved locally in your browser
- **No Backend Required**: Works completely offline after initial load
- **Sample Data**: Includes pre-loaded popular games to get started

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful Gradients**: Modern color scheme with smooth transitions
- **Interactive Cards**: Hover effects and smooth animations
- **Toast Notifications**: Real-time feedback for user actions

## 🚀 Getting Started

### Option 1: Direct Access
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start suggesting and discovering games!

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
http-server
```
Then visit `http://localhost:8000`

## 📖 How to Use

### Suggest a Game
1. Fill out the suggestion form:
   - **Game Name**: Enter the game title
   - **Description**: Write a brief description
   - **Platforms**: Select all platforms where the game is available
   - **Genre**: Choose the game genre
   - **Download Links**: (Optional) Add links in format `Platform: URL`
2. Click "🚀 Submit Suggestion"
3. If the game is new, it's added. If it exists, a vote is added!

### Browse & Download
1. Use the **search bar** to find games by name or description
2. Click **platform buttons** to filter by PC, Android, iOS, Console, or Web
3. Select a **genre** from the dropdown to narrow results
4. Click the **download button** on any game card to go to its store page

## 🏗️ Project Structure

```
Apiz/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and responsive design
├── script.js           # Game store logic and functionality
└── README.md          # Documentation (this file)
```

## 💻 Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients, flexbox, and grid
- **Vanilla JavaScript**: No dependencies, pure functionality
- **LocalStorage API**: Client-side data persistence

## 🎨 Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... other colors ... */
}
```

### Add More Genres
Update both the form and filter select in `index.html`:
```html
<option value="YourGenre">Your Genre</option>
```

### Add More Platforms
Update the checkboxes in `index.html`:
```html
<label><input type="checkbox" value="YourPlatform" class="platform-check"> Your Platform</label>
```

## 🔗 Download Link Format

When adding download links, use this format:
```
Platform: https://store-url-here.com/game
```

Examples:
- `PlayStore: https://play.google.com/store/apps/details?id=...`
- `Steam: https://store.steampowered.com/app/...`
- `AppStore: https://apps.apple.com/us/app/...`
- `Epic: https://www.epicgames.com/store/...`

## 📊 Features Explanation

### Game Ranking System
Games are automatically ranked by the number of suggestions they receive:
- When a game is suggested by multiple users, the suggestion counter increases
- Games with more suggestions appear higher in search results
- This creates a community-driven recommendation system

### Responsive Design
The application is fully responsive:
- **Desktop**: Multi-column grid layout for maximum visibility
- **Tablet**: 2-column layout for optimal viewing
- **Mobile**: Single column layout with touch-friendly buttons

### Data Privacy
All data is stored locally in your browser using LocalStorage:
- No data is sent to any server
- Each browser has its own separate game database
- Data persists until browser storage is cleared

## 🐛 Troubleshooting

### Games not appearing?
- Check browser console for errors (F12 → Console)
- Try clearing browser cache and refreshing
- Ensure JavaScript is enabled

### Download links not working?
- Verify the URL is correct and complete
- Ensure it starts with `http://` or `https://`
- Check that the link format includes the platform name

### Data lost?
- Check if browser storage is full
- Try using a different browser
- Clear browser cache (warning: this will delete saved games)

## 🤝 Contributing

Feel free to fork, modify, and improve this project! Ideas for enhancements:
- User ratings and reviews
- Game screenshots/images
- Backend database integration
- User accounts and authentication
- Social sharing features
- API integration with game stores

## 📝 License

Open source - feel free to use and modify for any purpose.

## 🎯 Future Enhancements

- [ ] Game cover images/screenshots
- [ ] User ratings and reviews
- [ ] Game pricing information
- [ ] Community voting/upvoting
- [ ] API integration with Steam, Epic Games, etc.
- [ ] User accounts and profiles
- [ ] Email notifications for new games
- [ ] Game comparison feature
- [ ] Wishlist functionality
- [ ] Mobile app version

## 💬 Feedback

Have suggestions for improving Apiz? We'd love to hear from you!

---

**Made with ❤️ for gamers by ApizStore**

Happy gaming! 🎮
