// Inicia el control del cursor ocular
export function initEyeCursorControl() {
  if (window.eyeCursorActive) return;
  window.eyeCursorActive = true;

  // Mostrar overlay de carga
  const loadingOverlay = document.createElement("div");
  loadingOverlay.id = "eye-loading-overlay";
  loadingOverlay.style.position = "fixed";
  loadingOverlay.style.top = 0;
  loadingOverlay.style.left = 0;
  loadingOverlay.style.width = "100vw";
  loadingOverlay.style.height = "100vh";
  loadingOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  loadingOverlay.style.display = "flex";
  loadingOverlay.style.flexDirection = "column";
  loadingOverlay.style.justifyContent = "center";
  loadingOverlay.style.alignItems = "center";
  loadingOverlay.style.zIndex = 100000;
  loadingOverlay.innerHTML = `
    <div style="color: white; font-size: 1.5rem; margin-bottom: 20px;">Cargando control ocular...</div>
    <div style="
      width: 40px;
      height: 40px;
      border: 5px solid #fff;
      border-top: 5px solid transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    "></div>
  `;

  if (!document.getElementById("eye-loading-style")) {
    const styleTag = document.createElement("style");
    styleTag.id = "eye-loading-style";
    styleTag.textContent = `
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      @keyframes pulseCursor {
        0% { transform: scale(1); box-shadow: 0 0 10px rgba(138,43,226,0.6), 0 0 20px rgba(0,240,255,0.5); }
        50% { transform: scale(1.3); box-shadow: 0 0 20px rgba(138,43,226,0.8), 0 0 30px rgba(0,240,255,0.7); }
        100% { transform: scale(1); box-shadow: 0 0 10px rgba(138,43,226,0.6), 0 0 20px rgba(0,240,255,0.5); }
      }
      @keyframes pulseInteractive {
        0% { transform: scale(1.2); box-shadow: 0 0 15px rgba(0,255,136,0.7), 0 0 30px rgba(0,212,255,0.6); }
        50% { transform: scale(1.5); box-shadow: 0 0 25px rgba(0,255,136,0.8), 0 0 40px rgba(0,212,255,0.8); }
        100% { transform: scale(1.6); box-shadow: 0 0 15px rgba(0,255,136,0.7), 0 0 30px rgba(0,212,255,0.6); }
      }
    `;
    document.head.appendChild(styleTag);
  }
  document.body.appendChild(loadingOverlay);

  const scripts = [
    "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.min.js",
    "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
    "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
  ];

  const loadScript = src => new Promise(resolve => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = () => console.error(`Error cargando: ${src}`);
    document.head.appendChild(s);
  });

  Promise.all(scripts.map(loadScript)).then(() => {
    const videoElement = document.createElement("video");
    videoElement.style.display = "none";
    document.body.appendChild(videoElement);

    // Configuración de cursor y scroll
    const CURSOR_SIZE = 20;
    const MARGIN = 5;
    const scrollMargin = 10;
    const scrollSpeed = 20;

    // Crear cursor ocular
    const cursor = document.createElement("div");
    cursor.id = "eye-cursor";
    Object.assign(cursor.style, {
      position: "fixed",
      width: `${CURSOR_SIZE}px`,
      height: `${CURSOR_SIZE}px`,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #00f0ff, #8a2be2)",
      boxShadow: "0 0 10px rgba(138,43,226,0.6), 0 0 20px rgba(0,240,255,0.5)",
      animation: "pulseCursor 1.5s ease-in-out infinite",
      zIndex: 9999,
      pointerEvents: "none",
      opacity: 0,
      transform: "scale(0)",
      transition: "opacity 0.5s ease, transform 0.5s ease"
    });
    document.body.appendChild(cursor);
    requestAnimationFrame(() => {
      cursor.style.opacity = 1;
      cursor.style.transform = "scale(1.5)";
      setTimeout(() => cursor.style.transform = "scale(1)", 500);
    });

    // Estilo de hover en elementos interactivos
    if (!document.getElementById("eye-hover-style")) {
      const hoverStyle = document.createElement("style");
      hoverStyle.id = "eye-hover-style";
      hoverStyle.textContent = `
        .eye-hovered { outline: 2px dashed #00ff00 !important; transition: outline 0.2s ease; }
      `;
      document.head.appendChild(hoverStyle);
    }

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let lastHovered = null;

    const faceMesh = new window.FaceMesh({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}` });
    faceMesh.setOptions({ maxNumFaces: 1, refineLandmarks: true, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });

    faceMesh.onResults(results => {
      if (!results.multiFaceLandmarks.length) return;
      const lm = results.multiFaceLandmarks[0];
      const iris = lm[468];

      // Cálculos de posición
      const rawX = (1 - iris.x) * window.innerWidth;
      const rawY = iris.y * window.innerHeight;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const amp = 6;
      const dx = rawX - centerX;
      const dy = rawY - centerY;
      const thresh = 3;
      const targetX = Math.abs(dx) > thresh ? centerX + dx * amp : lastX;
      const targetY = Math.abs(dy) > thresh ? centerY + dy * amp : lastY;
      lastX += (targetX - lastX) * 0.2;
      lastY += (targetY - lastY) * 0.2;

      // Mantener dentro del viewport
      const clampedX = Math.max(MARGIN, Math.min(window.innerWidth - CURSOR_SIZE - MARGIN, lastX));
      const clampedY = Math.max(MARGIN, Math.min(window.innerHeight - CURSOR_SIZE - MARGIN, lastY));
      cursor.style.left = `${clampedX}px`;
      cursor.style.top = `${clampedY}px`;

      // Scroll automático vertical: usar lastY para detectar cercanía a bordes
      if (lastY < scrollMargin) window.scrollBy(0, -scrollSpeed);
      else if (lastY > window.innerHeight - scrollMargin) window.scrollBy(0, scrollSpeed);

      // Detección de elemento bajo cursor y estilos
      const hovered = document.elementFromPoint(clampedX, clampedY);
      document.querySelectorAll('.eye-hovered').forEach(el => el.classList.remove('eye-hovered'));
      const interactive = hovered && (
        hovered.tagName === 'BUTTON' || hovered.tagName === 'A' ||
        hovered.getAttribute('role') === 'button' || hovered.hasAttribute('tabindex')
      );
      if (interactive) {
        cursor.style.background = "linear-gradient(135deg, #00ff88, #00d4ff)";
        cursor.style.boxShadow = "0 0 15px rgba(0,255,136,0.7), 0 0 30px rgba(0,212,255,0.6)";
        cursor.style.animation = "pulseInteractive 1s ease-in-out infinite";
        cursor.style.transform = "scale(1.6)";
        hovered.classList.add('eye-hovered');
      } else {
        cursor.style.background = "linear-gradient(135deg, #00f0ff, #8a2be2)";
        cursor.style.boxShadow = "0 0 10px rgba(138,43,226,0.6), 0 0 20px rgba(0,240,255,0.5)";
        cursor.style.animation = "pulseCursor 1.5s ease-in-out infinite";
        cursor.style.transform = "scale(1)";
      }

      // Parpadeo y clic simulado
      const leftEAR = getEAR(lm, 159, 145);
      const rightEAR = getEAR(lm, 386, 374);
      const closed = leftEAR < EYE_CLOSED_THRESHOLD && rightEAR < EYE_CLOSED_THRESHOLD;
      if (closed) {
        if (!eyeClosedStartTime) { eyeClosedStartTime = Date.now(); lastHovered = hovered; }
        else if (Date.now() - eyeClosedStartTime > EYE_CLOSED_DURATION && hovered === lastHovered) {
          simulateClickAtCursor(clampedX, clampedY);
          eyeClosedStartTime = null;
          lastHovered = null;
        }
      } else { eyeClosedStartTime = null; lastHovered = null; }
    });

    const camera = new window.Camera(videoElement, { onFrame: async () => await faceMesh.send({ image: videoElement }), width: 640, height: 480 });
    camera.start();
    loadingOverlay.remove();
  });
}

let eyeClosedStartTime = null;
const EYE_CLOSED_THRESHOLD = 0.23;
const EYE_CLOSED_DURATION = 2000;

function getEAR(landmarks, topIndex, bottomIndex) {
  return Math.abs(landmarks[topIndex].y - landmarks[bottomIndex].y);
}

function simulateClickAtCursor(x, y) {
  const el = document.elementFromPoint(x, y);
  if (!el) return;
  const event = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
  el.dispatchEvent(event);
  console.log('Click simulado en:', el);
}
