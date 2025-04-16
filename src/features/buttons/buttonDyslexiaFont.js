// Inserta la fuente OpenDyslexic desde el CDN mediante un <link>
function insertDyslexiaFontCDN() {
  if (!document.getElementById("open-dyslexic-font")) {
    const link = document.createElement("link");
    link.id = "open-dyslexic-font";
    link.rel = "stylesheet";
    // URL de la hoja de estilo que carga la fuente OpenDyslexic
    link.href = "https://fonts.cdnfonts.com/css/open-dyslexic";
    document.head.appendChild(link);
  }
}
insertDyslexiaFontCDN();

// Inyecta estilos para forzar la fuente a todos los elementos dentro de .font-dyslexia
const dyslexiaStyleTag = document.createElement("style");
dyslexiaStyleTag.innerHTML = `
  .font-dyslexia * {
    font-family: 'Open-Dyslexic', sans-serif !important;
  }
`;
document.head.appendChild(dyslexiaStyleTag);

// Alterna la fuente disléxica y guarda el estado en localStorage
export function toggleDyslexiaFont() {
  const body = document.body;
  const isActive = body.classList.toggle("font-dyslexia");
  localStorage.setItem("dyslexiaFont", isActive ? "true" : "false");
  updateDyslexiaFontButtonText();
}

// Carga la configuración guardada al iniciar
export function loadDyslexiaFontSetting() {
  if (localStorage.getItem("dyslexiaFont") === "true") {
    document.body.classList.add("font-dyslexia");
  }
  updateDyslexiaFontButtonText();
}

// Actualiza el texto del botón según el estado
function updateDyslexiaFontButtonText() {
  const btn = document.getElementById("dyslexia-font-btn");
  if (btn) {
    btn.textContent = document.body.classList.contains("font-dyslexia")
      ? "Fuente Disléxica: Activada"
      : "Fuente Disléxica: Desactivada";
  }
}


window.addEventListener("DOMContentLoaded", loadDyslexiaFontSetting);
