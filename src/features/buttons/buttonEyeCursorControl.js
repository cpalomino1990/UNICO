

export function initEyeCursorControl() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (window.eyeCursorActive) return;
  window.eyeCursorActive = true;

  // Overlay de carga
  const loadingOverlay = document.createElement("div");
  loadingOverlay.id = "eye-loading-overlay";
  Object.assign(loadingOverlay.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100000,
  });
  loadingOverlay.innerHTML = `
    <div style="color: white; font-size: 1.5rem; margin-bottom: 20px;">Cargando control ocular...</div>
    <div style="
      width: 40px;
      height: 40px;
      border: 5px solid #fff;
      border-top: 5px solid transparent;
      border-radius: 50%;
      animation: spin 10s linear infinite;
    "></div>
  `;

  if (!document.getElementById("eye-loading-style")) {
    const loadingStyle = document.createElement("style");
    loadingStyle.id = "eye-loading-style";
    loadingStyle.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(loadingStyle);
  }
  document.body.appendChild(loadingOverlay);

  // Scripts requeridos
  const scripts = [
    "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.min.js",
    "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
    "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
  ];
  const loadNextScript = src => new Promise(resolve => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => console.error(`Error al cargar script: ${src}`);
    document.head.appendChild(script);
  });

  Promise.all(scripts.map(loadNextScript)).then(() => {
    // Video para calibración (visible)
    const videoElement = document.createElement("video");
    Object.assign(videoElement.style, {
      position: "fixed",
      bottom: "10px",
      right: "10px",
      width: "160px",
      height: "120px",
      border: "2px solid #fff",
      zIndex: 999999
    });
    document.body.appendChild(videoElement);

    // Constantes de suavizado
    const NORMAL_SMOOTHING = 0.05;  
    const HOVER_SMOOTHING  = 0.01;  

    // Cursor ocular
    const cursor = document.createElement("div");
    cursor.id = "eye-cursor";
    Object.assign(cursor.style, {
      position: "fixed",
      width: "15px",
      height: "15px",
      borderRadius: "50%",
      backgroundColor: "red",
      zIndex: 9999989,
      pointerEvents: "none",
      opacity: "0",
      transform: "scale(0)",
      transition: "opacity 0.5s ease, transform 0.5s ease, left 0.3s ease-out, top 0.3s ease-out"
    });
    document.body.appendChild(cursor);
    requestAnimationFrame(() => {
      cursor.style.opacity = "1";
      cursor.style.transform = "scale(1.5)";
      setTimeout(() => cursor.style.transform = "scale(1)", 500);
    });

    // Styles para hover
    if (!document.getElementById("eye-hover-style")) {
      const style = document.createElement("style");
      style.id = "eye-hover-style";
      style.textContent = `
      .eye-hovered {
        /* Borde grueso y sólido de color rojo */
        outline: 4px solid #FF0000 !important;
        /* Fondo semitransparente para destacar */
        background-color: rgba(255, 0, 0, 0.2) !important;
        /* Sombra intensa alrededor */
        box-shadow: 0 0 8px 4px rgba(255, 0, 0, 0.5) !important;
        /* Transiciones suaves */
        transition: 
          outline 0.2s ease, 
          background-color 0.2s ease, 
          box-shadow 0.2s ease;
      }
    `;
    
      document.head.appendChild(style);
    }

    // Elemento de progreso de parpadeo
    const progress = document.createElement("div");
    progress.id = "eye-progress";
    Object.assign(progress.style, {
      position: "fixed",
      width: "40px",
      height: "40px",
      border: "2px solid lime",
      borderRadius: "50%",
      pointerEvents: "none",
      transform: "scale(0)",
      transition: "transform 0.1s linear, left 0.3s ease-out, top 0.3s ease-out"
    });
    document.body.appendChild(progress);

    // Target de calibración (centro)
    const calibTarget = document.createElement("div");
    calibTarget.id = "eye-calibration-target";
    Object.assign(calibTarget.style, {
      position: "fixed",
      width: "20px",
      height: "20px",
      border: "2px solid yellow",
      borderRadius: "50%",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 9999999
    });
    document.body.appendChild(calibTarget);

    let lastX = 0, lastY = 0;
    let lastClickTime = 0;
    let eyeClosedStartTime = null;
    const EYE_CLOSED_THRESHOLD = 0.23;
    const EYE_CLOSED_DURATION = 2000; // ms

    const AMPLIFICATION_X = 35;
    const AMPLIFICATION_Y_UP = 35;
    const AMPLIFICATION_Y_DOWN = 35;
    const SCROLL_MARGIN = 11;
    const SCROLL_SPEED = 5;

    const smoothMove = (x, y, speed = NORMAL_SMOOTHING) => {
      const dx = x - lastX;
      const dy = y - lastY;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
      lastX += dx * speed;
      lastY += dy * speed;
      cursor.style.left = `${lastX}px`;
      cursor.style.top  = `${lastY}px`;
      progress.style.left = `${lastX - 20}px`;
      progress.style.top  = `${lastY - 20}px`;
    };

    function getEAR(landmarks, topIndex, bottomIndex) {
      const top = landmarks[topIndex];
      const bottom = landmarks[bottomIndex];
      return Math.abs(top.y - bottom.y);
    }

    function simulateClickAtCursor(x, y) {
      const now = Date.now();
      if (now - lastClickTime < 1000) return;
      lastClickTime = now;
      const el = document.elementFromPoint(x, y);
      if (el) {
        el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
      }
    }

    const faceMesh = new window.FaceMesh({
      locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    });
    faceMesh.setOptions({ maxNumFaces: 1, refineLandmarks: true, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });

 // Añade este helper arriba, fuera de onResults:
function isInteractiveElement(el) {
  return el &&
    (["BUTTON", "A"].includes(el.tagName) ||
     el.getAttribute("role") === "button" ||
     el.hasAttribute("tabindex"));
}


faceMesh.onResults(results => {
  const lm = results.multiFaceLandmarks?.[0];
  if (!lm) return;

  //  Calcular target de mirada (ax, ay)
  const iris = lm[468];
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const rawX = (1 - iris.x) * window.innerWidth;
  const rawY = iris.y * window.innerHeight;
  const offX = (rawX - cx) * AMPLIFICATION_X;
  const offY = (rawY - cy) * (rawY > cy ? AMPLIFICATION_Y_DOWN : AMPLIFICATION_Y_UP);
  let ax = Math.max(0, Math.min(window.innerWidth  - 15, cx + offX));
  let ay = Math.max(0, Math.min(window.innerHeight - 15, cy + offY));

  //  Scroll automático si toca bordes
  if (ay < SCROLL_MARGIN) window.scrollBy(0, -SCROLL_SPEED);
  else if (ay > window.innerHeight - SCROLL_MARGIN) window.scrollBy(0, SCROLL_SPEED);

  // 3. Detección previa para ajustar velocidad
  const elAtRaw = document.elementFromPoint(ax, ay);
  const isTargetInteractive = isInteractiveElement(elAtRaw);
  const moveSpeed = isTargetInteractive ? HOVER_SMOOTHING : NORMAL_SMOOTHING;

  // 4. Mover cursor (actualiza lastX/lastY y estilos left/top)
  smoothMove(ax, ay, moveSpeed);

  // Detección EXACTA bajo el **centro** del cursor visible
  const rectC = cursor.getBoundingClientRect();
  const hoverX = rectC.left + rectC.width  / 2;
  const hoverY = rectC.top  + rectC.height / 2;

  //  Limpiar resaltados previos
  document.querySelectorAll(".eye-hovered")
    .forEach(el => el.classList.remove("eye-hovered"));

  const elHover = document.elementFromPoint(hoverX, hoverY);
  if (isInteractiveElement(elHover)) {
    // 7a. Resaltar elemento EXACTAMENTE bajo el punto
    elHover.classList.add("eye-hovered");
    // 7b. Cambiar estilo del cursor
    cursor.style.backgroundColor = "lime";
    cursor.style.transform       = "scale(1.5)";
  } else {
    // 8. Volver al estilo normal
    cursor.style.backgroundColor = "red";
    cursor.style.transform       = "scale(1)";
  }

  // 9. Lógica de parpadeo (idéntica a la tuya)
  const leftEAR  = getEAR(lm, 159, 145);
  const rightEAR = getEAR(lm, 386, 374);
  const closed   = leftEAR < EYE_CLOSED_THRESHOLD && rightEAR < EYE_CLOSED_THRESHOLD;
  if (closed) {
    if (!eyeClosedStartTime) eyeClosedStartTime = Date.now();
    const elapsed = Date.now() - eyeClosedStartTime;
    const ratio   = Math.min(elapsed / EYE_CLOSED_DURATION, 1);
    progress.style.transform = `scale(${ratio})`;
    if (elapsed >= EYE_CLOSED_DURATION) {
      simulateClickAtCursor(lastX, lastY);
      eyeClosedStartTime = null;
      progress.style.transform = "scale(0)";
    }
  } else {
    eyeClosedStartTime = null;
    progress.style.transform = "scale(0)";
  }
});


    const camera = new window.Camera(videoElement, {
      onFrame: async () => await faceMesh.send({ image: videoElement }),
      width: 640,
      height: 480
    });
    camera.start();
    loadingOverlay.remove();
  });
}
