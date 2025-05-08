const sizeLevels = [
  { fontsize: "105%", label: "Aumentar +25%" },
  { fontsize: "110%", label: "Aumentar +50%" },
  { fontsize: "115%", label: "Aumentar +75%" }
];

let currentSizeIndex = 0;
let sizeButton = null;

export function FontsizeChange() {
  let styleTag = document.getElementById("letter-size-style");

  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = "letter-size-style";
    document.head.appendChild(styleTag);
  }

  // Si ya pasamos el último nivel, reiniciamos
  if (currentSizeIndex >= sizeLevels.length) {
    removeFontsizeChange();
    localStorage.removeItem("letterSize");
    currentSizeIndex = 0;
    UpdateFontsizeChange("Aumentar letra");
  } else {
    applyLetterSize(sizeLevels[currentSizeIndex].fontsize);
    localStorage.setItem("letterSize", currentSizeIndex);
    UpdateFontsizeChange(sizeLevels[currentSizeIndex].label);
    currentSizeIndex++;
  }
}

function applyLetterSize(fontsize) {
  const styleTag = document.getElementById("letter-size-style");
  styleTag.innerHTML = `
    body *:not(#my-widget):not(#my-widget *), 
    body:not(#my-widget) {
      font-size: ${fontsize} !important;
    }
  `;
}


function removeFontsizeChange() {
  const styleTag = document.getElementById("letter-size-style");
  if (styleTag) {
    styleTag.innerHTML = "";
  }
}

function UpdateFontsizeChange(text) {
  if (sizeButton) {
    sizeButton.textContent = text;
  }
}

export function loadFontsizeSetting(buttonElement) {
  sizeButton = buttonElement;

  const savedIndex = parseInt(localStorage.getItem("letterSize"), 10);
  if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < sizeLevels.length) {
    applyLetterSize(sizeLevels[savedIndex].fontsize);
    UpdateFontsizeChange(sizeLevels[savedIndex].label);
    currentSizeIndex = savedIndex + 1;
  } else {
    UpdateFontsizeChange("Aumentar letra");
  }
}
