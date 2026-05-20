const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('site-nav');
const navScrim = document.querySelector('.nav-scrim');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

window.addEventListener('load', () => {
  window.setTimeout(() => body.classList.add('is-ready'), 80);
  setupRevealObserver();
  initIconWave();
});

const closeMenu = () => {
  body.classList.remove('nav-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open menu');
};

const openMenu = () => {
  body.classList.add('nav-open');
  menuToggle?.setAttribute('aria-expanded', 'true');
  menuToggle?.setAttribute('aria-label', 'Close menu');
};

menuToggle?.addEventListener('click', () => {
  if (body.classList.contains('nav-open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

navScrim?.addEventListener('click', closeMenu);

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});

function setupRevealObserver() {
  const revealItems = document.querySelectorAll('.reveal-on-scroll');

  if (!revealItems.length) {
    return;
  }

  if (reducedMotion.matches || typeof IntersectionObserver !== 'function') {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initIconWave() {
  const ribbon = document.querySelector('.icon-ribbon');
  const track = document.querySelector('.icon-ribbon-track');

  if (!ribbon || !track) {
    return;
  }

  const bubbles = [...track.querySelectorAll('.icon-bubble')];

  if (!bubbles.length) {
    return;
  }

  let animationFrame = 0;

  const applyStaticWave = () => {
    const amplitude = window.innerWidth < 640 ? 18 : 28;
    const baseOffset = window.innerWidth < 640 ? 16 : 22;
    bubbles.forEach((bubble, index) => {
      const offset =
        Math.sin(index * 0.52 - 0.8) * amplitude +
        Math.cos(index * 0.23 + 0.3) * amplitude * 0.38;
      bubble.style.transform = `translate3d(0, ${baseOffset + offset}px, 0)`;
    });
    track.style.transform = `translate3d(${-64}px, 0, 0)`;
  };

  const animateWave = (time) => {
    const drift = time * 0.00062;
    const amplitude = window.innerWidth < 640 ? 18 : 30;
    const secondary = amplitude * 0.34;
    const baseOffset = window.innerWidth < 640 ? 16 : 24;
    const trackShift = -74 + Math.sin(time * 0.00011) * (window.innerWidth < 640 ? 36 : 72);

    track.style.transform = `translate3d(${trackShift}px, 0, 0)`;

    bubbles.forEach((bubble, index) => {
      const waveA = Math.sin((index * 0.5) + drift - 0.8) * amplitude;
      const waveB = Math.cos((index * 0.22) + (drift * 1.6) + 0.4) * secondary;
      const rotate = Math.sin((index * 0.28) + (drift * 1.35)) * 1.8;
      bubble.style.transform = `translate3d(0, ${baseOffset + waveA + waveB}px, 0) rotate(${rotate}deg)`;
    });

    animationFrame = window.requestAnimationFrame(animateWave);
  };

  const startWave = () => {
    window.cancelAnimationFrame(animationFrame);
    if (reducedMotion.matches) {
      applyStaticWave();
      return;
    }
    animationFrame = window.requestAnimationFrame(animateWave);
  };

  startWave();
  window.addEventListener('resize', startWave);

  const handleMotionPreference = () => {
    startWave();
  };

  if (typeof reducedMotion.addEventListener === 'function') {
    reducedMotion.addEventListener('change', handleMotionPreference);
  } else if (typeof reducedMotion.addListener === 'function') {
    reducedMotion.addListener(handleMotionPreference);
  }
}

function initParticleField({ containerSelector, canvasSelector, theme }) {
  const container = document.querySelector(containerSelector);
  const canvas = document.querySelector(canvasSelector);

  if (!container || !canvas) {
    return;
  }

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  const config = getFieldConfig(theme);
  const pointer = { x: 0.5, y: theme === 'dark' ? 0.55 : 0.46 };
  const current = { ...pointer };
  const particles = [];
  const stars = [];

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrame = 0;
  let lastTime = 0;

  const getCount = () => {
    const density = Math.round((width * height) / config.densityDivisor);
    const maxCount = window.innerWidth < 640 ? config.maxMobile : config.maxDesktop;
    return Math.max(config.minCount, Math.min(maxCount, density));
  };

  const buildParticles = () => {
    particles.length = 0;

    const count = getCount();
    const radiusBase = Math.min(width, height) * (window.innerWidth < 640 ? config.radiusBaseMobile : config.radiusBaseDesktop);
    const radiusSpread = Math.max(width, height) * (window.innerWidth < 640 ? config.radiusSpreadMobile : config.radiusSpreadDesktop);

    for (let i = 0; i < count; i += 1) {
      const radiusRatio = Math.pow(Math.random(), config.radiusExponent);
      const radius = radiusBase + radiusRatio * radiusSpread;
      const paletteIndex = pickPaletteIndex(config, radiusRatio);
      const color = config.palette[paletteIndex];
      const thickness = config.thicknessMin + Math.random() * config.thicknessRange;

      particles.push({
        angle: Math.random() * Math.PI * 2,
        speed: config.speedMin + Math.random() * config.speedRange,
        radius,
        xScale: config.xScaleMin + Math.random() * config.xScaleRange,
        yScale: config.yScaleMin + Math.random() * config.yScaleRange,
        driftX: (Math.random() - 0.5) * config.driftOffset,
        driftY: (Math.random() - 0.5) * config.driftOffset,
        waveAmount: config.waveMin + Math.random() * config.waveRange,
        waveSpeed: config.waveSpeedMin + Math.random() * config.waveSpeedRange,
        wavePhase: Math.random() * Math.PI * 2,
        secondaryX: config.secondaryXMin + Math.random() * config.secondaryXRange,
        secondaryY: config.secondaryYMin + Math.random() * config.secondaryYRange,
        length: config.lengthMin + Math.random() * config.lengthRange,
        thickness,
        alpha: config.alphaMin + Math.random() * config.alphaRange,
        twinkle: config.twinkleMin + Math.random() * config.twinkleRange,
        rotateOffset: (Math.random() - 0.5) * config.rotateJitter,
        dotBias: radiusRatio < config.dotBiasThreshold ? config.innerDotBias : Math.random(),
        color
      });
    }

    if (config.starField) {
      buildStars();
    }
  };

  const buildStars = () => {
    stars.length = 0;

    const starCount = Math.max(80, Math.min(220, Math.round((width * height) / config.starDensityDivisor)));

    for (let i = 0; i < starCount; i += 1) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.7 + Math.random() * 1.2,
        alpha: 0.22 + Math.random() * 0.55,
        twinkle: 0.001 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2,
        color: config.starColors[Math.floor(Math.random() * config.starColors.length)]
      });
    }
  };

  const resetCanvas = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildParticles();
  };

  const drawRoundedRect = (x, y, widthValue, heightValue, radius) => {
    if (typeof ctx.roundRect === 'function') {
      ctx.beginPath();
      ctx.roundRect(x, y, widthValue, heightValue, radius);
      return;
    }

    const safeRadius = Math.min(radius, widthValue / 2, heightValue / 2);
    ctx.beginPath();
    ctx.moveTo(x + safeRadius, y);
    ctx.lineTo(x + widthValue - safeRadius, y);
    ctx.quadraticCurveTo(x + widthValue, y, x + widthValue, y + safeRadius);
    ctx.lineTo(x + widthValue, y + heightValue - safeRadius);
    ctx.quadraticCurveTo(x + widthValue, y + heightValue, x + widthValue - safeRadius, y + heightValue);
    ctx.lineTo(x + safeRadius, y + heightValue);
    ctx.quadraticCurveTo(x, y + heightValue, x, y + heightValue - safeRadius);
    ctx.lineTo(x, y + safeRadius);
    ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  };

  const drawTrail = (x, y, rotation, length, thickness, fillStyle, alpha, asDot) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = fillStyle;

    if (asDot) {
      ctx.beginPath();
      ctx.arc(0, 0, thickness * 0.72, 0, Math.PI * 2);
      ctx.fill();
    } else {
      drawRoundedRect(-length / 2, -thickness / 2, length, thickness, thickness * 0.5);
      ctx.fill();
    }

    ctx.restore();
  };

  const drawStars = (time) => {
    if (!stars.length) {
      return;
    }

    for (const star of stars) {
      ctx.globalAlpha = star.alpha * (0.65 + Math.sin(time * star.twinkle + star.phase) * 0.35);
      ctx.fillStyle = star.color;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    }
    ctx.globalAlpha = 1;
  };

  const render = (time, shouldAnimate) => {
    const delta = Math.min(32, time - lastTime || 16);
    lastTime = time;

    current.x += (pointer.x - current.x) * config.pointerLerp;
    current.y += (pointer.y - current.y) * config.pointerLerp;

    const baseX = window.innerWidth < 640 ? width * config.baseXMobile : width * config.baseXDesktop;
    const baseY = window.innerWidth < 640 ? height * config.baseYMobile : height * config.baseYDesktop;
    const influenceX = (current.x - 0.5) * width * config.pointerInfluence;
    const influenceY = (current.y - 0.5) * height * config.pointerInfluence;
    const driftX = Math.sin(time * config.fieldDriftX) * width * config.fieldDriftAmountX;
    const driftY = Math.cos(time * config.fieldDriftY) * height * config.fieldDriftAmountY;
    const fieldX = baseX + influenceX + driftX;
    const fieldY = baseY + influenceY + driftY;

    ctx.clearRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(fieldX, fieldY, 0, fieldX, fieldY, Math.max(width, height) * config.glowRadius);
    glow.addColorStop(0, config.glowStops[0]);
    glow.addColorStop(0.42, config.glowStops[1]);
    glow.addColorStop(0.68, config.glowStops[2]);
    glow.addColorStop(1, config.glowStops[3]);
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    drawStars(time);

    for (const particle of particles) {
      if (shouldAnimate) {
        particle.angle += particle.speed * delta * config.timeScale;
      }

      const wave = Math.sin((time * particle.waveSpeed) + particle.wavePhase) * particle.waveAmount;
      const radius = particle.radius + wave;
      const angle = particle.angle;
      const x =
        fieldX +
        Math.cos(angle) * radius * particle.xScale +
        Math.sin(angle * config.secondaryFrequencyX + particle.wavePhase) * particle.secondaryX +
        particle.driftX;
      const y =
        fieldY +
        Math.sin(angle) * radius * particle.yScale +
        Math.cos(angle * config.secondaryFrequencyY + particle.wavePhase) * particle.secondaryY +
        particle.driftY;

      if (x < -40 || x > width + 40 || y < -40 || y > height + 40) {
        continue;
      }

      const alpha = particle.alpha * (0.68 + Math.sin(time * particle.twinkle + particle.wavePhase) * 0.32);
      const rotation = angle + (Math.PI / 2) + particle.rotateOffset;
      const tint = `rgb(${particle.color[0]} ${particle.color[1]} ${particle.color[2]})`;
      const asDot = particle.dotBias < config.dotRenderThreshold;

      drawTrail(x, y, rotation, particle.length, particle.thickness, tint, alpha, asDot);
    }
  };

  const animate = (time) => {
    render(time, true);
    animationFrame = window.requestAnimationFrame(animate);
  };

  const drawStatic = () => {
    resetCanvas();
    render(16, false);
    window.cancelAnimationFrame(animationFrame);
  };

  const startAnimation = () => {
    window.cancelAnimationFrame(animationFrame);
    resetCanvas();
    lastTime = performance.now();
    animationFrame = window.requestAnimationFrame(animate);
  };

  const setPointerFromEvent = (event) => {
    const rect = container.getBoundingClientRect();
    pointer.x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    pointer.y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
  };

  container.addEventListener('pointermove', setPointerFromEvent);
  container.addEventListener('pointerleave', () => {
    pointer.x = theme === 'dark' ? 0.48 : 0.5;
    pointer.y = theme === 'dark' ? 0.55 : 0.46;
  });

  window.addEventListener('resize', resetCanvas);

  if (reducedMotion.matches) {
    drawStatic();
  } else {
    startAnimation();
  }

  const handleMotionPreference = (event) => {
    if (event.matches) {
      drawStatic();
    } else {
      startAnimation();
    }
  };

  if (typeof reducedMotion.addEventListener === 'function') {
    reducedMotion.addEventListener('change', handleMotionPreference);
  } else if (typeof reducedMotion.addListener === 'function') {
    reducedMotion.addListener(handleMotionPreference);
  }
}

