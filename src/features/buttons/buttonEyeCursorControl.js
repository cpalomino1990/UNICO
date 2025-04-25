// Inicia el control del cursor ocular
export function initEyeCursorControl() {
  if (window.eyeCursorActive) return;
  window.eyeCursorActive = true;

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

  const scripts = [
    "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.min.js",
    "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
    "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
  ];

  const loadNextScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => console.error(`Error al cargar script: ${src}`);
      document.head.appendChild(script);
    });
  };

  Promise.all(scripts.map(loadNextScript)).then(() => {
    const videoElement = document.createElement("video");
    videoElement.style.display = "none";
    document.body.appendChild(videoElement);

    const cursor = document.createElement("div");
    cursor.id = "eye-cursor";
    Object.assign(cursor.style, {
      position: "fixed",
      width: "15px",
      height: "15px",
      borderRadius: "50%",
      backgroundColor: "magenta",
      zIndex: 9999,
      pointerEvents: "none",
      opacity: "0",
      transform: "scale(0)",
      transition: "opacity 0.5s ease, transform 0.5s ease"
    });
    document.body.appendChild(cursor);

    requestAnimationFrame(() => {
      cursor.style.opacity = "1";
      cursor.style.transform = "scale(1.5)";
      setTimeout(() => cursor.style.transform = "scale(1)", 500);
    });

    if (!document.getElementById("eye-hover-style")) {
      const style = document.createElement("style");
      style.id = "eye-hover-style";
      style.textContent = `
        .eye-hovered {
          outline: 2px dashed #00ff00 !important;
          transition: outline 0.2s ease;
        }
      `;
      document.head.appendChild(style);
    }

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

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let lastHoveredElement = null;

    const faceMesh = new window.FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    const scrollMargin = 10;
    const scrollSpeed = 20;

    faceMesh.onResults((results) => {
      if (results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];
        const iris = landmarks[468];

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const rawX = (1 - iris.x) * window.innerWidth;
        const rawY = iris.y * window.innerHeight;

        const amplification = 13;
        const deltaX = rawX - centerX;
        const deltaY = rawY - centerY;
        const threshold = 1; // umbral para el movimiento del cursor

        const newX = Math.abs(deltaX) > threshold ? centerX + deltaX * amplification : lastX;
        const newY = Math.abs(deltaY) > threshold ? centerY + deltaY * amplification : lastY;

        const SMOOTHING_FACTOR = 0.1;
        lastX = lastX + (newX - lastX) * SMOOTHING_FACTOR;
        lastY = lastY + (newY - lastY) * SMOOTHING_FACTOR;

        const MARGIN = 8; // margen mínimo desde el borde
        const clampedX = Math.max(MARGIN, Math.min(window.innerWidth - 15 - MARGIN, lastX));
        const clampedY = Math.max(MARGIN, Math.min(window.innerHeight - 15 - MARGIN, lastY));
        
        cursor.style.left = `${clampedX}px`;
        cursor.style.top = `${clampedY}px`;

        if (lastY < scrollMargin) {
          window.scrollBy(0, -scrollSpeed);
        } else if (lastY > window.innerHeight - scrollMargin) {
          window.scrollBy(0, scrollSpeed);
        }

        const hoveredElement = document.elementFromPoint(clampedX, clampedY);

        document.querySelectorAll(".eye-hovered").forEach(el => el.classList.remove("eye-hovered"));

        const isInteractive =
          hoveredElement &&
          (
            hoveredElement.tagName === "BUTTON" ||
            hoveredElement.tagName === "A" ||
            hoveredElement.getAttribute("role") === "button" ||
            hoveredElement.hasAttribute("tabindex")
          );

        if (isInteractive) {
          cursor.style.backgroundColor = "lime";
          cursor.style.transform = "scale(1.5)";
          hoveredElement.classList.add("eye-hovered");
        } else {
          cursor.style.backgroundColor = "red";
          cursor.style.transform = "scale(1)";
        }

        const leftEAR = getEAR(landmarks, 159, 145);
        const rightEAR = getEAR(landmarks, 386, 374);
        const eyesClosed = leftEAR < EYE_CLOSED_THRESHOLD && rightEAR < EYE_CLOSED_THRESHOLD;

        if (eyesClosed) {
          if (!eyeClosedStartTime) {
            eyeClosedStartTime = Date.now();
            lastHoveredElement = hoveredElement;
          } else if (Date.now() - eyeClosedStartTime > EYE_CLOSED_DURATION && hoveredElement === lastHoveredElement) {
            simulateClickAtCursor(clampedX, clampedY);
            eyeClosedStartTime = null;
            lastHoveredElement = null;
          }
        } else {
          eyeClosedStartTime = null;
          lastHoveredElement = null;
        }
      }
    });

    const camera = new window.Camera(videoElement, {
      onFrame: async () => {
        await faceMesh.send({ image: videoElement });
      },
      width: 640,
      height: 480
    });

    camera.start();
    loadingOverlay.remove();
  });
}

let eyeClosedStartTime = null;
const EYE_CLOSED_THRESHOLD = 0.23;
const EYE_CLOSED_DURATION = 2000;

function getEAR(landmarks, topIndex, bottomIndex) {
  const top = landmarks[topIndex];
  const bottom = landmarks[bottomIndex];
  return Math.abs(top.y - bottom.y);
}

function simulateClickAtCursor(x, y) {
  const clampedX = Math.max(0, Math.min(window.innerWidth - 1, x));
  const clampedY = Math.max(0, Math.min(window.innerHeight - 1, y));

  const el = document.elementFromPoint(clampedX, clampedY);
  if (el) {
    const evt = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window
    });
    el.dispatchEvent(evt);
    console.log("Click simulado en:", el);
  }
}
