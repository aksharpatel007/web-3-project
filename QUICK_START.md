# Quick Start Guide

## ⚡ Fast Setup

### 1. Install Dependencies
```bash
npm install
```
This will install: Express, CORS, and dotenv

### 2. Start the Server
```bash
npm start
```
You should see:
```
🚀 Web3 Nexus server is running at http://localhost:3000
📡 API available at http://localhost:3000/api
```

### 3. Open Your Browser
Navigate to: **http://localhost:3000**

## 🎯 Features to Try

### Home Page
- Overview of Arbitrum and L2 scaling
- 3D tilt effect on feature cards
- Smooth fade-in animations

### Concepts Page
- 4 educational flip cards
- Hover to reveal Web3 fundamentals
- Interactive card animations

### Markets Page
- Live cryptocurrency prices (ETH, BTC, SOL, ARB, POL)
- 24-hour price change indicators
- Auto-refresh capability

### Simulator Page
- **Mine Block 1**: Click to find a hash starting with "00"
- **Observe Immutability**: Modify Block 1 data and see the chain break
- Real SHA-256 hashing via backend

## 🔧 API Endpoints

All requests go through your Express backend:

```
GET  /api/health           → Server status check
GET  /api/prices           → Fetch crypto prices
POST /api/hash             → Calculate SHA-256 hash
```

## 📁 Project Structure

- `server.js` - Main Express server
- `routes/api.js` - API endpoints
- `public/index.html` - Main HTML
- `public/css/styles.css` - All styling
- `public/js/main.js` - JavaScript entry point
- `public/js/*.js` - Modular JavaScript files

## 🐛 Troubleshooting

**Port 3000 in use?**
```bash
PORT=3001 npm start
```

**Dependencies won't install?**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Prices showing "Loading"?**
- Ensure internet connection
- Check CoinGecko API availability
- See browser console for errors (F12)

## 📚 Learn More

See `README.md` for:
- Full feature documentation
- Technology stack details
- Architecture explanation
- Future enhancements

---

**Ready to explore Web3?** 🚀
