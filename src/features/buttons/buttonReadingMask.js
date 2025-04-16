let readingMask;

export function toggleReadingMask() {
  if (!readingMask) {
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
    btn.innerText = isActive ? "Mascara de Lectura Activado" : "Mascara de Lectura ";
  }
}

function createReadingMask() {
  readingMask = document.createElement('div');
  readingMask.id = 'reading-mask';
  document.body.appendChild(readingMask);

  const style = document.createElement('style');
  style.innerHTML = `
    #reading-mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      pointer-events: none;
    background: linear-gradient(
        to bottom,
        rgba(0,0,0,0.85) 0%,
        rgba(0,0,0,0.85) calc(var(--maskTop, 50%) - 130px),
        transparent calc(var(--maskTop, 100%) - 120px),
        transparent calc(var(--maskTop, 100%) + 120px),
        rgba(0,0,0,0.85) calc(var(--maskTop, 50%) + 130px),
        rgba(0,0,0,0.85) 100%
      );
      z-index: 9998;
    }
  `;
  document.head.appendChild(style);
}

function moveMask(event) {
  const y = event.clientY || window.innerHeight / 2;
  const percentY = (y / window.innerHeight) * 100;
  document.documentElement.style.setProperty('--maskTop', `${percentY}%`);
  
 

}
