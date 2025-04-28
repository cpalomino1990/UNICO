import { FontsizeChange } from "../../../features/buttons/buttonChangeTextSize";
import { toggleLargeCursor } from "../../../features/buttons/buttonCursorSatyle";
import { toggleHighlightColors } from "../../../features/buttons/buttonhighlightColors";
import { toggleHighlightImportant } from "../../../features/buttons/buttonhighlightimportant";
import { highlightLinks } from "../../../features/buttons/buttonhighlightLinks";
import { toggleLetterSpacing } from "../../../features/buttons/buttonLetterSpacing";
import { toggleAnimations } from "../../../features/buttons/buttonNoneAnimation";
import { toggleOutlineMode } from "../../../features/buttons/buttonOutlineMode";
import { toggleReadSpeed } from "../../../features/buttons/buttonReadingSpeed";
import { toggleReadOnHover } from "../../../features/buttons/buttonreadPageAloud";
import { toggleFontStyle } from "../../../features/buttons/buttonToggleFont";
import { toggleReadingBar } from "../../../features/buttons/buttonToggleReadingBar";
import { toggleTextMagnifier } from "../../../features/buttons/buttonToggleZoom";
import { createVolumeControlButton } from "../../../features/buttons/buttonVolumeControlButton";
import { toggleDyslexiaFont } from "../../../features/buttons/buttonDyslexiaFont";
import { toggleSelectiveContrast } from "../../../features/buttons/buttonSelectiveContrast";
import { toggleReadingMask } from "../../../features/buttons/buttonReadingMask";
import { toggleSimplifiedText } from "../../../features/buttons/buttonSimplifiedText";
import { initEyeCursorControl } from "../../../features/buttons/buttonEyeCursorControl";
import { toggleFocusFrame } from "../../../features/buttons/buttonFocusFrame";
import { toggleWordByWordReading } from "../../../features/buttons/buttonGuidedReading";
import { setGlobalMediaVolumeToZero } from "../../../features/buttons/buttonToggleGlobalMute";
import { preventAbruptScroll } from "../../../features/buttons/buttonScollControl";
import { toggleLowContrast } from "../../../features/buttons/buttontoggleLowContrast";
import {
  activateAchromatomaly,
  activateAchromatopsia,
  activateDeuteranomaly,
  activateDeuteranopia,
  activateProtanomaly,
  activateProtanopia,
  activateTritanomaly,
  activateTritanopia,
} from "../../../features/buttons/buttondaltonismo";
import { createFuncionalityButton } from "../../utils/createElements";

