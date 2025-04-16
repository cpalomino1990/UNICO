export function preventAbruptScroll() {
  const originalScrollTo = window.scrollTo;
  const originalScroll = window.scroll;

  window.scrollTo = function (...args) {
    const opts = args[0];
    
    const isBrusco = 
      (typeof opts === "object" && opts.top === 0 && opts.behavior === "auto") ||
      (args[0] === 0 && args[1] === 0);

    if (isBrusco) {
      console.warn("⚠️ Scroll brusco bloqueado por accesibilidad");
      return;
    }

    return originalScrollTo.apply(window, args);
  };

  window.scroll = function (...args) {
    const isBrusco = args[0] === 0 && args[1] === 0;
    
    if (isBrusco) {
      console.warn("⚠️ Scroll brusco bloqueado por accesibilidad");
      return;
    }

    return originalScroll.apply(window, args);
  };

  const btn = document.getElementById("control-scroll");
  if (btn) {
    btn.innerText = isActive ? "Control Desplazamiento Activado" : "Control Desplazamiento";
  }
}
