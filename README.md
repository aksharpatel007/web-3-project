# Web3 Nexus - Full-Stack Application

A modern, full-stack Web3 educational platform featuring Arbitrum/L2 scaling, live crypto prices, and an interactive blockchain simulator.

## Features

- **📚 Educational Content** - Learn about Arbitrum, L2 scaling, and Web3 concepts
- **💹 Live Crypto Markets** - Real-time cryptocurrency prices via CoinGecko API (backend proxy)
- **⛏️ Blockchain Simulator** - Mine blocks and understand Proof of Work concepts
- **✨ Modern UI** - Glassmorphism design with custom cursor, particle effects, and smooth animations
- **📱 Fully Responsive** - Works beautifully on desktop and mobile devices

## Project Structure

```
web3/
├── server.js              # Express.js server entry point
├── package.json           # Project dependencies
├── .gitignore            # Git ignore rules
├── routes/
│   └── api.js            # API routes (prices, hashing)
├── public/
│   ├── index.html        # Main HTML file
│   ├── css/
│   │   └── styles.css    # All styling
│   └── js/
│       ├── main.js       # Application initialization
│       ├── cursor.js     # Custom cursor module
│       ├── background.js # Particle animation module
│       ├── routing.js    # SPA routing module
│       ├── cards.js      # Card tilt effects module
│       ├── prices.js     # Crypto prices module
│       └── simulator.js  # Blockchain simulator module
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Navigate to the project directory**
   ```bash
   cd web3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## Usage

### Navigation
- **Home** - Overview of Arbitrum and L2 scaling benefits
- **Concepts** - Hover over cards to learn Web3 fundamentals
- **Markets** - View real-time crypto prices (ETH, BTC, SOL, POL, ARB)
- **Simulator** - Mine blocks and understand blockchain immutability

### Mining Blocks
1. Go to the Simulator page
2. Click "Mine Block" to find a hash starting with "00"
3. Try modifying Block 1 data after mining to see the chain break
4. Observe how the chain integrity is compromised

## API Endpoints

### GET `/api/health`
Health check endpoint
- Response: `{ status: "Server is running", timestamp: "..." }`

### GET `/api/prices`
Fetch live cryptocurrency prices
- Response: CoinGecko API response with USD prices and 24h changes

### POST `/api/hash`
Calculate SHA-256 hash (used by simulator)
- Request body:
  ```json
  {
    "data": "Block data string",
    "nonce": 12345
  }
  ```
- Response:
  ```json
  {
    "hash": "abc123...",
    "input": "Block data12345",
    "nonce": 12345,
    "startsWithDoubleZero": true
  }
  ```

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-Origin Resource Sharing
- **Crypto** - Built-in SHA-256 hashing

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Advanced styling (Glassmorphism, animations)
- **Vanilla JavaScript** - Modular ES6 modules
- **Font Awesome** - Icon library
- **Google Fonts** - Typography

## Architecture

### Backend
- Express server serves static files from `public/` directory
- API routes handle crypto prices (proxied from CoinGecko) and hash calculations
- Fallback routing for SPA (Single Page Application)

### Frontend
- Modular JavaScript using ES6 import/export
- Each feature has its own module (cursor, background, routing, etc.)
- Main.js orchestrates initialization
- CSS custom properties for theming
- Smooth animations and transitions throughout

## Key Features Explained

### Custom Cursor
- Tracks mouse movement with a dual-element cursor
- Expands on hover over interactive elements
- Smooth transitions and glowing effects

### Particle Background
- Canvas-based particle system
- Particles connect when within proximity
- Responsive to window resizing

### SPA Routing
- Single Page Application routing without page reloads
- Active state indicators in navigation
- Lazy initialization of page-specific features

### Crypto Prices
- Backend proxy to CoinGecko API (avoids CORS issues)
- Real-time market data updates
- Visual indicators for price changes (green/red)

### Blockchain Simulator
- Educational visualization of Proof of Work
- Shows hash calculation with variable nonce
- Demonstrates immutability and chain integrity
- Real SHA-256 hashing via backend

## Performance Optimizations

- CSS custom properties for efficient theming
- Modular JavaScript for better tree-shaking
- Static file serving with Express
- Efficient particle animation with requestAnimationFrame
- Optimized canvas rendering

## Troubleshooting

### Port Already in Use
```bash
# Change the port in server.js or use environment variable
PORT=3001 npm start
```

### API Not Responding
- Ensure the server is running
- Check browser console for errors
- Verify internet connection (for CoinGecko API)

### Slow Mining
- This is expected! Finding a hash with leading zeros takes time
- The simulator uses real SHA-256 hashing
- Try modifying the difficulty in simulator.js if needed

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication
- [ ] Historical price charts
- [ ] Advanced mining simulator with difficulty adjustment
- [ ] Blockchain explorer
- [ ] WebSocket for real-time updates
- [ ] Docker containerization

## License

MIT

## Author

Web3 Nexus Team

## Support

For issues or questions, please create an issue in the repository or contact the development team.

---

**Disclaimer**: This is an educational platform. It is not financial advice. Please do your own research before making any investment decisions.