const buttonsConfig = [
  { id: "outline-mode", title: "Modo de Resaltado", onclick: () => toggleButton("outline-mode", toggleOutlineMode) },
  {
    id: "highlight-Important",
    title: "Resaltar Texto",
    onclick: () => toggleButton("highlight-Important", toggleHighlightImportant),
  },
  { id: "toggle-Zoon", title: "Lupa", onclick: () => toggleButton("toggle-Zoon", toggleTextMagnifier) },
  { id: "test-Size", title: "Aumentar Texto", onclick: () => toggleButton("test-Size", FontsizeChange) },
  { id: "space-Text", title: "Aumentar Espaciado", onclick: () => toggleButton("space-Text", toggleLetterSpacing) },
  {
    id: "highlight-colors",
    title: "Resaltar Colores",
    onclick: () => toggleButton("highlight-colors", toggleHighlightColors),
    countOptions: 3,
    labelOptions: ["Contraste Alto", "Escala de Grises", "Cambio de Tonos"],
  },
  {
    id: "read-text-aloud",
    title: "Leer en voz alta",
    onclick: () => toggleButton("read-text-aloud", toggleReadOnHover),
    countOptions: 3,
    labelOptions: ["Leer normal", "Leer rapido", "Leer lento"],
  },
  {
    id: "highlight-links",
    title: "Resaltar Enlaces",
    onclick: () => toggleButton("highlight-links", highlightLinks),
  },
  {
    id: "toggle-animations",
    title: "Detener Animaciones",
    onclick: () => toggleButton("toggle-animations", toggleAnimations),
  },
  {
    id: "toggle-reading-bar",
    title: "Activar Barra de Lectura",
    onclick: () => toggleButton("toggle-reading-bar", toggleReadingBar),
  },
  { id: "cursor-style", title: "Cursor Grande", onclick: () => toggleButton("cursor-style", toggleLargeCursor) },
  { id: "toggle-font", title: "Fuente Legible", onclick: () => toggleButton("toggle-font", toggleFontStyle) },
  {
    id: "read-read-speed",
    title: "Velocidad de Lectura",
    onclick: () => toggleButton("read-read-speed", toggleReadSpeed),
  },
  {
    id: "create-volume-control",
    title: "Control de Volumen",
    onclick: () => toggleButton("create-volume-control", createVolumeControlButton),
  },
  {
    id: "daltonismo-protanopia",
    title: "Protanopia",
    onclick: () => toggleButton("daltonismo-protanopia", activateProtanopia),
  },
  {
    id: "daltonismo-deuteranopia",
    title: "Deuteranopia",
    onclick: () => toggleButton("daltonismo-deuteranopia", activateDeuteranopia),
  },
  {
    id: "daltonismo-tritanopia",
    title: "Tritanopia",
    onclick: () => toggleButton("daltonismo-tritanopia", activateTritanopia),
  },
  {
    id: "daltonismo-protanomaly",
    title: "Protanomalia",
    onclick: () => toggleButton("daltonismo-protanomaly", activateProtanomaly),
  },
  {
    id: "daltonismo-deuteranomaly",
    title: "Deuteranomalia",
    onclick: () => toggleButton("daltonismo-deuteranomaly", activateDeuteranomaly),
  },
  {
    id: "daltonismo-tritanomaly",
    title: "Tritanomalia",
    onclick: () => toggleButton("daltonismo-tritanomaly", activateTritanomaly),
  },
  {
    id: "daltonismo-achromatomaly",
    title: "Acromatomalia",
    onclick: () => toggleButton("daltonismo-achromatomaly", activateAchromatomaly),
  },
  {
    id: "daltonismo-achromatopsia",
    title: "Acromatopsia",
    onclick: () => toggleButton("daltonismo-achromatopsia", activateAchromatopsia),
  },
  { id: "focus-frame", title: "Marco de Enfoque", onclick: () => toggleButton("focus-frame", toggleFocusFrame) },
  {
    id: "selective-contrast",
    title: "Contraste Selectivo",
    onclick: () => toggleButton("selective-contrast", toggleSelectiveContrast),
  },
  {
    id: "Guided-Reading",
    title: "Lectura Pausada",
    onclick: () => toggleButton("Guided-Reading", toggleWordByWordReading),
  },
  {
    id: "toggle-animationss",
    title: "Modo Concentracion",
    onclick: () => toggleButton("toggle-animationss", toggleSimplifiedText),
  },
  {
    id: "toggle-mute",
    title: "Silenciar Sonido",
    onclick: () => toggleButton("toggle-mute", setGlobalMediaVolumeToZero),
  },
  {
    id: "toggle-Reading-Mask",
    title: "Máscara de Lectura",
    onclick: () => toggleButton("toggle-Reading-Mask", toggleReadingMask),
  },
  {
    id: "toggle-Disléxica",
    title: "Fuente Disléxica",
    onclick: () => toggleButton("toggle-Disléxica", toggleDyslexiaFont),
  },
  {
    id: "control-scroll",
    title: "Control Desplazamiento",
    onclick: () => toggleButton("control-scroll", preventAbruptScroll),
  },
  { id: "low-contrast", title: "Contraste Bajo", onclick: () => toggleButton("low-contrast", toggleLowContrast) },
  { id: "eyes-cursor", title: "Control si Manos", onclick: () => toggleButton("eyes-cursor", initEyeCursorControl) },
];

