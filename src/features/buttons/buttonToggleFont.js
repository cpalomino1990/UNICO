// Cambiar Fuentes//

export function toggleFontStyle() {
  const fontClassArial = "font-arial";
  const fontClassVerdana = "font-verdana";
  const body = document.body;

  if (body.classList.contains(fontClassArial)) {
      body.classList.remove(fontClassArial);
      body.classList.add(fontClassVerdana);
      body.style.color = "#1E90FF";
      localStorage.setItem("fontStyle", "verdana");
  } else if (body.classList.contains(fontClassVerdana)) {
      body.classList.remove(fontClassVerdana);
      body.style.color = "";
      localStorage.removeItem("fontStyle");
  } else {
      body.classList.add(fontClassArial);
      body.style.color = "#FF4500";
      localStorage.setItem("fontStyle", "arial");
  }
}

export function loadFontSetting() {
  const savedFont = localStorage.getItem("fontStyle");
  if (savedFont === "arial") {
      document.body.classList.add("font-arial");
      document.body.style.color = "#FF4500";
  } else if (savedFont === "verdana") {
      document.body.classList.add("font-verdana");
      document.body.style.color = "#1E90FF";
  }
}

const styleTag = document.createElement("style");
styleTag.innerHTML = `
  .font-arial, .font-arial * { font-family: Arial, sans-serif !important; }
  .font-verdana, .font-verdana * { font-family: "Verdana", sans-serif !important; }
`;
document.head.appendChild(styleTag);

loadFontSetting();
