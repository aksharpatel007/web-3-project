/* =========================================
   BLOCK SIMULATOR
========================================= */

export function initSimulator() {
    const initialBlockData = 'Alice sends 5 ETH to Bob';

    let block1Hash = '';
    let block1Data = initialBlockData;
    let block1Nonce = 0;
    let isMining = false;
    let minedSnapshot = null;
    let statusResetTimer = null;

    function getStatusElements() {
        return {
            statusDot: document.getElementById('chainStatusDot'),
            statusText: document.getElementById('chainStatusText')
        };
    }

    function setStatus(text, isBroken = false) {
        const { statusDot, statusText } = getStatusElements();

        if (statusText) {
            statusText.textContent = text;
        }

        if (statusDot) {
            statusDot.classList.toggle('broken', isBroken);
        }
    }

    function refreshChainStatus() {
        const container = document.getElementById('simContainer');
        const currentData = document.getElementById('data1')?.value || '';
        const isMined = Boolean(minedSnapshot?.hash);
        const hasChanged = isMined && (
            currentData !== minedSnapshot.data ||
            block1Nonce !== minedSnapshot.nonce ||
            block1Hash !== minedSnapshot.hash
        );

        if (container) {
            container.classList.toggle('broken', hasChanged);
        }

        if (hasChanged) {
            setStatus('Chain broken after post-mining edit', true);
        } else if (isMining) {
            setStatus('Mining block 1...', false);
        } else if (isMined) {
            setStatus('Chain secured', false);
        } else {
            setStatus('Chain intact', false);
        }
    }

    function resetSimulatorState() {
        block1Hash = '';
        block1Data = initialBlockData;
        block1Nonce = 0;
        minedSnapshot = null;
        isMining = false;

        const dataInput = document.getElementById('data1');
        const prevHashInput = document.getElementById('prevHash2');
        const nonceInput = document.getElementById('nonce1');
        const hashDisplay = document.getElementById('hash1');
        const mineBtn = document.getElementById('mineBtn1');
        const container = document.getElementById('simContainer');

        if (dataInput) dataInput.value = initialBlockData;
        if (prevHashInput) prevHashInput.value = '';
        if (nonceInput) nonceInput.value = '0';
        if (hashDisplay) hashDisplay.textContent = 'Calculating...';
        if (mineBtn) {
            mineBtn.textContent = 'Mine Block';
            mineBtn.disabled = false;
        }
        if (container) container.classList.remove('broken');

        refreshChainStatus();
    }

    window.updateHash = async function (blockNum) {
        if (blockNum === 1) {
            block1Data = document.getElementById('data1').value;
            const hashDisplay = document.getElementById('hash1');
            hashDisplay.textContent = 'Calculating...';

            try {
                const res = await fetch('/api/hash', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        data: block1Data,
                        nonce: block1Nonce
                    })
                });

                const result = await res.json();
                block1Hash = result.hash;
                document.getElementById('hash1').textContent = block1Hash;

                refreshChainStatus();
            } catch (error) {
                console.error('Hash update error:', error);
                hashDisplay.textContent = 'Error calculating hash';
            }
        }
    };

    window.mineBlock = async function (blockNum) {
        if (blockNum === 1) {
            if (isMining) return;
            isMining = true;
            refreshChainStatus();

            const mineBtn = document.getElementById('mineBtn1');
            const originalText = mineBtn.textContent;
            mineBtn.textContent = '⚙️ Mining...';
            mineBtn.disabled = true;

            // Simulate mining - find hash starting with "00"
            let nonce = parseInt(document.getElementById('nonce1').value) || 0;
            let miningInProgress = true;
            let attempts = 0;
            const maxAttempts = 100000;

            while (miningInProgress && attempts < maxAttempts) {
                try {
                    const res = await fetch('/api/hash', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            data: block1Data,
                            nonce: nonce
                        })
                    });

                    const result = await res.json();
                    block1Hash = result.hash;

                    if (result.startsWithDoubleZero) {
                        document.getElementById('nonce1').value = nonce;
                        document.getElementById('hash1').textContent = block1Hash;
                        miningInProgress = false;
                        block1Nonce = nonce;
                        minedSnapshot = {
                            data: block1Data,
                            nonce: block1Nonce,
                            hash: block1Hash
                        };

                        // Update block 2's previous hash
                        document.getElementById('prevHash2').value = block1Hash;

                        // Show success message
                        mineBtn.textContent = '✅ Block Mined!';
                        setTimeout(() => {
                            mineBtn.textContent = originalText;
                            mineBtn.disabled = false;
                            isMining = false;
                            refreshChainStatus();
                        }, 2000);
                    } else {
                        nonce++;
                        attempts++;

                        // Update UI every 100 attempts
                        if (attempts % 100 === 0) {
                            mineBtn.textContent = `⚙️ Mining... (${attempts} attempts)`;
                        }
                    }
                } catch (error) {
                    console.error('Mining error:', error);
                    miningInProgress = false;
                }

                // Prevent blocking the UI
                await new Promise(resolve => setTimeout(resolve, 0));
            }

            if (attempts >= maxAttempts) {
                mineBtn.textContent = '❌ Mining Timeout';
                setTimeout(() => {
                    mineBtn.textContent = originalText;
                    mineBtn.disabled = false;
                    isMining = false;
                    refreshChainStatus();
                }, 2000);
            }

            refreshChainStatus();
        }
    };

    // Listen for changes in block data
    document.getElementById('data1').addEventListener('input', refreshChainStatus);

    window.resetSimulator = function () {
        resetSimulatorState();
    };

    window.copyBlockHash = async function () {
        const hash = document.getElementById('hash1')?.textContent?.trim();

        if (!hash || hash === 'Calculating...' || hash === 'Error calculating hash') {
            setStatus('No hash to copy yet', false);
            return;
        }

        try {
            await navigator.clipboard.writeText(hash);
            setStatus('Hash copied to clipboard', false);

            clearTimeout(statusResetTimer);
            statusResetTimer = setTimeout(() => {
                refreshChainStatus();
            }, 1600);
        } catch (error) {
            console.error('Copy hash error:', error);
            setStatus('Clipboard unavailable', false);
        }
    };

    resetSimulatorState();
}
