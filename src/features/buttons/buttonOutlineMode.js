// Función para alternar el modo de resaltar bordes
export function toggleOutlineMode() {
    const isActive = document.body.classList.toggle("outline-mode");
    localStorage.setItem("outlineMode", isActive ? "on" : "off");
  }
  
  // Aplicar configuración guardada al cargar la página
  export function loadOutlineSetting() {
    if (localStorage.getItem("outlineMode") === "on") {
      document.body.classList.add("outline-mode");
    }
  }
  
  // Estilos CSS dinámicos para el resaltado de bordes
  const outlineStyle = document.createElement("style");
  outlineStyle.innerHTML = `
  
    .outline-mode button,
    .outline-mode a,
    .outline-mode input,
    .outline-mode select,
    .outline-mode textarea,
    .outline-mode h1,
    .outline-mode h2,
    .outline-mode h3,
    .outline-mode h4,
    .outline-mode p,
    .outline-mode img {
      outline: 3px solid #FF00FF !important;
      outline-offset: 2px;
      border-radius: 4px;
    }
  `;
  document.head.appendChild(outlineStyle);
  
  // Llama a esta función al cargar el widget
  loadOutlineSetting();
  