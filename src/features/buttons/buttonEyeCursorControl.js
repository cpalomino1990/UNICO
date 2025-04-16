import { isMobile } from "../../shared/constants/enviroments";

export function initEyeCursorControl() {
  if (window.eyeCursorActive) return;
  window.eyeCursorActive = true;

  

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
    cursor.style.position = "absolute";
    cursor.style.width = "15px";
    cursor.style.height = "15px";
    cursor.style.borderRadius = "50%";
    cursor.style.backgroundColor = "blue";
    cursor.style.zIndex = 9999;
    // cursor.style.pointerEvents = "none";
    document.body.appendChild(cursor);

    let lastX = 0;
    let lastY = 0;
    const amplification = 4.0;

    const smoothMove = (x, y) => {
      lastX += (x - lastX) * 0.2;
      lastY += (y - lastY) * 0.2;
      cursor.style.left = `${lastX}px`;
      cursor.style.top = `${lastY}px`;
    };

    const faceMesh = new window.FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      if (results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];
        const iris = landmarks[468];

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const rawX = (1 - iris.x) * window.innerWidth;
        const rawY = iris.y * window.innerHeight;

        const offsetX = (rawX - centerX) * amplification;
        const offsetY = (rawY - centerY) * amplification;

        const amplifiedX = centerX + offsetX;
        const amplifiedY = centerY + offsetY;

        smoothMove(amplifiedX, amplifiedY);

        const leftEAR = getEAR(landmarks, 159, 145);
        const rightEAR = getEAR(landmarks, 386, 374);
        const eyesClosed = leftEAR < EYE_CLOSED_THRESHOLD && rightEAR < EYE_CLOSED_THRESHOLD;

        if (eyesClosed) {
          if (!eyeClosedStartTime) {
            eyeClosedStartTime = Date.now();
          } else if (Date.now() - eyeClosedStartTime > EYE_CLOSED_DURATION) {
            simulateClickAtCursor(lastX, lastY);
            eyeClosedStartTime = null;
          }
        } else {
          eyeClosedStartTime = null;
        }
      }
    });

    const camera = new window.Camera(videoElement, {
      onFrame: async () => {
        await faceMesh.send({ image: videoElement });
      },
      facingMode: "user",
      width: 640,
      height: 480,
    });

    camera.start();
  });
}

// Auxiliares
let eyeClosedStartTime = null;
const EYE_CLOSED_THRESHOLD = 0.23;
const EYE_CLOSED_DURATION = 2000;

function getEAR(landmarks, topIndex, bottomIndex) {
  const top = landmarks[topIndex];
  const bottom = landmarks[bottomIndex];
  return Math.abs(top.y - bottom.y);
}

function simulateClickAtCursor(x, y) {
  const el = document.elementFromPoint(x, y);
  if (el) {
    console.log("👁️ Click simulado en:", el);
    el.click();
  }
}

