//funcion para resaltar los elementos importantes de la pagina
// Resalta los elementos importantes de la página al hacer clic en el botón correspondiente

const highlightClass = "highlight-important";

export function toggleHighlightImportant() {
    if (document.body.classList.contains(highlightClass)) {
        document.body.classList.remove(highlightClass);
        removeHighlightStyles();
        localStorage.setItem("highlightImportant", "false");
    } else {
        document.body.classList.add(highlightClass);
        applyHighlightStyles();
        localStorage.setItem("highlightImportant", "true");
    }
}

// Inyectar estilos para resaltar los elementos importantes
function applyHighlightStyles() {
    let styleTag = document.getElementById("highlight-important-style");

    if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "highlight-important-style";
        styleTag.innerHTML = `
            .highlight-important h1, 
            .highlight-important h2, 
            .highlight-important h3, 
            .highlight-important a, 
            .highlight-important button, 
            .highlight-important input, 
            .highlight-important textarea, 
            .highlight-important select, 
            .highlight-important [role="button"] {
                outline: 3px solid #ffcc00 !important; 
                box-shadow: 0 0 10px rgba(255, 204, 0, 0.8) !important;
                border-radius: 4px;
            }
        `;
        document.head.appendChild(styleTag);
    }
}

// Eliminar los estilos de resaltado
function removeHighlightStyles() {
    const styleTag = document.getElementById("highlight-important-style");
    if (styleTag) {
        styleTag.remove();
    }
}

// Aplicar el estado guardado al recargar la página
export function loadHighlightImportantSetting() {
    if (localStorage.getItem("highlightImportant") === "true") {
        document.body.classList.add(highlightClass);
        applyHighlightStyles();
    }
}
