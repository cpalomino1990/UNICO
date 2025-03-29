// Resaltar colores en la página web
// Al hacer clic en el botón correspondiente, se aplican diferentes filtros de color a la página web

const highlightStyles = [
  { filter: "contrast(150%)", label: "Contraste Alto" },
  { filter: "grayscale(100%)", label: "Escala de Grises" },
  { filter: "hue-rotate(100deg)", label: "Cambio de Tonos" },
];

let currentFilterIndex = 0;
let highlightButton = null; 
export function toggleHighlightColors() {
  let styleTag = document.getElementById("highlight-style");

  if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "highlight-style";
      document.head.appendChild(styleTag);
  }

  
  if (currentFilterIndex >= highlightStyles.length) {
      removeHighlightStyles();
      localStorage.removeItem("highlightColors");
      currentFilterIndex = 0;
      updateButtonLabel("Resaltar Colores");
  } else {
      applyHighlightStyles(highlightStyles[currentFilterIndex].filter);
      localStorage.setItem("highlightColors", currentFilterIndex);
      updateButtonLabel(highlightStyles[currentFilterIndex].label);
      currentFilterIndex++;
  }
}


function applyHighlightStyles(filter) {
  const styleTag = document.getElementById("highlight-style");
  styleTag.innerHTML = `html { filter: ${filter} !important; }`;
}

// Eliminar estilos de resaltado de colores
function removeHighlightStyles() {
  const styleTag = document.getElementById("highlight-style");
  if (styleTag) {
      styleTag.remove();
  }
}

// Actualizar el texto del botón
function updateButtonLabel(text) {
  if (highlightButton) {
      highlightButton.textContent = text;
  }
}

// Aplicar el estado guardado al recargar la página
export function loadHighlightSetting(buttonElement) {
  highlightButton = buttonElement; // Guardar referencia al botón

  const savedIndex = parseInt(localStorage.getItem("highlightColors"), 10);
  if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < highlightStyles.length) {
      applyHighlightStyles(highlightStyles[savedIndex].filter);
      updateButtonLabel(highlightStyles[savedIndex].label);
      currentFilterIndex = savedIndex + 1;
  } else {
      updateButtonLabel("Resaltar Colores");
  }
}









