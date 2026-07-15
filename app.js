// 1. Clock Initialization
function syncSystemClock() {
    const clockEl = document.getElementById('system-time');
    if (!clockEl) return;
    const now = new Date();
    clockEl.textContent = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
}
setInterval(syncSystemClock, 1000);
syncSystemClock();

// 2. Background Particle Engine (Canvas-less CSS particles or lightweight JS engine)
function buildBackgroundParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = Math.random() > 0.5 ? '#00e5ff' : '#bd00ff';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.pointerEvents = 'none';
        
        // Add random floating animation properties
        const duration = Math.random() * 20 + 15;
        particle.style.animation = `floatParticle ${duration}s infinite linear alternate`;
        
        // Dynamic custom styles injected for random movement
        const keyframes = `
            @keyframes floatParticle {
                0% { transform: translateY(0) translateX(0); }
                100% { transform: translateY(${Math.random() * 200 - 100}px) translateX(${Math.random() * 200 - 100}px); }
            }
        `;
        const styleNode = document.createElement('style');
        styleNode.textContent = keyframes;
        document.head.appendChild(styleNode);

        container.appendChild(particle);
    }
}
buildBackgroundParticles();

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
