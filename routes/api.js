const express = require('express');
const router = express.Router();

// API endpoint for fetching crypto prices
router.get('/prices', async (req, res) => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,solana,matic-network,arbitrum,optimism,lido-dao,uniswap,aave,chainlink,avalanche-2,cosmos,ripple,cardano,dogecoin,litecoin,polkadot,maker,yearn-finance,curve-dao-token&vs_currencies=usd&include_24hr_change=true');

        if (!response.ok) {
            return res.status(response.status).json({
                error: 'Failed to fetch prices from CoinGecko API',
                message: 'API rate limit reached or service unavailable'
            });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Price fetch error:', error);
        res.status(500).json({
            error: 'Error fetching crypto prices',
            message: error.message
        });
    }
});

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Blockchain simulator endpoint - SHA256 hash verification
router.post('/hash', (req, res) => {
    try {
        const { data, nonce } = req.body;
        const crypto = require('crypto');

        const input = data + nonce;
        const hash = crypto.createHash('sha256').update(input).digest('hex');

        res.json({
            hash,
            input,
            nonce,
            startsWithDoubleZero: hash.startsWith('00')
        });
    } catch (error) {
        console.error('Hash calculation error:', error);
        res.status(500).json({
            error: 'Error calculating hash',
            message: error.message
        });
    }
});

module.exports = router;