// const buttonsActive = [];
const toggleButton = (id, onclick) => {
  const item = buttonsConfig.find((button) => button.id === id); // Busca el boton por ID
  const element = document.getElementById(id); // Obtiene el elemento por ID
  let count = item.count ?? 0; // Inicializa el contador
  console.log(item.count);

  if (item?.countOptions && item.countOptions > 1) {
    const text = element.querySelector(".accessibility-funcionality-button-content p");
    const buttonIndex = buttonsConfig.findIndex((button) => button.id === id);
    const checks = element.querySelectorAll(".accessibility-check"); // Obtiene todos los checks dentro del elemento

    if (count >= item.countOptions) {
      if (buttonIndex !== -1) {
        buttonsConfig[buttonIndex].count = 0; // Actualiza el contador en el objeto del botón dentro del array
      }
      text.innerHTML = item.title;
      if (element) {
        element.classList.remove("active"); // Alterna la clase "active"
      }
      checks.forEach((check) => {
        const checkExternal = check.querySelector(".accessibility-check-external"); // Obtiene el check correspondiente
        const checkInternal = check.querySelector(".accessibility-check-internal"); // Obtiene el check correspondiente
        checkExternal.style.background = "color-mix(in srgb, #cacaca 33%, transparent)"; // Muestra el check correspondiente
        checkInternal.style.background = "#cacaca"; // Muestra el check correspondiente
      });
    } else {
      text.innerHTML = item.labelOptions[count]; // Cambia el texto del botón al primer label

      // Establece el check actual al color primario
      const checkExternal = checks[count].querySelector(".accessibility-check-external"); // Obtiene el check correspondiente
      const checkInternal = checks[count].querySelector(".accessibility-check-internal"); // Obtiene el check correspondiente
      checkExternal.style.background = "color-mix(in srgb, var(--primaryColor) 33%, transparent)"; // Muestra el check correspondiente
      checkInternal.style.background = "var(--primaryColor)"; // Muestra el check correspondiente

      // Cambia el check anterior a #cacaca si existe
      if (count > 0) {
        const prevCheckExternal = checks[count - 1].querySelector(".accessibility-check-external"); // Obtiene el check anterior
        const prevCheckInternal = checks[count - 1].querySelector(".accessibility-check-internal"); // Obtiene el check anterior
        prevCheckExternal.style.background = "color-mix(in srgb, #cacaca 33%, transparent)"; // Cambia el color del check anterior
        prevCheckInternal.style.background = "#cacaca"; // Cambia el color del check anterior
      }

      if (element) {
        element.classList.add("active"); // Alterna la clase "active"
      }
      if (buttonIndex !== -1) {
        buttonsConfig[buttonIndex].count = count + 1; // Actualiza el contador en el objeto del botón dentro del array
      }
    }
  } else {
    if (element) {
      element.classList.toggle("active"); // Alterna la clase "active"
      // Muestra u oculta el check de accesibilidad
      const checkElement = element.querySelector(".accessibility-check");
      if (checkElement) {
        checkElement.style.display = checkElement.style.display === "none" ? "flex" : "none";
      }
    }

    // Añade o elimina el ID del array de botones activos
    // const index = buttonsActive.findIndex((profile) => profile.id === id); // Busca el índice del boton en el array
    // if (index !== -1) {
    //   buttonsActive.splice(index, 1); // Si ya existe, lo elimina
    // } else {
    //   buttonsActive.push({ id }); // Si no existe, lo agrega
    // }
  }

  onclick();
};

export const allButtons = (id) => {
  const contentOthersButtons = document.createElement("div");
  contentOthersButtons.id = id;

  buttonsConfig.forEach(({ id, title, onclick, countOptions, labelOptions }) => {
    contentOthersButtons.appendChild(
      createFuncionalityButton({ id, title, icon: "", onclick, countOptions, labelOptions })
    );
  });

  return contentOthersButtons;
};
