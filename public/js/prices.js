/* =========================================
    COINGECKO API (LIVE PRICES)
========================================= */

const coinMap = {
    // Original - Verified & Fixed
    'ethereum': { symbol: 'ETH', img: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png', category: 'L1' },
    'bitcoin': { symbol: 'BTC', img: 'https://assets.coingecko.com/coins/images/1/standard/bitcoin.png', category: 'L1' },
    'matic-network': { symbol: 'POL', img: 'https://assets.coingecko.com/coins/images/39856/standard/polygon_ecosystem_token.png', category: 'L2' },
    'arbitrum': { symbol: 'ARB', img: 'https://assets.coingecko.com/coins/images/16547/standard/arb.png', category: 'L2' },
    'optimism': { symbol: 'OP', img: 'https://assets.coingecko.com/coins/images/25244/standard/Optimism.png', category: 'L2' },
    'solana': { symbol: 'SOL', img: 'https://assets.coingecko.com/coins/images/4128/standard/solana.png', category: 'L1' },
    'cardano': { symbol: 'ADA', img: 'https://assets.coingecko.com/coins/images/975/standard/cardano.png', category: 'L1' },
    'polkadot': { symbol: 'DOT', img: 'https://assets.coingecko.com/coins/images/12171/standard/polkadot.png', category: 'L0' },
    'uniswap': { symbol: 'UNI', img: 'https://assets.coingecko.com/coins/images/12504/standard/uniswap-logo.png', category: 'DEX' },
    'aave': { symbol: 'AAVE', img: 'https://assets.coingecko.com/coins/images/12645/standard/AAVE.png', category: 'Lending' },
    'chainlink': { symbol: 'LINK', img: 'https://assets.coingecko.com/coins/images/877/standard/chainlink-new-logo.png', category: 'Oracle' },
    'lido-dao': { symbol: 'LDO', img: 'https://assets.coingecko.com/coins/images/13573/standard/Lido_DAO.png', category: 'Staking' },
    'dogecoin': { symbol: 'DOGE', img: 'https://assets.coingecko.com/coins/images/5/standard/dogecoin.png', category: 'Meme' },
    'litecoin': { symbol: 'LTC', img: 'https://assets.coingecko.com/coins/images/2/standard/litecoin.png', category: 'L1' },

    // New Additions
    'binancecoin': { symbol: 'BNB', img: 'https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png', category: 'L1' },
    'tether': { symbol: 'USDT', img: 'https://assets.coingecko.com/coins/images/325/standard/Tether.png', category: 'Stablecoin' },
    'usd-coin': { symbol: 'USDC', img: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png', category: 'Stablecoin' },
    'tron': { symbol: 'TRX', img: 'https://assets.coingecko.com/coins/images/1094/standard/tron-logo.png', category: 'L1' },
    'the-open-network': { symbol: 'TON', img: 'https://assets.coingecko.com/coins/images/17980/standard/ton_symbol.png', category: 'L1' },
    'shiba-inu': { symbol: 'SHIB', img: 'https://assets.coingecko.com/coins/images/11939/standard/shiba.png', category: 'Meme' },
    'sui': { symbol: 'SUI', img: 'https://assets.coingecko.com/coins/images/26375/standard/sui-ocean-square.png', category: 'L1' },
    'aptos': { symbol: 'APT', img: 'https://assets.coingecko.com/coins/images/26455/standard/aptos_round.png', category: 'L1' },
    'pepe': { symbol: 'PEPE', img: 'https://assets.coingecko.com/coins/images/29850/standard/pepe-token.jpeg', category: 'Meme' },
    'near': { symbol: 'NEAR', img: 'https://assets.coingecko.com/coins/images/10365/standard/near.png', category: 'L1' },
    'celestia': { symbol: 'TIA', img: 'https://assets.coingecko.com/coins/images/31967/standard/tia.jpg', category: 'Modular' },
    'kaspa': { symbol: 'KAS', img: 'https://assets.coingecko.com/coins/images/25751/standard/kaspa-icon-square-color.png', category: 'L1' },
    'render-token': { symbol: 'RNDR', img: 'https://assets.coingecko.com/coins/images/11636/standard/rndr.png', category: 'AI/DePIN' },
    'fetch-ai': { symbol: 'FET', img: 'https://assets.coingecko.com/coins/images/5681/standard/Fetch.jpg', category: 'AI' }
};

let latestMarketRows = [];

function formatChange(change24h) {
    const normalizedChange = Number(change24h || 0);
    const changeClass = normalizedChange >= 0 ? 'positive' : 'negative';
    const changeSymbol = normalizedChange >= 0 ? '▲' : '▼';
    const changeText = Math.abs(normalizedChange).toFixed(2);

    return { changeClass, changeSymbol, changeText, normalizedChange };
}

function renderMarketSummary(rows, visibleRows) {
    const trackedCount = document.getElementById('trackedCount');
    const visibleCount = document.getElementById('visibleCount');
    const topGainer = document.getElementById('topGainer');
    const topGainerMeta = document.getElementById('topGainerMeta');
    const topLoser = document.getElementById('topLoser');
    const topLoserMeta = document.getElementById('topLoserMeta');
    const visibleHint = document.getElementById('visibleHint');

    if (trackedCount) trackedCount.textContent = rows.length.toString();
    if (visibleCount) visibleCount.textContent = visibleRows.length.toString();

    if (!rows.length) {
        if (topGainer) topGainer.textContent = '--';
        if (topGainerMeta) topGainerMeta.textContent = 'Waiting for market data';
        if (topLoser) topLoser.textContent = '--';
        if (topLoserMeta) topLoserMeta.textContent = 'Waiting for market data';
        if (visibleHint) visibleHint.textContent = 'Use search or filters to narrow results';
        return;
    }

    const sortedRows = [...rows].sort((left, right) => right.change24h - left.change24h);
    const gainer = sortedRows[0];
    const loser = sortedRows[sortedRows.length - 1];
    const averageChange = rows.reduce((total, row) => total + row.change24h, 0) / rows.length;

    if (topGainer) topGainer.textContent = `${gainer.symbol} ${gainer.change24h.toFixed(2)}%`;
    if (topGainerMeta) topGainerMeta.textContent = `${gainer.category} | ${gainer.name}`;
    if (topLoser) topLoser.textContent = `${loser.symbol} ${loser.change24h.toFixed(2)}%`;
    if (topLoserMeta) topLoserMeta.textContent = `${loser.category} | ${loser.name}`;
    if (visibleHint) visibleHint.textContent = `Average move: ${averageChange.toFixed(2)}% across mapped assets`;
}

function renderMarketCards() {
    const grid = document.getElementById('priceGrid');
    const searchInput = document.getElementById('marketSearch');
    const filterSelect = document.getElementById('marketFilter');

    if (!grid) return;

    const query = (searchInput?.value || '').trim().toLowerCase();
    const category = filterSelect?.value || 'all';

    const visibleRows = latestMarketRows.filter((row) => {
        const matchesQuery = !query
            || row.symbol.toLowerCase().includes(query)
            || row.name.toLowerCase().includes(query)
            || row.category.toLowerCase().includes(query);
        const matchesCategory = category === 'all' || row.category.toLowerCase() === category.toLowerCase();

        return matchesQuery && matchesCategory;
    });

    renderMarketSummary(latestMarketRows, visibleRows);
    grid.innerHTML = '';

    if (!visibleRows.length) {
        grid.innerHTML = '<div style="text-align:center; grid-column: 1/-1; color: var(--text-muted);">No assets match the current search or filter.</div>';
        return;
    }

    for (const row of visibleRows) {
        const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.priceUsd);
        const { changeClass, changeSymbol, changeText, normalizedChange } = formatChange(row.change24h);

        const card = document.createElement('div');
        card.className = 'glass price-card interactive';
        card.innerHTML = `
            <div class="card-glow"></div>
            <div class="coin-category">${row.category}</div>
            <img src="${row.img}" alt="${row.symbol}" class="coin-icon">
            <div class="coin-name">${row.symbol}</div>
            <div class="coin-price">${price}</div>
            <div class="change ${changeClass}">
                <i class="fa-solid fa-arrow-${normalizedChange >= 0 ? 'up' : 'down'}"></i>
                ${changeSymbol} ${changeText}%
            </div>
        `;
        grid.appendChild(card);
    }
}

export function initPrices() {
    const searchInput = document.getElementById('marketSearch');
    const filterSelect = document.getElementById('marketFilter');

    if (searchInput) {
        searchInput.addEventListener('input', renderMarketCards);
    }

    if (filterSelect) {
        filterSelect.addEventListener('change', renderMarketCards);
    }

    window.fetchPrices = async function () {
        const icon = document.getElementById('refreshIcon');
        const grid = document.getElementById('priceGrid');
        icon.classList.add('spin');

        try {
            const res = await fetch('/api/prices');

            if (!res.ok) {
                throw new Error("API Limit Reached or Server Error");
            }

            const data = await res.json();
            latestMarketRows = [];

            for (const [id, info] of Object.entries(data)) {
                const mapped = coinMap[id];

                // Skip if coin not in map or price data is invalid
                if (!mapped || !info.usd || typeof info.usd !== 'number') {
                    continue;
                }

                latestMarketRows.push({
                    id,
                    name: id.replace(/-/g, ' '),
                    symbol: mapped.symbol,
                    img: mapped.img,
                    category: mapped.category,
                    priceUsd: info.usd,
                    change24h: Number(info.usd_24h_change || 0)
                });
            }

            renderMarketCards();
        } catch (error) {
            console.error('Error fetching prices:', error);
            grid.innerHTML = `<div style="text-align:center; grid-column: 1/-1; color: var(--neon-red);">
                <i class="fa-solid fa-exclamation-circle"></i> Failed to load prices. Please try again.
            </div>`;
            renderMarketSummary([], []);
        } finally {
            icon.classList.remove('spin');
        }
    };

    // Fetch prices on page load if on prices page
    if (document.getElementById('priceGrid')) {
        window.fetchPrices();
    }
}
