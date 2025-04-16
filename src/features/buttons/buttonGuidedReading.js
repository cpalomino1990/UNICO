export function toggleWordByWordReading() {
 
    const elements = document.querySelectorAll("p, h1, h2, h3, span, li");
    elements.forEach(el => {
      el.removeEventListener("mouseenter", handleWordByWord);
      el.removeEventListener("mouseleave", stopWordByWord);
      el.addEventListener("mouseenter", handleWordByWord);
      el.addEventListener("mouseleave", stopWordByWord);
    });
  }
  
  function handleWordByWord(e) {
    const el = e.currentTarget;
    if (el.dataset.activeReading === "true") return;
    el.dataset.originalText = el.innerHTML;
    const words = el.innerText.trim().split(/\s+/);
    if (!words.length) return;
    el.innerHTML = words.map(word => `<span class="guided-word">${word}</span>`).join(" ");
    const spans = el.querySelectorAll(".guided-word");
    el.dataset.activeReading = "true";
    readWord(0, spans, el);
  }
  
  function readWord(index, spans, el) {
    if (index >= spans.length) {
      speechSynthesis.cancel();
      setTimeout(() => {
        if (el.dataset.originalText) {
          el.innerHTML = el.dataset.originalText;
          delete el.dataset.originalText;
        }
        delete el.dataset.activeReading;
      }, 500);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(spans[index].textContent);
    utterance.lang = "es-ES";
    utterance.rate = getSpeedValue();
    utterance.pitch = 1;
    utterance.onstart = () => {
      spans[index].classList.add("current-word");
    };
    utterance.onend = () => {
      spans[index].classList.remove("current-word");
      readWord(index + 1, spans, el);
    };
    speechSynthesis.speak(utterance);
  }
  
  function stopWordByWord(e) {
    const el = e.currentTarget;
    speechSynthesis.cancel();
    if (el.dataset.originalText) {
      el.innerHTML = el.dataset.originalText;
      delete el.dataset.originalText;
    }
    delete el.dataset.activeReading;
  }
  
  function getSpeedValue() {
    return window.currentSpeed === "fast" ? 1.5 : window.currentSpeed === "slow" ? 0.5 : 1;
  }
  
  // Estilo para el resaltado
  const guidedStyle = document.createElement("style");
  guidedStyle.innerHTML = `
    .current-word {
      background-color: yellow;
      transition: background-color 0.3s ease;
    }
  `;
  document.head.appendChild(guidedStyle);
  