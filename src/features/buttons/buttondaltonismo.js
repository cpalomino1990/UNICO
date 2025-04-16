export function activateProtanopia() {
  clearDaltonismFilters();
  document.body.classList.add("daltonism-protanopia");
}

export function activateDeuteranopia() {
  clearDaltonismFilters();
  document.body.classList.add("daltonism-deuteranopia");
}

export function activateTritanopia() {
  clearDaltonismFilters();
  document.body.classList.add("daltonism-tritanopia");
}

export function activateProtanomaly() {
  clearDaltonismFilters();
  document.body.classList.add("daltonism-protanomaly");
}

export function activateDeuteranomaly() {
  clearDaltonismFilters();
  document.body.classList.add("daltonism-deuteranomaly");
}

export function activateTritanomaly() {
  clearDaltonismFilters();
  document.body.classList.add("daltonism-tritanomaly");
}

export function activateAchromatomaly() {
  clearDaltonismFilters();
  document.body.classList.add("daltonism-achromatomaly");
}

export function activateAchromatopsia() {
  clearDaltonismFilters();
  document.body.classList.add("daltonism-achromatopsia");
}

export function clearDaltonism() {
  clearDaltonismFilters();
}



export function clearDaltonismFilters() {
  const classesToRemove = [
    // Filtros de daltonismo
    "daltonism-protanopia",
    "daltonism-deuteranopia",
    "daltonism-protanomaly",
    "daltonism-deuteranomaly",
    "daltonism-tritanomaly",
    "daltonism-achromatomaly",
    "daltonism-achromatopsia",
    "daltonism-tritanopia",

   
    "highlight-borders",           
    "text-contrast-enhanced",      
    "text-simplified",             
    "highlight-text-region",       
  ];

  document.body.classList.remove(...classesToRemove);
  localStorage.removeItem("daltonismFilter"); // También limpia el almacenamiento
}

const styleTag = document.createElement("style");
styleTag.innerHTML = `
  .daltonism-protanomaly { filter: contrast(1.1) saturate(0.8) hue-rotate(15deg); }
  .daltonism-deuteranomaly { filter: contrast(1.1) saturate(0.8) hue-rotate(-15deg); }
  .daltonism-tritanomaly { filter: contrast(1.1) saturate(0.8) hue-rotate(50deg); }
  .daltonism-protanopia { filter: contrast(1.1) saturate(0.6) hue-rotate(30deg); }
  .daltonism-deuteranopia { filter: contrast(1.1) saturate(0.6) hue-rotate(-30deg); }
  .daltonism-tritanopia { filter: contrast(1.1) saturate(0.6) hue-rotate(90deg); }
  .daltonism-achromatomaly { filter: grayscale(0.8) contrast(1.2); }
  .daltonism-achromatopsia { filter: grayscale(1) contrast(1.2); }
`;
document.head.appendChild(styleTag);
