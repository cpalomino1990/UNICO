const sizeLevels = [
  { fontsize: "105%",   label: "Aumentar +25%" },
  { fontsize: "108",    label: "Aumentar +50%" },
  { fontsize: "113%",   label: "Aumentar +75%" }
];

let currentSizeIndex = 0;
let sizeButton = null; // Referencia al botón

export function FontsizeChange() {
  let styleTag = document.getElementById("letter-size-style");

  if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "letter-size-style";
      document.head.appendChild(styleTag);
  }

  // Si ya llegamos al último nivel, restablecemos
  if (currentSizeIndex >= sizeLevels.length) {
      removeFontsizeChange();
      localStorage.removeItem("forntSize");
      currentSizeIndex = 0;
      UpdateFontsizeChange("Aumnetar Letras ");
  } else {
      applyLetterSize(sizeLevels[currentSizeIndex].fontsize);
      localStorage.setItem("letterSize", currentSizeIndex);
      UpdateFontsizeChange(sizeLevels[currentSizeIndex].label);
      currentSizeIndex++;
  }
}

// Inyectar el espaciado en la página (afectando todos los textos)
function applyLetterSize(fontsize) {
  const styleTag = document.getElementById("letter-size-style");
  styleTag.innerHTML = `
      body, p, span, a, li, div, h1, h2, h3, h4, h5, h6 {
          font-size:  ${fontsize} !important; 
      }
  `;
}

// Eliminar el espaciado
function removeFontsizeChange() {
  const styleTag = document.getElementById("letter-size-style");
  if (styleTag) {
      styleTag.innerHTML = ""; // Limpia el contenido en lugar de eliminarlo
  }
}

// Actualizar el texto del botón
function UpdateFontsizeChange(text) {
  if (sizeButton) {
      sizeButton.textContent = text;
  }
}

// Aplicar el estado guardado al recargar la página
export function loadFontsizeSetting(buttonElement) {
  sizeButton = buttonElement; // Guardar referencia al botón

  const savedIndex = parseInt(localStorage.getItem("letterSize"), 10);
  if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < sizeLevels.length) {
      applyLetterSize(sizeLevels[savedIndex].size);
      UpdateFontsizeChange(sizeLevels[savedIndex].label);
      currentSizeIndex = savedIndex + 1;
  } else {
      UpdateFontsizeChange("Aumentar letra");
  }
}