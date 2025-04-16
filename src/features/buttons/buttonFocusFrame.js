// Botón para activar/desactivar el marco de enfoque

export function toggleFocusFrame() {
    const isActive = document.body.classList.toggle("focus-frame-active");
    localStorage.setItem("focusFrame", isActive ? "on" : "off");
  
    if (isActive) {
      document.body.addEventListener("mouseover", applyFocusFrame);
      document.body.addEventListener("mouseout", removeFocusFrame);
    } else {
      document.body.removeEventListener("mouseover", applyFocusFrame);
      document.body.removeEventListener("mouseout", removeFocusFrame);
    }
  }
  
  function applyFocusFrame(event) {
    const tagsToHighlight = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
    if (tagsToHighlight.includes(event.target.tagName)) {
      event.target.classList.add("focus-highlight");
    }
  }
  
  function removeFocusFrame(event) {
    event.target.classList.remove("focus-highlight");
  }
  
  // Estilo dinámico
  const focusFrameStyle = document.createElement("style");
  focusFrameStyle.innerHTML = `
    .focus-highlight {
      outline: 3px solid #FF6347; /* Borde llamativo */
      border-radius: 6px;
      transition: outline 0.3s ease;
    }
  `;
  document.head.appendChild(focusFrameStyle);
  
  // Cargar configuración al iniciar
  export function loadFocusFrameSetting() {
    if (localStorage.getItem("focusFrame") === "on") {
      document.body.classList.add("focus-frame-active");
      document.body.addEventListener("mouseover", applyFocusFrame);
      document.body.addEventListener("mouseout", removeFocusFrame);
    }
  }
  