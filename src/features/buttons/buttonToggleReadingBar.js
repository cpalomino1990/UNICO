// Variables globales para seguir la posición del cursor
let cursorX = 0;
let cursorY = 0;

export function toggleReadingBar() {
    const button = document.getElementById("toggle-reading-bar");
    if (document.querySelector('.reading-bar')) {
        deactivateReadingBar();
        button.textContent = "Activar Barra de lectura";
    } else {
        activateReadingBar();
        button.textContent = "Desactivar Barra de lectura";
    }
}

function activateReadingBar() {
    const style = document.createElement('style');
    style.id = 'reading-bar-style';
    document.head.appendChild(style);

    const readingBar = document.createElement('div');
    readingBar.classList.add('reading-bar');
    document.body.appendChild(readingBar);

    const centerElement = document.createElement('span');
    centerElement.classList.add('center-element');
    centerElement.textContent = '•'; // Ícono más neutro
    readingBar.appendChild(centerElement);

    document.addEventListener('mousemove', moveReadingBar);
    document.addEventListener('scroll', updateReadingBarPosition);
}

function deactivateReadingBar() {
    const readingBar = document.querySelector('.reading-bar');
    if (readingBar) readingBar.remove();

    const style = document.getElementById('reading-bar-style');
    if (style) style.remove();

    document.removeEventListener('mousemove', moveReadingBar);
    document.removeEventListener('scroll', updateReadingBarPosition);
}

function moveReadingBar(event) {
    cursorX = event.clientX;
    cursorY = event.clientY;
    updateReadingBarPosition();
}

function updateReadingBarPosition() {
    const readingBar = document.querySelector('.reading-bar');
    const centerElement = document.querySelector('.center-element');
  
    if (readingBar && centerElement) {
        const barWidth = readingBar.offsetWidth;
        const barHeight = readingBar.offsetHeight;
        const centerWidth = centerElement.offsetWidth;

        // Calcular la nueva posición con límites
        let newLeft = cursorX - barWidth / 2;
        let newTop = cursorY + window.scrollY - barHeight / 2;

        // Limitar la barra dentro de la pantalla
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - barWidth));
        newTop = Math.max(window.scrollY, Math.min(newTop, window.scrollY + window.innerHeight - barHeight));

        // Posicionar la barra
        readingBar.style.left = `${newLeft}px`;
        readingBar.style.top = `${newTop}px`;

        // Mover el elemento (span) horizontalmente sobre la barra
        const offset = cursorX - newLeft;
        centerElement.style.left = `${offset - centerWidth / 2}px`;
    }
}