function pickPaletteIndex(config, radiusRatio) {
  if (config.theme === 'light') {
    const warmBias = radiusRatio < 0.3 && Math.random() > 0.48;
    return warmBias
      ? 2 + Math.floor(Math.random() * (config.palette.length - 2))
      : Math.floor(Math.random() * 3);
  }

  if (radiusRatio < 0.2 && Math.random() > 0.35) {
    return config.palette.length - 1;
  }

  return Math.floor(Math.random() * (config.palette.length - 1));
}

function getFieldConfig(theme) {
  if (theme === 'dark') {
    return {
      theme: 'dark',
      densityDivisor: 4200,
      minCount: 160,
      maxMobile: 220,
      maxDesktop: 420,
      radiusBaseMobile: 0.16,
      radiusBaseDesktop: 0.2,
      radiusSpreadMobile: 0.6,
      radiusSpreadDesktop: 0.76,
      radiusExponent: 0.76,
      palette: [
        [73, 118, 255],
        [96, 140, 255],
        [121, 164, 255],
        [61, 97, 235],
        [243, 248, 255]
      ],
      thicknessMin: 1,
      thicknessRange: 1.35,
      speedMin: 0.00016,
      speedRange: 0.00062,
      xScaleMin: 0.88,
      xScaleRange: 0.42,
      yScaleMin: 0.9,
      yScaleRange: 0.56,
      driftOffset: 14,
      waveMin: 2.6,
      waveRange: 9.5,
      waveSpeedMin: 0.00035,
      waveSpeedRange: 0.001,
      secondaryXMin: 5,
      secondaryXRange: 16,
      secondaryYMin: 5,
      secondaryYRange: 18,
      lengthMin: 1.8,
      lengthRange: 4.4,
      alphaMin: 0.18,
      alphaRange: 0.58,
      twinkleMin: 0.0014,
      twinkleRange: 0.0044,
      starDensityDivisor: 11500,
      starColors: ['#7ea3ff', '#4c77ff', '#edf3ff', '#95b5ff'],
      rotateJitter: 0.46,
      dotBiasThreshold: 0.18,
      innerDotBias: 0.82,
      dotRenderThreshold: 0.22,
      pointerLerp: 0.024,
      baseXDesktop: 0.55,
      baseYDesktop: 0.52,
      baseXMobile: 0.52,
      baseYMobile: 0.5,
      pointerInfluence: 0.05,
      fieldDriftX: 0.00007,
      fieldDriftY: 0.00006,
      fieldDriftAmountX: 0.024,
      fieldDriftAmountY: 0.024,
      glowRadius: 0.94,
      glowStops: [
        'rgba(85, 132, 255, 0.2)',
        'rgba(85, 132, 255, 0.09)',
        'rgba(55, 94, 220, 0.04)',
        'rgba(0, 0, 0, 0)'
      ],
      secondaryFrequencyX: 2.1,
      secondaryFrequencyY: 1.7,
      timeScale: 1.35,
      starField: true
    };
  }

  return {
    theme: 'light',
    densityDivisor: 5100,
    minCount: 145,
    maxMobile: 195,
    maxDesktop: 340,
    radiusBaseMobile: 0.11,
    radiusBaseDesktop: 0.14,
    radiusSpreadMobile: 0.52,
    radiusSpreadDesktop: 0.64,
    radiusExponent: 0.75,
    palette: [
      [47, 111, 255],
      [91, 121, 255],
      [115, 92, 255],
      [255, 97, 109],
      [243, 178, 72],
      [117, 132, 165]
    ],
    thicknessMin: 1.2,
    thicknessRange: 1.3,
    speedMin: 0.0002,
    speedRange: 0.00085,
    xScaleMin: 0.84,
    xScaleRange: 0.36,
    yScaleMin: 0.92,
    yScaleRange: 0.62,
    driftOffset: 18,
    waveMin: 3,
    waveRange: 11,
    waveSpeedMin: 0.00045,
    waveSpeedRange: 0.0012,
    secondaryXMin: 6,
    secondaryXRange: 20,
    secondaryYMin: 8,
    secondaryYRange: 24,
    lengthMin: 2.1,
    lengthRange: 4.6,
    alphaMin: 0.16,
    alphaRange: 0.56,
    twinkleMin: 0.0015,
    twinkleRange: 0.005,
    rotateJitter: 0.5,
    dotBiasThreshold: 0.14,
    innerDotBias: 0.82,
    dotRenderThreshold: 0.24,
    pointerLerp: 0.028,
    baseXDesktop: 0.765,
    baseYDesktop: 0.36,
    baseXMobile: 0.53,
    baseYMobile: 0.39,
    pointerInfluence: 0.08,
    fieldDriftX: 0.00008,
    fieldDriftY: 0.00007,
    fieldDriftAmountX: 0.012,
    fieldDriftAmountY: 0.018,
    glowRadius: 0.68,
    glowStops: [
      'rgba(96, 143, 255, 0.085)',
      'rgba(120, 104, 255, 0.05)',
      'rgba(255, 100, 112, 0.025)',
      'rgba(255, 255, 255, 0)'
    ],
    secondaryFrequencyX: 2.2,
    secondaryFrequencyY: 1.7,
    timeScale: 1.45,
    starField: false
  };
}

initParticleField({
  containerSelector: '.hero',
  canvasSelector: '#particle-canvas',
  theme: 'light'
});

initParticleField({
  containerSelector: '.download-section',
  canvasSelector: '#download-canvas',
  theme: 'dark'
});
