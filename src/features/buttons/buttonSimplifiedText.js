// Función principal
export function toggleSimplifiedText() {
  const isActive = document.body.classList.toggle("simplified-text");
  localStorage.setItem("simplifiedText", isActive ? "true" : "false");

  if (isActive) {
    document.querySelectorAll("video").forEach(video => video);
  }
}

// Cargar configuración guardada al iniciar
export function loadSimplifiedTextSetting() {
  if (localStorage.getItem("simplifiedText") === "true") {
    document.body.classList.add("simplified-text");
    document.querySelectorAll("video").forEach(video => video);
  }
}

// Estilos para modo simplificado
const simplifiedStyle = document.createElement("style");
simplifiedStyle.innerHTML = `
  .simplified-text header,
  .simplified-text nav,
  .simplified-text aside,
  .simplified-text footer,
  .simplified-text .sidebar,
  .simplified-text .ad,
  .simplified-text img,
  .simplified-text picture {
    display: none !important;
  }

  .simplified-text main,
  .simplified-text article,
  .simplified-text section,
  .simplified-text p,
  .simplified-text h1,
  .simplified-text h2,
  .simplified-text h3,
  .simplified-text h4,
  .simplified-text h5,
  .simplified-text h6,
  

  .simplified-text * {
    animation: none !important;
    transition: none !important;
    video {
      display: none !important;
    }
    audio {
      display: none !important;
    }
    img {
      display: none !important;
    }
    picture {
      display: none !important;
    }
   
  }
`;
document.head.appendChild(simplifiedStyle);

// Ejecutar al cargar la página
window.addEventListener("DOMContentLoaded", loadSimplifiedTextSetting);
