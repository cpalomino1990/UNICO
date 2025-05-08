const highlightClass = "highlight-important";

export function toggleHighlightImportant() {
    const alreadyActive = document.body.classList.contains(highlightClass);

    if (alreadyActive) {
        removeHighlightStyles();
        localStorage.setItem("highlightImportant", "false");
    } else {
        applyHighlightStyles();
        localStorage.setItem("highlightImportant", "true");
    }
    document.body.classList.toggle(highlightClass);
}

function applyHighlightStyles() {
    let styleTag = document.getElementById("highlight-important-style");

    if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "highlight-important-style";
        styleTag.innerHTML = `
            .highlight-important [data-highlighted="true"] {
                outline: 2px solid #f7c948 !important;
                outline-offset: 4px;
                box-shadow: 0 0 6px rgba(247, 201, 72, 0.4) !important;
                
                transition: outline 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
            }
        `;
        document.head.appendChild(styleTag);
    }

    // Elementos importantes
    const selectors = [
        "h1", "h2", "h3",
        "a", "button", "input",
        "textarea", "select",
        '[role="button"]'
    ];

    const elements = Array.from(document.querySelectorAll(selectors.join(',')));

    elements.forEach(el => {
        // Solo resaltar si no está contenido en otro resaltado
        if (!el.closest('[data-highlighted="true"]')) {
            el.setAttribute('data-highlighted', 'true');
        }
    });
}

function removeHighlightStyles() {
    const styleTag = document.getElementById("highlight-important-style");
    if (styleTag) styleTag.remove();

    // Limpiar los atributos en los elementos
    const highlightedElements = document.querySelectorAll('[data-highlighted="true"]');
    highlightedElements.forEach(el => el.removeAttribute('data-highlighted'));
}

export function loadHighlightImportantSetting() {
    if (localStorage.getItem("highlightImportant") === "true") {
        document.body.classList.add(highlightClass);
        applyHighlightStyles();
    }
}
