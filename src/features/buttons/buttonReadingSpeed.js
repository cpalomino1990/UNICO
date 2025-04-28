//leer en voz alta//

let currentSpeed = "rapido"; // Declare currentSpeed globally
let isReading = false;
let utterance;

export function toggleReadSpeed() {
  const readButton = document.getElementById("read-text-aloud");

  if (!isReading) {
    isReading = true;
    currentSpeed = "rapido";
    document.body.addEventListener("mouseover", startReading);
    document.body.addEventListener("mouseout", stopReading);
  } else if (currentSpeed === "rapido") {
    currentSpeed = "fast";
  } else if (currentSpeed === "fast") {
    currentSpeed = "slow";
  } else {
    isReading = false;
    currentSpeed = "rapido";
    stopReading();
    document.body.removeEventListener("mouseover", startReading);
    document.body.removeEventListener("mouseout", stopReading);
  }
}

function startReading(event) {
  if (isReading && isValidElement(event.target)) {
    // Remueve resaltados previos
    document.querySelectorAll(".highlighted").forEach((el) => el.classList.remove("highlighted"));

    // Agrega la clase de resaltado al elemento actual
    event.target.classList.add("highlighted");

    // Crea y configura el objeto de síntesis de voz
    utterance = new SpeechSynthesisUtterance(event.target.innerText);
    utterance.lang = "es-ES";
    utterance.rate = getSpeedValue();
    utterance.pitch = 1;

    // Cuando termina la lectura, quita el resaltado
    utterance.onend = () => {
      event.target.classList.remove("highlighted");
    };

    speechSynthesis.speak(utterance);
  }
}

function stopReading() {
  speechSynthesis.cancel();
  document.querySelectorAll(".highlighted").forEach((el) => el.classList.remove("highlighted"));
}

function isValidElement(element) {
  const validTags = ["P", "H1", "H2", "H3", "SPAN", "BUTTON", "A"];
  return validTags.includes(element.tagName) && element.innerText.trim().length > 2;
}

function getSpeedValue() {
  return currentSpeed === "fast" ? 1.5 : currentSpeed === "slow" ? 0.5 : 1;
}

// Agregar estilos de resaltado dinámicamente
const style = document.createElement("style");
style.innerHTML = `
  .highlighted {
    background-color: yellow;
    transition: background-color 0.3s ease;
  }
`;
document.head.appendChild(style);
