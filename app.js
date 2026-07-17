// 1. Clock Initialization
function syncSystemClock() {
    const clockEl = document.getElementById('system-time');
    if (!clockEl) return;
    const now = new Date();
    clockEl.textContent = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
}
setInterval(syncSystemClock, 1000);
syncSystemClock();

// 2. Background Plexus Canvas Animation
function buildPlexusEffect() {
    const canvas = document.getElementById('plexus-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    const maxParticles = 80;
    const maxDistance = 120;
    
    // Mouse tracker
    let mouse = { x: null, y: null, radius: 150 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Loop/Bounce boundaries
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 51, 102, 0.45)';
            ctx.fill();
        }
    }

    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connection lines between particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    const alpha = (1 - dist / maxDistance) * 0.22;
                    ctx.strokeStyle = `rgba(255, 51, 102, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        // Draw connection lines to mouse
        if (mouse.x !== null && mouse.y !== null) {
            particles.forEach(p => {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    const alpha = (1 - dist / mouse.radius) * 0.35;
                    ctx.strokeStyle = `rgba(255, 51, 102, ${alpha})`;
                    ctx.lineWidth = 1.2;
                    ctx.stroke();
                }
            });
        }

        requestAnimationFrame(animate);
    }
    animate();
}
buildPlexusEffect();

// 3. RPG Attributes Allocation System
let availablePoints = 5;
const pointsEl = document.getElementById('stat-points');
const statButtons = document.querySelectorAll('.stat-up-btn');

statButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        if (availablePoints > 0) {
            const statType = this.getAttribute('data-stat');
            const valEl = document.getElementById(`val-${statType}`);
            if (valEl) {
                let currentVal = parseInt(valEl.textContent);
                valEl.textContent = currentVal + 1;
                availablePoints--;
                pointsEl.textContent = availablePoints;

                // Visual flash effect on increment
                valEl.style.color = '#ffea00';
                valEl.style.textShadow = '0 0 10px #ffea00';
                setTimeout(() => {
                    valEl.style.color = '#fff';
                    valEl.style.textShadow = 'none';
                }, 300);

                if (availablePoints === 0) {
                    statButtons.forEach(b => b.style.opacity = '0.3');
                }
            }
        }
    });
});

// 5. Active Skill Spectre_Scan activation sequence
const activateBtn = document.getElementById('activate-skill-btn');
const activationScreen = document.getElementById('activation-screen');

if (activateBtn && activationScreen) {
    activateBtn.addEventListener('click', () => {
        activateBtn.disabled = true;
        activateBtn.textContent = 'EXECUTING SWEEP...';
        activationScreen.innerHTML = '';

        const logs = [
            { text: '>> Initiating Spectre_Scan.py sweep module...', type: 'sim-output-line' },
            { text: '>> Setting raw socket configurations: AF_INET, SOCK_RAW, IPPROTO_TCP', type: 'sim-output-line' },
            { text: '>> Target network set: 192.168.1.0/24', type: 'sim-output-line' },
            { text: '>> Sending SYN packet sweep on threadpool... [OK]', type: 'sim-success-line' },
            { text: '--------------------------------------------------', type: 'sim-output-line' },
            { text: '>> [!] Active Nodes Discovered in Subnet:', type: 'sim-alert-line' },
            { text: '     Node 1: 192.168.1.1 [Gateway Router]', type: 'sim-output-line' },
            { text: '       -> Port 22/tcp  [OPEN] ssh (OpenSSH v8.9)', type: 'sim-success-line' },
            { text: '       -> Port 80/tcp  [OPEN] http (Nginx server)', type: 'sim-success-line' },
            { text: '     Node 2: 192.168.1.42 [Win-AD-Controller]', type: 'sim-output-line' },
            { text: '       -> Port 88/tcp  [OPEN] kerberos (Active Directory authentication)', type: 'sim-highlight-line' },
            { text: '       -> Port 389/tcp [OPEN] ldap (Microsoft AD Directory Service)', type: 'sim-highlight-line' },
            { text: '       -> Port 445/tcp [OPEN] microsoft-ds (SMBv3 Active Connection)', type: 'sim-highlight-line' },
            { text: '--------------------------------------------------', type: 'sim-output-line' },
            { text: '>> Domain recon summary completed: Windows Active Directory target environment detected.', type: 'sim-alert-line' },
            { text: '>> SECURE DISPATCH COMPLETED IN 1.34s.', type: 'sim-success-line' }
        ];

        let index = 0;
        function renderNextLine() {
            if (index < logs.length) {
                const log = logs[index];
                const div = document.createElement('div');
                div.className = `monitor-line ${log.type}`;
                div.textContent = log.text;
                activationScreen.appendChild(div);
                activationScreen.scrollTop = activationScreen.scrollHeight;
                index++;
                
                const speed = log.text.startsWith('     Node') ? 100 : 400;
                setTimeout(renderNextLine, speed);
            } else {
                activateBtn.disabled = false;
                activateBtn.textContent = 'ACTIVATE SKILL: SPECTRE_SCAN';
            }
        }
        renderNextLine();
    });
}

// 6. Guild Connection desk transmission logic
const transmissionForm = document.getElementById('transmission-form');
const portalStatusOverlay = document.getElementById('portal-status-overlay');

if (transmissionForm && portalStatusOverlay) {
    transmissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        portalStatusOverlay.classList.remove('hidden');
        const statusMsg = portalStatusOverlay.querySelector('.portal-msg');
        statusMsg.textContent = 'CONNECTING TO SYSTEM ENDPOINT...';

        setTimeout(() => {
            statusMsg.textContent = 'AES-256 PAYLOAD PACKET ENCRYPTION IN PROGRESS...';
            setTimeout(() => {
                statusMsg.textContent = 'DISPATCHING TO GUILD MASTER PORTAL...';
                setTimeout(() => {
                    statusMsg.textContent = 'TRANSMISSION COMPLETE. DISPATCH CONFIRMED!';
                    const spinner = portalStatusOverlay.querySelector('.portal-spinner');
                    if (spinner) spinner.style.display = 'none';

                    transmissionForm.reset();

                    setTimeout(() => {
                        portalStatusOverlay.classList.add('hidden');
                        if (spinner) spinner.style.display = 'block';
                    }, 2000);
                }, 1000);
            }, 1200);
        }, 1000);
    });
}
