// selectiveContrast.js

// Alternar el modo de contraste selectivo
export function toggleSelectiveContrast() {
    const isActive = document.body.classList.toggle("selective-contrast");
    localStorage.setItem("selectiveContrast", isActive ? "enabled" : "disabled");
  
    const elements = document.querySelectorAll("p, h1, h2, h3, span, a, strong, b");
    elements.forEach(el => {
      if (isActive) {
        el.classList.add("contrast-enhanced");
      } else {
        el.classList.remove("contrast-enhanced");
      }
    });
  }
  

  //  Cargar la configuración al inicio
  export function loadSelectiveContrastSetting() {
    if (localStorage.getItem("selectiveContrast") === "enabled") {
      document.body.classList.add("selective-contrast");
      const elements = document.querySelectorAll("p, h1, h2, h3, span, a, strong, b");
      elements.forEach(el => el.classList.add("contrast-enhanced"));
    }
  }
  
  // Estilos para el contraste selectivo
  const styleTag = document.createElement("style");
  styleTag.innerHTML = `
    .contrast-enhanced {
      background-color: #000 !important;
      color: #fff !important;
      padding: 2px 4px;
      border-radius: 4px;
    }
  `;
  document.head.appendChild(styleTag);
  
  // 4. Crear el botón de contraste selectivo
  export function createSelectiveContrastButton() {
    const button = document.createElement("button");
    button.id = "selective-contrast-btn";
    button.textContent = "Contraste selectivo";
    button.style.margin = "5px";
    button.style.padding = "10px";
    button.style.borderRadius = "8px";
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.style.backgroundColor = "#222";
    button.style.color = "#fff";
    button.style.fontSize = "20px";
  
    button.addEventListener("click", toggleSelectiveContrast);
  
    return button;
  }
  
  // 5. Cargar configuración al inicio
  window.addEventListener("DOMContentLoaded", () => {
    loadSelectiveContrastSetting();
  });
  