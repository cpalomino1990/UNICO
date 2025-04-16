export function createVolumeControlButton(targetId) {
    const container = document.getElementById(targetId);
    if (!container) return;
  
    const button = document.createElement("button");
    button.className = "accesibility-btn";
    button.id = "volume-control";
    button.textContent = "Volumen: medio";
  
    const savedLevel = localStorage.getItem("volumeLevel") || "medio";
    button.textContent = `Volumen: ${savedLevel}`;
    setGlobalVolume(savedLevel);
  
    button.addEventListener("click", () => {
      const current = button.textContent.split(": ")[1];
      const next = getNextVolumeLevel(current);
      button.textContent = `Volumen: ${next}`;
      localStorage.setItem("volumeLevel", next);
      setGlobalVolume(next);
    });
  
    container.appendChild(button);
  }
  
  function getNextVolumeLevel(current) {
    if (current === "bajo") return "medio";
    if (current === "medio") return "alto";
    return "bajo";
  }
  
  function setGlobalVolume(level) {
    let volume = 1;
    if (level === "bajo") volume = 0.5;
    else if (level === "medio") volume = 0.2;
    else volume = 1;
  
    // Guarda volumen en variable global (opcional)
    window.accessibilityVolume = volume;
  
    // Ajusta volumen a todos los elementos <audio> y <video>
    document.querySelectorAll("audio, video").forEach(el => {
      el.volume = volume;
    });
  }
  