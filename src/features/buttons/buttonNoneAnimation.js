
// Activa o desactiva las animaciones en la página y pausa/reanuda videos
export function toggleAnimations() {
  document.body.classList.toggle("none-animation");
  const isAnimationDisabled = document.body.classList.contains("none-animation");
  localStorage.setItem("noneAnimation", isAnimationDisabled);

  // Seleccionar todos los videos en la página
  const videos = document.querySelectorAll("video");
  videos.forEach(video => {
      if (isAnimationDisabled) {
          video.pause(); // Pausar video si se desactivan animaciones
      } else {
          video.play(); // Reanudar video si se activan animaciones
      }
  });

  // Desactivar animaciones por CSS
  if (isAnimationDisabled) {
      document.documentElement.style.setProperty("animation", "none", "important");
      document.documentElement.style.setProperty("transition", "none", "important");
  } else {
      document.documentElement.style.removeProperty("animation");
      document.documentElement.style.removeProperty("transition");
  }
}