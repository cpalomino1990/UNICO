let readingMask;
let readingMaskStyle;

export function toggleReadingMask() {
  const isActive = !!readingMask;

  if (!isActive) {
    createReadingMask(); 
    document.addEventListener('mousemove', moveMask);
    document.addEventListener('scroll', moveMask);
  } else {
    readingMask.remove();
    readingMask = null;
    document.removeEventListener('mousemove', moveMask);
    document.removeEventListener('scroll', moveMask);
  }

  const btn = document.getElementById("toggle-Reading-Mask");
  if (btn) {
    btn.innerText = isActive ? "Máscara de Lectura" : "Máscara de Lectura Activada";
  }
}

function createReadingMask() {
  // Crear la capa de máscara
  readingMask = document.createElement('div');
  readingMask.id = 'reading-mask';
  document.body.appendChild(readingMask);

  // Inyectar estilos si no existen
  if (!readingMaskStyle) {
    readingMaskStyle = document.createElement('style');
    readingMaskStyle.id = 'reading-mask-style';
    readingMaskStyle.innerHTML = `
      #reading-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        pointer-events: none;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.8) 0%,
          rgba(0, 0, 0, 0.8) calc(var(--maskTop, 50%) - 105px),
          transparent calc(var(--maskTop, 50%) - 100px),
          transparent calc(var(--maskTop, 50%) + 100px),
          rgba(0, 0, 0, 0.8) calc(var(--maskTop, 50%) + 105px),
          rgba(0, 0, 0, 0.8) 100%
        );
        transition: background 0.2s ease;
        z-index: 9998;
      }
    `;
    document.head.appendChild(readingMaskStyle);
  }
}

function moveMask(event) {
  const y = event.clientY || window.innerHeight / 2;
  const percentY = (y / window.innerHeight) * 100;
  document.documentElement.style.setProperty('--maskTop', `${percentY}%`);
}
