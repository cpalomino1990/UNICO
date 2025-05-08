
const highlightStyles = [
  { filter: "contrast(150%)", label: "Contraste Alto" },
  { filter: "grayscale(100%)", label: "Escala de Grises" },
  { filter: "hue-rotate(100deg)", label: "Cambio de Tonos" },
];


const highlightStylesDolto = {
  
  protanomaly : { filter: "contrast(1.1) saturate(0.8) hue-rotate(15deg)", label: "protanomalía" },
  deuteranomaly :{ filter: "contrast(1.1) saturate(0.8) hue-rotate(-15deg)", label: "Deuteranomalía" },
  tritanomaly :{ filter: "contrast(1.1) saturate(0.8) hue-rotate(50deg)", label: "Tritanomalía" },
  deuteranopia :{ filter: "contrast(1.1) saturate(0.6) hue-rotate(-30deg)", label: "Deuteranopía" },
  tritanopia :{ filter: "contrast(1.1) saturate(0.6) hue-rotate(90deg)", label: "Tritanopía" },
  protanopia :{ filter: "contrast(1.1) saturate(0.6) hue-rotate(30deg)", label: "Protanopía" },
  achromatomaly :{ filter: "grayscale(0.8) contrast(1.2)", label: "Acromatomalía" },
  achromatopsia :{ filter: "grayscale(1) contrast(1.2)", label: "Acromatopsia" },
  lowContrast : { filter: "contrast(0.8) brightness(1.1) saturate(0.8)", label: "Bajo Contraste" },

};

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



 //--------------->Aplicar filtro de protanopia<------------------//
 export function activateProtanopia() {
  const current = localStorage.getItem("highlightColors");

  if (current === "protanopia") {
    removeHighlightStyles();
    localStorage.removeItem("highlightColors");
    updateButtonLabel("Resaltar Colores");
  } else {
    applyHighlightStylesDolto(highlightStylesDolto.protanopia.filter);
    localStorage.setItem("highlightColors", "protanopia");
    updateButtonLabel(highlightStylesDolto.protanopia.label);
  }
}

export function activateDeuteranomaly() {
  const current = localStorage.getItem("highlightColors");

  if (current === "deuteranomaly") {
    removeHighlightStyles();
    localStorage.removeItem("highlightColors");
    updateButtonLabel("Resaltar Colores");
  } else {
    applyHighlightStylesDolto(highlightStylesDolto.deuteranomaly.filter);
    localStorage.setItem("highlightColors", "deuteranomaly");
    updateButtonLabel(highlightStylesDolto.deuteranomaly.label);
  }
}

export function activateDeuteranopia() {
  const current = localStorage.getItem("highlightColors");

  if (current === "deuteranopia") {
    removeHighlightStyles();
    localStorage.removeItem("highlightColors");
    updateButtonLabel("Resaltar Colores");
  } else {
    applyHighlightStylesDolto(highlightStylesDolto.deuteranopia.filter);
    localStorage.setItem("highlightColors", "deuteranopia");
    updateButtonLabel(highlightStylesDolto.deuteranopia.label);
  }
}

export function activatetritanopia() {
  const current = localStorage.getItem("highlightColors");

  if (current === "tritanopia") {
    removeHighlightStyles();
    localStorage.removeItem("highlightColors");
    updateButtonLabel("Resaltar Colores");
  } else {
    applyHighlightStylesDolto(highlightStylesDolto.tritanopia.filter);
    localStorage.setItem("highlightColors", "tritanopia");
    updateButtonLabel(highlightStylesDolto.tritanopia.label);
  }
}

export function activateAchromatomaly() {
  const current = localStorage.getItem("highlightColors");

  if (current === "achromatomaly") {
    removeHighlightStyles();
    localStorage.removeItem("highlightColors");
    updateButtonLabel("Resaltar Colores");
  } else {
    applyHighlightStylesDolto(highlightStylesDolto.achromatomaly.filter);
    localStorage.setItem("highlightColors", "achromatomaly");
    updateButtonLabel(highlightStylesDolto.achromatomaly.label);
  }
}

export function activateAchromatopsia() {
  const current = localStorage.getItem("highlightColors");

  if (current === "achromatopsia") {
    removeHighlightStyles();
    localStorage.removeItem("highlightColors");
    updateButtonLabel("Resaltar Colores");
  } else {
    applyHighlightStylesDolto(highlightStylesDolto.achromatopsia.filter);
    localStorage.setItem("highlightColors", "achromatopsia");
    updateButtonLabel(highlightStylesDolto.achromatopsia.label);
  }
}

export function activateProtanomaly() {
  const current = localStorage.getItem("highlightColors");

  if (current === "protanomaly") {
    removeHighlightStyles();
    localStorage.removeItem("highlightColors");
    updateButtonLabel("Resaltar Colores");
  } else {
    applyHighlightStylesDolto(highlightStylesDolto.protanomaly.filter);
    localStorage.setItem("highlightColors", "protanomaly");
    updateButtonLabel(highlightStylesDolto.protanomaly.label);
  }
}

export function activateTritanomaly() {
  const current = localStorage.getItem("highlightColors");

  if (current === "tritanomaly") {
    removeHighlightStyles();
    localStorage.removeItem("highlightColors");
    updateButtonLabel("Resaltar Colores");
  } else {
    applyHighlightStylesDolto(highlightStylesDolto.tritanomaly.filter);
    localStorage.setItem("highlightColors", "tritanomaly");
    updateButtonLabel(highlightStylesDolto.tritanomaly.label);
  }
  }

  export function activateLowContrast() {
    const current = localStorage.getItem("highlightColors");

    if (current === "lowContrast") {
      removeHighlightStyles();
      localStorage.removeItem("highlightColors");
      updateButtonLabel("Resaltar Colores");
    } else {
      applyHighlightStylesDolto(highlightStylesDolto.lowContrast.filter);
      localStorage.setItem("highlightColors", "lowContrast");
      updateButtonLabel(highlightStylesDolto.lowContrast.label);
    }
  }





// Aplicar el estado guardado al cargar
export function loadHighlightSetting1(buttonElement) {
  highlightButton1 = buttonElement;

  const savedKey = localStorage.getItem("highlightColors");
  if (savedKey && highlightStylesDolto[savedKey]) {
    applyHighlightStylesDolto(highlightStylesDolto[savedKey].filter);
    updateButtonLabel(highlightStylesDolto[savedKey].label);
  } else {
    updateButtonLabel("Resaltar Colores");
  }
}

// Aplicar filtro en el <html>
function applyHighlightStylesDolto(filter) {
  let styleTag = document.getElementById("highlight-style");
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = "highlight-style";
    document.head.appendChild(styleTag);
  }
  styleTag.innerHTML = `html { filter: ${filter} !important; }`;
}



