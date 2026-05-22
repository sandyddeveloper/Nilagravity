(function () {
  // Target unlock date: September 16, 2026, 12:00:00 AM (local time)
  const targetDate = new Date('2026-09-16T00:00:00');

  // Parse query parameters for developer preview
  const urlParams = new URLSearchParams(window.location.search);
  const mockTimeSec = parseInt(urlParams.get('mock-time'), 10);

  let finalTarget = targetDate;
  let isMocked = false;

  if (!isNaN(mockTimeSec)) {
    finalTarget = new Date(Date.now() + mockTimeSec * 1000);
    isMocked = true;
  }

  // Check lock state
  function getLockState() {
    if (sessionStorage.getItem('nilagravity-unlocked') === 'true') {
      return false;
    }
    return new Date() < finalTarget;
  }

  if (!getLockState()) {
    return; // Already unlocked, do nothing
  }

  // --- PHASE 1: BLOCK RENDER ---
  // Inject style immediately to prevent FOUC (Flash of Unlocked Content)
  const style = document.createElement('style');
  style.id = 'lock-screen-style';
  style.innerHTML = `
    body {
      overflow: hidden !important;
      margin: 0 !important;
      padding: 0 !important;
      background: #04060c !important;
    }
    .page-shell {
      display: none !important;
    }
    #lock-screen-container {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 50% 50%, #0d1226 0%, #04060c 100%);
      font-family: 'Outfit', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #ffffff;
      z-index: 2147483647;
      overflow: hidden;
      box-sizing: border-box;
      padding: 2rem;
      text-align: center;
      transition: opacity 1.2s cubic-bezier(0.2, 1, 0.2, 1), transform 1.2s cubic-bezier(0.2, 1, 0.2, 1);
    }
    .lock-glow-orb {
      position: absolute;
      width: 45vw;
      height: 45vw;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.12;
      z-index: 1;
      pointer-events: none;
    }
    .orb-1 {
      background: radial-gradient(circle, #7a55ff 0%, transparent 70%);
      top: -10%;
      left: -10%;
      animation: floatOrb1 15s ease-in-out infinite alternate;
    }
    .orb-2 {
      background: radial-gradient(circle, #ff6f6c 0%, transparent 70%);
      bottom: -10%;
      right: -10%;
      animation: floatOrb2 18s ease-in-out infinite alternate;
    }
    @keyframes floatOrb1 {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(5vw, 5vh) scale(1.15); }
    }
    @keyframes floatOrb2 {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(-5vw, -5vh) scale(1.1); }
    }
    .lock-content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2.2rem;
      max-width: 540px;
      width: 100%;
    }
    .lock-logo {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 1.6rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      opacity: 0.95;
      color: #ffffff;
      user-select: none;
    }
    .lock-icon-container {
      position: relative;
      width: 90px;
      height: 90px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      cursor: pointer;
      transition: all 0.5s cubic-bezier(0.2, 1, 0.2, 1);
    }
    .lock-icon-container:hover {
      transform: scale(1.05);
      border-color: rgba(122, 85, 255, 0.4);
      box-shadow: 0 20px 60px rgba(122, 85, 255, 0.25), inset 0 2px 0 rgba(255, 255, 255, 0.05);
    }
    .lock-icon-pulse {
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      border: 1px dashed rgba(122, 85, 255, 0.35);
      animation: rotateDashed 25s linear infinite;
    }
    .lock-icon-glow {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(122, 85, 255, 0.3) 0%, transparent 70%);
      filter: blur(5px);
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    .lock-icon-container:hover .lock-icon-glow {
      opacity: 1;
    }
    @keyframes rotateDashed {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    #lock-svg {
      width: 34px;
      height: 34px;
      color: #ff6f6c;
      transition: all 0.5s cubic-bezier(0.2, 1, 0.2, 1);
      filter: drop-shadow(0 0 10px rgba(255, 111, 108, 0.4));
    }
    .lock-icon-container:hover #lock-svg {
      color: #ff8885;
      filter: drop-shadow(0 0 15px rgba(255, 111, 108, 0.6));
    }
    .lock-text-block {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .lock-title {
      font-size: clamp(1.6rem, 5vw, 2.2rem);
      font-weight: 700;
      letter-spacing: -0.04em;
      background: linear-gradient(135deg, #ffffff 0%, #cbd8ff 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1.15;
    }
    .lock-message {
      font-size: clamp(0.95rem, 2.5vw, 1.1rem);
      color: rgba(255, 255, 255, 0.6);
      font-weight: 400;
      line-height: 1.5;
      max-width: 440px;
      margin: 0 auto;
    }
    .countdown-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: clamp(0.75rem, 2.5vw, 1.25rem);
      width: 100%;
      max-width: 480px;
      margin-top: 0.5rem;
    }
    .countdown-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: clamp(0.85rem, 3vw, 1.4rem) 0.25rem;
      border-radius: 1.25rem;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03);
      transition: all 0.4s ease;
    }
    .countdown-item:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }
    .countdown-val {
      font-size: clamp(1.8rem, 5.5vw, 2.8rem);
      font-weight: 800;
      background: linear-gradient(135deg, #ffffff 0%, #cbd8ff 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 4px 20px rgba(203, 216, 255, 0.15);
      line-height: 1;
      margin-bottom: 0.35rem;
    }
    .countdown-label {
      font-size: clamp(0.6rem, 1.8vw, 0.7rem);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: rgba(255, 255, 255, 0.35);
      font-weight: 600;
    }
    .lock-unlocked #lock-svg {
      color: #f3b248 !important;
      filter: drop-shadow(0 0 20px rgba(243, 178, 72, 0.8)) !important;
    }
    .lock-unlocked .lock-icon-pulse {
      border-color: rgba(243, 178, 72, 0.6) !important;
      animation: rotateDashed 4s linear infinite;
    }
    .lock-fading {
      opacity: 0 !important;
      transform: scale(1.06) !important;
    }
    #lock-particles-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }
  `;
  document.head.appendChild(style);

  // --- PHASE 2: INJECT DOM & CONTROLLER ON LOAD ---
  document.addEventListener('DOMContentLoaded', () => {
    // Re-verify in case state changed
    if (!getLockState()) {
      removeLockImmediately();
      return;
    }

    // Create HTML structure
    const container = document.createElement('div');
    container.id = 'lock-screen-container';
    container.innerHTML = `
      <canvas id="lock-particles-canvas"></canvas>
      <div class="lock-glow-orb orb-1"></div>
      <div class="lock-glow-orb orb-2"></div>
      <div class="lock-content">
        <div class="lock-logo">
          <svg viewBox="0 0 42 28" aria-hidden="true" style="width: 32px; height: auto;">
            <defs>
              <linearGradient id="lockBrandGrad" x1="3.5" y1="23.5" x2="36.5" y2="4.5" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#2f6fff" />
                <stop offset="0.38" stop-color="#49a1ff" />
                <stop offset="0.62" stop-color="#7a55ff" />
                <stop offset="0.82" stop-color="#ff6f6c" />
                <stop offset="1" stop-color="#f3b248" />
              </linearGradient>
            </defs>
            <path d="M3.31 22.41c1.98-5.55 5.32-10.38 10.02-14.49 1.58-1.36 3.12-2.04 4.62-2.04 1.87 0 3.53 1.05 4.98 3.16 1.11 1.63 2.4 4.46 3.86 8.48l4.53-11.37c.78-1.98 1.98-2.97 3.58-2.97 1.77 0 3.27 1.04 4.5 3.11 1.22 2.07 1.83 4.47 1.83 7.2 0 3.32-.75 6.13-2.24 8.42-.86 1.34-1.91 2.01-3.16 2.01-1.03 0-1.83-.38-2.42-1.14-.58-.76-1.2-2.14-1.86-4.13l-2.1-6.26-4.75 11.88c-.81 1.96-2.02 2.94-3.63 2.94-1.68 0-3.08-.97-4.18-2.91-1.11-1.94-2.29-4.86-3.53-8.75-.92-2.83-1.73-4.83-2.43-5.99-.69-1.16-1.42-1.74-2.18-1.74-1.42 0-3.05 1.15-4.88 3.46-1.82 2.31-3.3 5.03-4.43 8.15-.53 1.4-1.54 2.1-3.05 2.1-.8 0-1.5-.27-2.1-.81-.61-.54-.91-1.27-.91-2.18 0-.53.1-1.07.3-1.61Z" fill="url(#lockBrandGrad)" />
          </svg>
          <span>Nilagravity</span>
        </div>
        
        <div class="lock-icon-container" id="lock-emblem">
          <div class="lock-icon-pulse"></div>
          <div class="lock-icon-glow"></div>
          <svg id="lock-svg" viewBox="0 0 24 24" fill="currentColor">
            <!-- Locked Padlock Path -->
            <path id="lock-path" d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 5a3 3 0 0 1 6 0v3H9V7zm3 7a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 12 14z" />
          </svg>
        </div>
        
        <div class="lock-text-block">
          <div class="lock-title" id="lock-title">Preparing Surprise...</div>
          <div class="lock-message" id="lock-message">Something is locked. It will open on September 16, 2026.</div>
        </div>
        
        <div class="countdown-grid" id="countdown-grid">
          <div class="countdown-item">
            <div class="countdown-val" id="cd-days">00</div>
            <div class="countdown-label">Days</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-val" id="cd-hours">00</div>
            <div class="countdown-label">Hours</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-val" id="cd-mins">00</div>
            <div class="countdown-label">Mins</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-val" id="cd-secs">00</div>
            <div class="countdown-label">Secs</div>
          </div>
        </div>
      </div>
    `;

    // Add to body as first element
    document.body.insertBefore(container, document.body.firstChild);

    // Setup high-performance starry background
    initStars();

    // Elements references
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');
    const emblem = document.getElementById('lock-emblem');
    const lockSvg = document.getElementById('lock-svg');
    const lockTitle = document.getElementById('lock-title');
    const lockMessage = document.getElementById('lock-message');

    let isUnlocking = false;

    // Update timer loop
    function updateCountdown() {
      const now = new Date().getTime();
      const difference = finalTarget.getTime() - now;

      if (difference <= 0) {
        clearInterval(countdownInterval);
        if (!isUnlocking) {
          triggerUnlock();
        }
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      daysEl.textContent = String(d).padStart(2, '0');
      hoursEl.textContent = String(h).padStart(2, '0');
      minsEl.textContent = String(m).padStart(2, '0');
      secsEl.textContent = String(s).padStart(2, '0');
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Run immediately

    // Click emblem to double check/preview unlock trigger if mock-time is active
    emblem.addEventListener('click', () => {
      if (isMocked && !isUnlocking) {
        clearInterval(countdownInterval);
        triggerUnlock();
      }
    });

    // Unlock sequence
    function triggerUnlock() {
      isUnlocking = true;
      sessionStorage.setItem('nilagravity-unlocked', 'true');

      // Update countdown display to zeroes
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';

      // visual transition state
      emblem.classList.add('lock-unlocked');

      // Change padlock SVG path to unlocked icon
      lockSvg.innerHTML = `<path d="M12 2a5 5 0 0 0-5 5v3H9V7a3 3 0 0 1 6 0v3h3V7a5 5 0 0 0-5-5zm-6 8h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zm6 4a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 12 14z" />`;

      lockTitle.style.background = 'linear-gradient(135deg, #ff6f6c 0%, #f3b248 100%)';
      lockTitle.style.webkitBackgroundClip = 'text';
      lockTitle.textContent = 'Happy Birthday Nila! 🌟';

      lockMessage.textContent = 'Opening your personal birthday universe...';

      // Fade out and remove lock screen after confirmation delay
      setTimeout(() => {
        container.classList.add('lock-fading');

        // Wait for CSS fade out transition
        setTimeout(() => {
          removeLockElements();
        }, 1200);
      }, 1800);
    }

    function removeLockElements() {
      container.remove();
      const styleTag = document.getElementById('lock-screen-style');
      if (styleTag) styleTag.remove();
      // Dispatch custom event if other scripts need to know
      window.dispatchEvent(new Event('site-unlocked'));
    }

    function removeLockImmediately() {
      const lockDiv = document.getElementById('lock-screen-container');
      if (lockDiv) lockDiv.remove();
      const styleTag = document.getElementById('lock-screen-style');
      if (styleTag) styleTag.remove();
    }

    // Canvas background animation loop
    function initStars() {
      const canvas = document.getElementById('lock-particles-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let stars = [];
      let width = window.innerWidth;
      let height = window.innerHeight;

      function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        buildStars();
      }

      function buildStars() {
        stars = [];
        const starCount = Math.max(60, Math.min(180, Math.floor((width * height) / 9500)));
        for (let i = 0; i < starCount; i++) {
          stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.3 + 0.4,
            speed: Math.random() * 0.04 + 0.015,
            angle: Math.random() * Math.PI * 2,
            phase: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.015 + 0.005,
            glow: Math.random() > 0.8
          });
        }
      }

      window.addEventListener('resize', resize);
      resize();

      let animFrame;
      function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.phase += s.twinkleSpeed;
          const alpha = 0.25 + Math.sin(s.phase) * 0.45;

          s.x += Math.cos(s.angle) * s.speed;
          s.y += Math.sin(s.angle) * s.speed;

          // Warp boundaries
          if (s.x < -10) s.x = width + 10;
          if (s.x > width + 10) s.x = -10;
          if (s.y < -10) s.y = height + 10;
          if (s.y > height + 10) s.y = -10;

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.08, alpha)})`;
          ctx.fill();

          // Draw subtle glows for selected stars
          if (s.glow) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r * 3.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(122, 85, 255, ${Math.max(0.01, alpha * 0.15)})`;
            ctx.fill();
          }
        }

        animFrame = requestAnimationFrame(animate);
      }

      animate();

      // Clean up canvas loop when lock screen is removed
      const observer = new MutationObserver((mutations) => {
        if (!document.getElementById('lock-screen-container')) {
          cancelAnimationFrame(animFrame);
          window.removeEventListener('resize', resize);
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true });
    }
  });
})();
