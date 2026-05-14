/* =========================================
   CANVAS PARTICLE BACKGROUND
========================================= */

export function initBackground() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];

    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        particles = [];
        for (let i = 0; i < 40; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(40, 160, 240, 0.4)';

        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            // Connect nearby particles
            for (let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(138, 43, 226, ${0.2 - dist / 750})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', initCanvas);
    initCanvas();
    drawParticles();
}
