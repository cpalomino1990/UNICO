
// Activa o desactiva las animaciones en la página y pausa/reanuda videos
export function toggleAnimations() {
    document.body.classList.toggle("none-animation");
    const isAnimationDisabled = document.body.classList.contains("none-animation");
    localStorage.setItem("noneAnimation", isAnimationDisabled);
  
    // Pausar o reproducir todos los videos
    const videos = document.querySelectorAll("video");
    videos.forEach(video => {
      if (isAnimationDisabled) {
        video.pause();
      } else {
        video.play();
      }
    });
  
    // Agregar estilos si no están ya inyectados
    if (!document.getElementById("none-animation-style")) {
      const styleTag = document.createElement("style");
      styleTag.id = "none-animation-style";
      styleTag.innerHTML = `
       
        .none-animation * {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
          caret-color: transparent !important;
        }
  
      
      `;
      document.head.appendChild(styleTag);
    }
  }
  
  export function loadAnimationSetting() {
    const disabled = localStorage.getItem("noneAnimation") === "true";
    if (disabled) {
      document.body.classList.add("none-animation");
  
      // Reaplicar estilos si no existen (en caso de recarga)
      if (!document.getElementById("none-animation-style")) {
        const styleTag = document.createElement("style");
        styleTag.id = "none-animation-style";
        styleTag.innerHTML = `
          .none-animation * {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
            caret-color: transparent !important;
          }
  
          .none-animation img,
          .none-animation svg,
          .none-animation video,
          .none-animation canvas {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        `;
        document.head.appendChild(styleTag);
      }
    }
  }
  