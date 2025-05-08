 // components/allButtons/allButtons.js
import { FontsizeChange } from "../../../features/buttons/buttonChangeTextSize";
import { toggleLargeCursor } from "../../../features/buttons/buttonCursorSatyle";
import { 
  // toggleHighlightColors,
  // activateAchromatomaly,
  // activateAchromatopsia,
  // activateDeuteranomaly,
  // activateDeuteranopia,
  // activateProtanomaly,
  // activateProtanopia,
  // activateTritanomaly,
  // activateTritanopia,
} from "../../../features/buttons/buttonhighlightColors";
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

import {
  toggleHighlightColors,
  activateAchromatomaly,
  activateAchromatopsia,
  activateDeuteranomaly,
  activateDeuteranopia,
  activateProtanomaly,
  activateProtanopia,
  activateTritanomaly,
  activatetritanopia,
  activateLowContrast
} from "../../../features/buttons/buttondaltonismo";
import{setupColorSlider} from "../../../features/buttons/buttonColorSlider";
import{startCalibration} from "../../../features/buttons/startCalibration";

import { createFuncionalityButton } from "../../utils/createElements";
import {toggleVirtualKeyboard, } from "../../../features/buttons/buttonActivateKeyBoard";

// Configuración de todos los botones con perfiles asociados
const buttonsConfig = [
  {
    id: "outline-mode",
    title: "Modo de Resaltado",
    onclick: () => toggleButton("outline-mode", toggleOutlineMode),
    profiles: ["accessibility-btn-visual", "accessibility-btn-color-blindness", "Trastornos de Aprendizaje", "Discapacidad Cognitiva","accessibility-btn-dyslexia","accessibility-btn-epilepsy"],
  },
  {
    id: "highlight-Important",
    title: "Resaltar Texto",
    onclick: () => toggleButton("highlight-Important", toggleHighlightImportant),
    profiles: ["accessibility-btn-visual", "Trastornos de Aprendizaje","accessibility-btn-autism"],
  },
  {
    id: "toggle-Zoon",
    title: "Lupa",
    onclick: () => toggleButton("toggle-Zoon", toggleTextMagnifier),
    profiles: ["accessibility-btn-visual"],
  },
  {
    id: "test-Size",
    title: "Aumentar Texto",
    onclick: () => toggleButton("test-Size", FontsizeChange),
    countOptions: 3,
    labelOptions: ["Aumentado 25%", "Aumentado 50%", "Aumentado 75%"],
    profiles: ["accessibility-btn-visual", "Trastornos de Aprendizaje","accessibility-btn-downsyndrom"],
  },
  {
    id: "space-Text",
    title: "Aumentar Espaciado",
    onclick: () => toggleButton("space-Text", toggleLetterSpacing),
    countOptions: 3,
    labelOptions: ["Aumentado 5%", "Aumentado 10%", "Aumentado 15%"],
    profiles: ["Trastornos de Aprendizaje","accessibility-btn-downsyndrom","accessibility-btn-visual"],
  },
  {
    id: "highlight-colors",
    title: "Resaltar Colores",
    onclick: () => toggleButton("highlight-colors", toggleHighlightColors),
    countOptions: 3,
    labelOptions: ["Contraste Alto", "Escala de Grises", "Cambio de Tonos"],
    profiles: ["accessibility-btn-visual"],
  },
  {
    id: "read-text-aloud",
    title: "Leer en voz alta",
    onclick: () => toggleButton("read-text-aloud", toggleReadOnHover),
    countOptions: 3,
    labelOptions: ["Leer normal", "Leer rapido", "Leer lento"],
    profiles: [ "accessibility-btn-total-blindness","Discapacidad Cognitiva", "Trastornos de Aprendizaje","accessibility-btn-dyslexia","accessibility-btn-epilepsy","accessibility-btn-autism"],
  },
  {
    id: "highlight-links",
    title: "Resaltar Enlaces",
    onclick: () => toggleButton("highlight-links", highlightLinks),
    profiles: ["accessibility-btn-visual","accessibility-btn-autism"],
  },
  {
    id: "toggle-animations",
    title: "Detener Animaciones",
    onclick: () => toggleButton("toggle-animations", toggleAnimations),
    profiles: ["Discapacidad Cognitiva","accessibility-btn-asperger","accessibility-btn-downsyndrom","accessibility-btn-dyslexia","accessibility-btn-epilepsy","accessibility-btn-hyperactivity","accessibility-btn-autism"],
  },
  {
    id: "toggle-reading-bar",
    title: "Activar Barra de Lectura",
    onclick: () => toggleButton("toggle-reading-bar", toggleReadingBar),
    profiles: ["Trastornos de Aprendizaje", "accessibility-btn-visual"],
  },
  {
    id: "cursor-style",
    title: "Cursor Grande",
    onclick: () => toggleButton("cursor-style", toggleLargeCursor),
    profiles: ["accessibility-btn-visual", "Motora", "accessibility-btn-downsyndrom"],
  },
  {
    id: "toggle-font",
    title: "Fuente Legible",
    onclick: () => toggleButton("toggle-font", toggleFontStyle),
    profiles: ["Trastornos de Aprendizaje","accessibility-btn-dyslexia","accessibility-btn-epilepsy"],
  },
  {
    id: "read-read-speed",
    title: "Velocidad de Lectura",
    onclick: () => toggleButton("read-read-speed", toggleReadSpeed),
    profiles: [ "accessibility-btn-total-blindness","Discapacidad Cognitiva", "Trastornos de Aprendizaje"],
  },
  {
    id: "create-volume-control",
    title: "Control de Volumen",
    onclick: () => toggleButton("create-volume-control", createVolumeControlButton),
    profiles: ["accessibility-btn-total-blindness"],
  },
  {
    id: "daltonismo-protanopia",
    title: "Protanopia",
    onclick: () => toggleButton("daltonismo-protanopia", activateProtanopia),
    profiles: ["accessibility-btn-color-blindness"],
  },
  {
    id: "daltonismo-deuteranopia",
    title: "Deuteranopia",
    onclick: () => toggleButton("daltonismo-deuteranopia", activateDeuteranopia),
    profiles: ["accessibility-btn-color-blindness"],
  },
  {
    id: "daltonismo-tritanopia",
    title: "Tritanopia",
    onclick: () => toggleButton("daltonismo-tritanopia", activatetritanopia),
    profiles: ["accessibility-btn-color-blindness"],
  },
  {
    id: "daltonismo-protanomaly",
    title: "Protanomalia",
    onclick: () => toggleButton("daltonismo-protanomaly", activateProtanomaly),
    profiles: ["accessibility-btn-color-blindness"],
  },
  {
    id: "daltonismo-deuteranomaly",
    title: "Deuteranomalia",
    onclick: () => toggleButton("daltonismo-deuteranomaly", activateDeuteranomaly),
    profiles: ["accessibility-btn-color-blindness"],
  },
  {
    id: "daltonismo-tritanomaly",
    title: "Tritanomalia",
    onclick: () => toggleButton("daltonismo-tritanomaly", activateTritanomaly),
    profiles: ["accessibility-btn-color-blindness"],
  },
  {
    id: "daltonismo-achromatomaly",
    title: "Acromatomalia",
    onclick: () => toggleButton("daltonismo-achromatomaly", activateAchromatomaly),
    profiles: ["accessibility-btn-color-blindness"],
  },
  {
    id: "daltonismo-achromatopsia",
    title: "Acromatopsia",
    onclick: () => toggleButton("daltonismo-achromatopsia", activateAchromatopsia),
    profiles: ["accessibility-btn-color-blindness"],
  },
  {
    id: "focus-frame",
    title: "Marco de Enfoque",
    onclick: () => toggleButton("focus-frame", toggleFocusFrame),
    profiles: [ "accessibility-btn-color-blindness","Trastornos de Aprendizaje", "Discapacidad Cognitiva"],
  },
  {
    id: "selective-contrast",
    title: "Contraste Selectivo",
    onclick: () => toggleButton("selective-contrast", toggleSelectiveContrast),
    profiles: ["Visión Baja","accessibility-btn-color-blindness"],
  },
  {
    id: "Guided-Reading",
    title: "Lectura Pausada",
    onclick: () => toggleButton("Guided-Reading", toggleWordByWordReading),
    profiles: ["accessibility-btn-asperger", "Discapacidad Cognitiva"],
  },
  {
    id: "toggle-animationss",
    title: "Modo Concentracion",
    onclick: () => toggleButton("toggle-animationss", toggleSimplifiedText),
    profiles: ["Discapacidad Cognitiva","accessibility-btn-asperger","accessibility-btn-dyslexia","accessibility-btn-epilepsy","accessibility-btn-autism"],
  },
  {
    id: "toggle-mute",
    title: "Silenciar Sonido",
    onclick: () => toggleButton("toggle-mute", setGlobalMediaVolumeToZero),
    profiles: ["Sordera", "accessibility-btn-asperger"],
  },
  {
    id: "toggle-Reading-Mask",
    title: "Máscara de Lectura",
    onclick: () => toggleButton("toggle-Reading-Mask", toggleReadingMask),
    profiles: ["Trastornos de Aprendizaje","accessibility-btn-dyslexia","accessibility-btn-epilepsy","accessibility-btn-hyperactivity"],
  },
  {
    id: "toggle-Disléxica",
    title: "Fuente Disléxica",
    onclick: () => toggleButton("toggle-Disléxica", toggleDyslexiaFont),
    profiles: ["accessibility-btn-dyslexia"],
  },
  {
    id: "control-scroll",
    title: "Control Desplazamiento",
    onclick: () => toggleButton("control-scroll", preventAbruptScroll),
    profiles: ["Motora","accessibility-btn-dyslexia","accessibility-btn-dyslexia","accessibility-btn-epilepsy"],
  },
  {
    id: "low-contrast",
    title: "Contraste Bajo",
    onclick: () => toggleButton("low-contrast", activateLowContrast),
    profiles: ["accessibility-btn-visual","accessibility-btn-dyslexia","accessibility-btn-epilepsy","accessibility-btn-autism"],
  },
  {
    id: "eyes-cursor",
    title: "Control si Manos",
    onclick: () => toggleButton("eyes-cursor", startCalibration ),
    
    profiles: ["accessibility-btn-physical"],
  },
  {
    id:"sig-lenguaje",
    title:"Traductor de Lengua de Señas", 
    onclick: () => toggleButton("sig-lenguaje"),
    profiles: ["accessibility-btn-sorta"],

  },
  {
    id:"virtual-keyboard",
    title:"Teclado En Pantalla",
    onclick: () => toggleButton("virtual-keyboard",toggleVirtualKeyboard),
    profiles: ["accessibility-btn-physical"],
  },
  {
    id:"color-slider",
    title:"Cambiar Color Texto",
    onclick: () => toggleButton("color-slider",setupColorSlider),
    profiles: ["accessibility-btn-visual"],
    slider: true, // Indica que este botón es un slider
  }
];

// Removed inv}alid JSX usage of <Slider> as it was outside a React component or render method.

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

export const allButtons = (id, profiles = []) => {
  const container = document.createElement("div");
  container.id = id;

  const uniqueIds = new Set();

  const filteredButtons = buttonsConfig.filter((btn) => {
    return profiles.length === 0
      ? true
      : btn.profiles?.some((p) => profiles.includes(p));
  }).filter((btn) => {
    if (!uniqueIds.has(btn.id)) {
      uniqueIds.add(btn.id);
      return true;
    }
    return false;
  });

  console.log("Botones filtrados:", filteredButtons);

  filteredButtons.forEach(({ id, title, onclick, countOptions, labelOptions }) => {
    container.appendChild(
      createFuncionalityButton({ id, title, icon: "", onclick, countOptions, labelOptions })
    );
  });

  return container;
};

