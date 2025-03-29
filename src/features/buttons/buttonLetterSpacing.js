//Aumentar especio en el texto
// Aumentar el espaciado entre letras en el texto de la página

const spacingLevels = [
  { spacing: "0.05em", label: "Espaciado +25%" },
  { spacing: "0.1em", label: "Espaciado +50%" },
  { spacing: "0.15em", label: "Espaciado +75%" }
];

let currentSpacingIndex = 0;
let spacingButton = null; // Referencia al botón

export function toggleLetterSpacing() {
  let styleTag = document.getElementById("letter-spacing-style");

  if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "letter-spacing-style";
      document.head.appendChild(styleTag);
  }

  // Si ya llegamos al último nivel, restablecemos
  if (currentSpacingIndex >= spacingLevels.length) {
      removeLetterSpacing();
      localStorage.removeItem("letterSpacing");
      currentSpacingIndex = 0;
      updateSpacingButtonLabel("Aumentar Espaciado");
  } else {
      applyLetterSpacing(spacingLevels[currentSpacingIndex].spacing);
      localStorage.setItem("letterSpacing", currentSpacingIndex);
      updateSpacingButtonLabel(spacingLevels[currentSpacingIndex].label);
      currentSpacingIndex++;
  }
}

// Inyectar el espaciado en la página (afectando todos los textos)
function applyLetterSpacing(spacing) {
  const styleTag = document.getElementById("letter-spacing-style");
  styleTag.innerHTML = `
      body, p, span, a, li, div, h1, h2, h3, h4, h5, h6 {
          letter-spacing: ${spacing} !important;
      }
  `;
}

// Eliminar el espaciado
function removeLetterSpacing() {
  const styleTag = document.getElementById("letter-spacing-style");
  if (styleTag) {
      styleTag.innerHTML = ""; // Limpia el contenido en lugar de eliminarlo
  }
}

// Actualizar el texto del botón
function updateSpacingButtonLabel(text) {
  if (spacingButton) {
      spacingButton.textContent = text;
  }
}

// Aplicar el estado guardado al recargar la página
export function loadLetterSpacingSetting(buttonElement) {
  spacingButton = buttonElement; // Guardar referencia al botón

  const savedIndex = parseInt(localStorage.getItem("letterSpacing"), 10);
  if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < spacingLevels.length) {
      applyLetterSpacing(spacingLevels[savedIndex].spacing);
      updateSpacingButtonLabel(spacingLevels[savedIndex].label);
      currentSpacingIndex = savedIndex + 1;
  } else {
      updateSpacingButtonLabel("Aumentar Espaciado");
  }
}

