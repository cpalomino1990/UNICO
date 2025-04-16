// Función que recorre todos los elementos <audio> y <video> y establece su volumen a 0
export function setGlobalMediaVolumeToZero() {
  const mediaElements = document.querySelectorAll("audio, video");
  mediaElements.forEach(el => {
    try {
      el.volume = 0;
    } catch (error) {
      console.warn("No se pudo ajustar el volumen de un elemento:", error);
    }
  });
}

// Crea un botón para activar la función de silencio global
export function createSilenceButton() {
  const button = document.createElement("button");
  button.textContent = "Silenciar Multimedia";
  button.className = "accesibility-btn";
  button.style.margin = "5px";
  button.style.padding = "10px";
  button.style.border = "none";
  button.style.borderRadius = "8px";
  button.style.backgroundColor = "#222";
  button.style.color = "#fff";
  button.style.cursor = "pointer";
  
  // Asocia la función al evento click
  button.addEventListener("click", setGlobalMediaVolumeToZero);
  return button;
}

// Ejemplo de integración: agrega el botón a un contenedor específico del widget
window.addEventListener("DOMContentLoaded", () => {
  const controlsContainer = document.getElementById("widget-controls"); // Asegúrate de tener este contenedor en el DOM
  if (controlsContainer) {
    controlsContainer.appendChild(createSilenceButton());
  }
});
