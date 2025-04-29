
import { FontsizeChange } from "./features/buttons/buttonChangeTextSize.js";
import { toggleLargeCursor } from "./features/buttons/buttonCursorSatyle.js";
import {
  activateAchromatomaly,
  activateAchromatopsia,
  activateDeuteranomaly,
  activateDeuteranopia,
  activateProtanomaly,
  activateProtanopia,
  activateTritanomaly,
  activateTritanopia,
} from "./features/buttons/buttondaltonismo.js";
import { toggleHighlightColors } from "./features/buttons/buttonhighlightColors.js";
import { toggleHighlightImportant } from "./features/buttons/buttonhighlightimportant.js";
import { highlightLinks } from "./features/buttons/buttonhighlightLinks.js";
import { toggleLetterSpacing } from "./features/buttons/buttonLetterSpacing.js";
import { toggleAnimations } from "./features/buttons/buttonNoneAnimation.js";
import { toggleReadOnHover } from "./features/buttons/buttonreadPageAloud.js";
import { toggleFontStyle } from "./features/buttons/buttonToggleFont.js";
import { toggleReadingBar } from "./features/buttons/buttonToggleReadingBar.js";
import { toggleTextMagnifier } from "./features/buttons/buttonToggleZoom.js";
import { host } from "./shared/constants/enviroments.js";
import { fullLayout } from "./shared/layout/FullLayout.js";
import { createBannerUser, createButtonCard } from "./shared/utils/createElements.js";
import { createButton, createCategoryView } from "./widget.js";
import { switchView } from "./widget.js";
import { createResetButton } from "./widget.js";
import { toggleOutlineMode } from "./features/buttons/buttonOutlineMode.js";
import { toggleSelectiveContrast } from "./features/buttons/buttonSelectiveContrast.js";
import { toggleReadingMask } from "./features/buttons/buttonReadingMask.js";
import { toggleSimplifiedText } from "./features/buttons/buttonSimplifiedText.js";
import { preventAbruptScroll } from "./features/buttons/buttonScollControl.js";
import { toggleLowContrast } from "./features/buttons/buttontoggleLowContrast.js";
import { toggleWordByWordReading } from "./features/buttons/buttonGuidedReading.js";
import { setGlobalMediaVolumeToZero } from "./features/buttons/buttonToggleGlobalMute.js";
import { initEyeCursorControl } from "./features/buttons/buttonEyeCursorControl.js";
import { toggleReadSpeed } from "./features/buttons/buttonReadingSpeed.js";
import { toggleFocusFrame } from "./features/buttons/buttonFocusFrame.js";
import { toggleDyslexiaFont } from "./features/buttons/buttonDyslexiaFont.js";
import { createVolumeControlButton } from "./features/buttons/buttonVolumeControlButton.js";
import { visualView } from "./shared/views/visualView.js";
import { mentalView } from "./shared/views/mentalView.js";
import { auditoryView } from "./shared/views/auditoryView.js";
import {physicalView } from "./shared/views/physicalView.js";
import {cognitiveView} from "./shared/views/cognitiveView.js"

export function initialView() {
  const bannerUser = createBannerUser();

  const showVistualButton = createButtonCard({
    id: "show-Visual",
    view: "accessibility-visual-view",
    text: "Visual",
    icon: `${host}/src/shared/assets/icons/iconsInitbuttonBlue/4-glasses.svg`,
  });

  const showPsicosocialButton = createButtonCard({
    id: "show-Mental",
    view: "accessibility-mental-view",
    text: "Psicosocial o Mental",
    icon: `${host}/src/shared/assets/icons/iconsInitbuttonBlue/5-peoples.svg`,
  });

  const showAuditivaButton = createButtonCard({
    id: "show-Auditiva",
    view: "accessibility-auditory-view",
    text: "Auditiva",
    icon: `${host}/src/shared/assets/icons/iconsInitbuttonBlue/6-hands.svg`,
  });

  const showFisicaButton = createButtonCard({
    id: "show-Motora",
    view: "accessibility-physical-view",
    text: "Fisica o Motriz",
    icon: `${host}/src/shared/assets/icons/iconsInitbuttonBlue/3-arm.svg`,
  });

  const showCognitivaButton = createButtonCard({
    id: "show-Cognitiva",
    view: "accessibility-cognitive-view",
    text: "Cognitiva",
    icon: `${host}/src/shared/assets/icons/iconsInitbuttonBlue/2-brain.svg`,
  });

  const showCustomButton = createButtonCard({
    id: "show-custom",
    view: "view-custom",
    text: "Personalizado",
    icon: `${host}/src/shared/assets/icons/iconsInitbuttonBlue/1-people.svg`,
  });

  // const showComunicaciónButton = createButtonCard("show-Comunicación", "", () => {
  //   switchView("view-categories4");
  // });

  const initialView = document.createElement("div");
  initialView.id = "view-initial";
  initialView.classList.add("accessibility-view");
  initialView.classList.add("accessibility-custom-scroll");

  // Agregamos los botones
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("accessibility-view-buttons-container");
  buttonsContainer.appendChild(showVistualButton);
  buttonsContainer.appendChild(showPsicosocialButton);
  buttonsContainer.appendChild(showAuditivaButton);
  buttonsContainer.appendChild(showFisicaButton);
  buttonsContainer.appendChild(showCognitivaButton);
  buttonsContainer.appendChild(showCustomButton);

  // Agregamos el banner de usuario y los botones a la vista inicial
  initialView.appendChild(bannerUser);
  initialView.appendChild(buttonsContainer);

  return initialView;
}

//******************************************************/
// Crear botones para mostrar las vistas de categorías
//******************************************************/



export function createCategoriesView1() {
  const categoriesView1 = document.createElement("div");
  categoriesView1.id = "view-categories1";
  categoriesView1.classList.add("accessibility-view", "hidden");
  categoriesView1.setAttribute("aria-hidden", "true");
  categoriesView1.appendChild(createButton("back-to-menu", "⬅ Volver", () => switchView("view-initial")));
  categoriesView1.appendChild(createResetButton());
  categoriesView1.append(
    createButton("btn-asperger", "Asperger", () => switchView("view-asperger")),
    createButton("btn-downsyndrome", "Sindrome De Down", () => switchView("view-downsyndrome")),
    createButton("btn-hyperactivity", "Hiperactividad", () => switchView("view-hyperactivity")),
    createButton("btn-dyslexia", "Dislexia", () => switchView("view-dyslexia")),
    createButton("btn-epilepsy ", "Epilepsia", () => switchView("view-epilepsy "))
  );
  return categoriesView1;
}

export function createCategoriesView2() {
  const categoriesView2 = document.createElement("div");
  categoriesView2.id = "view-categories2";
  categoriesView2.classList.add("accessibility-view", "hidden");
  categoriesView2.setAttribute("aria-hidden", "true");
  categoriesView2.appendChild(createButton("back-to-menu", "⬅ Volver", () => switchView("view-initial")));
  categoriesView2.appendChild(createResetButton());
  categoriesView2.append(createButton("btn-sordera", "Sordera", () => switchView("view-sordera")));
  return categoriesView2;
}

export function createCategoriesView3() {
  const categoriesView3 = document.createElement("div");
  categoriesView3.id = "view-categories3";
  categoriesView3.classList.add("accessibility-view", "hidden");
  categoriesView3.setAttribute("aria-hidden", "true");
  categoriesView3.appendChild(createButton("back-to-menu", "⬅ Volver", () => switchView("view-initial")));
  categoriesView3.appendChild(createResetButton());
  categoriesView3.append(
    createButton("btn-extremidades", "Limitaciones en las Extremidades", () => switchView("view-extremidades"))
  );
  return categoriesView3;
}

export function createCategoriesView4() {
  const categoriesView4 = document.createElement("div");
  categoriesView4.id = "view-categories4";
  categoriesView4.classList.add("accessibility-view", "hidden");
  categoriesView4.setAttribute("aria-hidden", "true");
  categoriesView4.appendChild(createButton("back-to-menu", "⬅ Volver", () => switchView("view-initial")));
  categoriesView4.appendChild(createResetButton());
  categoriesView4.append(
    createButton("btn-autismo", "Autismo", () => switchView("view-autismo")),
    createButton("btn-tco", "TOC Trastorno Obsesivo Compulsivo", () => switchView("view-tco"))
  );
  return categoriesView4;
}

export function createCategoriesView5() {
  const categoriesView5 = document.createElement("div");
  categoriesView5.id = "view-categories4";
  categoriesView5.classList.add("accessibility-view", "hidden");
  categoriesView5.setAttribute("aria-hidden", "true");
  categoriesView5.appendChild(createButton("back-to-menu", "⬅ Volver", () => switchView("view-initial")));
  categoriesView5.appendChild(createResetButton());
  categoriesView5.append(
    createButton("btn-autismo", "Autismo", () => switchView("view-autismo")),
    createButton("btn-tco", "TOC Trastorno Obsesivo Compulsivo", () => switchView("view-tco"))
  );
  return categoriesView5;
}

//********************************************************************/
// Crear vistas para cada categoría con los botones correspondientes  /
//********************************************************************/

// Vista de botones para trastornos visuales//

// const views = {
//   "view-visual": createCategoryView(
//     "visual",
//     [
//       createButton("outline-mode", "Modo de Resaltado", toggleOutlineMode),
//       createButton("highlight-Important", "Resaltar Texto", toggleHighlightImportant),
//       createButton("toggle-Zoon", "Lupa", toggleTextMagnifier),
//       createButton("test-Size", "Aumentar Texto", FontsizeChange),
//       createButton("space-Text", "Aumentar Espaciado", toggleLetterSpacing),
//       createButton("highlight-colors", "Resaltar Colores", toggleHighlightColors),
//       createButton("read-text-aloud", "Leer en voz alta", toggleReadOnHover),
//       createButton("highlight-links", "Resaltar Enlaces", highlightLinks),
//       createButton("toggle-animations", "Detener Animaciones", toggleAnimations),
//       createButton("toggle-reading-bar", "Activar Barra de Lectura", toggleReadingBar),
//       createButton("cursor-style", "Cursor Grande", toggleLargeCursor),
//       createButton("toggle-font", "Fuente Legible", toggleFontStyle),
//     ],
//     "accessibility-visual-view"
//   ),

//   // Vista de botones para ceguera total//

//   "view-total-blindness": createCategoryView(
//     "total-blindness",
//     [
//       createButton("read-read-speed", "Velocidad de Lectura", toggleReadSpeed),
//       createButton("create-volume-control", "Control de Volumen", createVolumeControlButton),
//       createButton("read-text-aloud", "Leer en voz alta", toggleReadOnHover),
//     ],
//     "accessibility-visual-view"
//   ),

//   // Vista de botones para daltonismo//

//   "view-color-blindness": createCategoryView(
//     "color-blindness",
//     [
//       createButton("daltonismo-protanopia", "Protanopia", activateProtanopia),
//       createButton("daltonismo-deuteranopia", "Deuteranopia", activateDeuteranopia),
//       createButton("daltonismo-tritanopia", "Tritanopia", activateTritanopia),
//       createButton("daltonismo-protanomaly", "Protanomalia", activateProtanomaly),
//       createButton("daltonismo-deuteranomaly", "Deuteranomalia", activateDeuteranomaly),
//       createButton("daltonismo-tritanomaly", "Tritanomalia", activateTritanomaly),
//       createButton("daltonismo-achromatomaly", "Acromatomalia", activateAchromatomaly),
//       createButton("daltonismo-achromatopsia", "Acromatopsia", activateAchromatopsia),
//       createButton("focus-frame", "Marco de Enfoque", toggleFocusFrame),
//       createButton("outline-mode", "Modo de Resaltado", toggleOutlineMode),
//       createButton("selective-contrast", "Contraste Selectivo", toggleSelectiveContrast),
//     ],
//     "accessibility-visual-view"
//   ),
// };

// //********************************************************************************/
// // Vistas adicionales de categorías relacionadas con la cognición o neurología  */
// //*******************************************************************************/

// // vista de botones Asperger //

// const views1 = {
//   "view-asperger": createCategoryView(
//     "asperger",
//     [
//       createButton("Guided-Reading", "Lectura Pausada", toggleWordByWordReading),
//       createButton("toggle-animationss", "Modo Concentracion", toggleSimplifiedText),
//       createButton("toggle-animations", "Detener Animaciones", toggleAnimations),
//       createButton("toggle-mute", "Silenciar Sonido", setGlobalMediaVolumeToZero),
//     ],
//     "view-categories1"
//   ),

//   // vista de botones Sindrome de Dawn //

//   "view-downsyndrome": createCategoryView(
//     "downsyndrome",
//     [
//       createButton("cursor-style", "Cursor Grande", toggleLargeCursor),
//       createButton("test-Size", "Aumentar Texto", FontsizeChange),
//       createButton("space-Text", "Aumentar Espaciado", toggleLetterSpacing),
//       createButton("toggle-animations", "Detener Animaciones", toggleAnimations),
//       createButton("read-text-aloud", "Leer en voz alta", toggleReadOnHover),
//     ],
//     "view-categories1"
//   ),

//   // vista de botones Dislexia //

//   "view-dyslexia": createCategoryView(
//     "dyslexia",
//     [
//       createButton("toggle-Reading-Mask", "Máscara de Lectura", toggleReadingMask),
//       createButton("toggle-Disléxica", "Fuente Disléxica", toggleDyslexiaFont),
//       createButton("space-Text", "Aumentar Espaciado", toggleLetterSpacing),
//       createButton("test-Size", "Aumentar Texto", FontsizeChange),
//       createButton("read-text-aloud", "Leer en voz alta", toggleReadOnHover),
//       createButton("toggle-animations", "Detener Animaciones", toggleAnimations),
//     ],
//     "view-categories1"
//   ),

//   // vista de botones Epilepsia //

//   "view-epilepsy ": createCategoryView(
//     "epilepsy ",
//     [
//       createButton("toggle-Reading-Mask", "Máscara de Lectura", toggleReadingMask),
//       createButton("toggle-animations", "Detener Animaciones", toggleAnimations),
//       createButton("toggle-animationss", "Modo Concentracion", toggleSimplifiedText),
//       createButton("toggle-font", "Fuente Legible", toggleFontStyle),
//       createButton("outline-mode", "Modo de Resaltado", toggleOutlineMode),
//       createButton("read-text-aloud", "Leer en voz alta", toggleReadOnHover),
//       createButton("control-scroll", "Control Desplazamiento", preventAbruptScroll),
//       createButton("low-contrast", "Contraste Bajo", toggleLowContrast),
//     ],
//     "view-categories1"
//   ),

//   // vista de botones Hiperactividad //

//   "view-hyperactivity": createCategoryView(
//     "hyperActivity",
//     [
//       createButton("toggle-Reading-Mask", "Máscara de Lectura", toggleReadingMask),
//       createButton("toggle-animations", "Detener Animaciones", toggleAnimations),
//       createButton("eyes-cursor", "Control si Manos", initEyeCursorControl),
//     ],
//     "view-categories1"
//   ),
// };

// const views2 = {
//   "view-sordera": createCategoryView(
//     "sordera",
//      [
//        createButton("sign-language", "Traductor de Lengua de Señas", ""),
//      ],
//       "view-categories2"),
// };

const views3 = {
  "view-extremidades": createCategoryView(
    "extremidades",
     [
      createButton("", "Visor Ocular", ""),
     ], 
    "view-categories3"),
};

const views4 = {
  "view-autismo": createCategoryView(
    "autismo", 
    [
      createButton("toggle-Reading-Mask", "Máscara de Lectura", toggleReadingMask),
      createButton("toggle-animations", "Detener Animaciones", toggleAnimations),
      createButton("toggle-animationss", "Modo Concentracion", toggleSimplifiedText),
      createButton("toggle-font", "Fuente Legible", toggleFontStyle),
      createButton("outline-mode", "Modo de Resaltado", toggleOutlineMode),
      createButton("read-text-aloud", "Leer en voz alta", toggleReadOnHover),
      createButton("control-scroll", "Control Desplazamiento", preventAbruptScroll),
      createButton("low-contrast", "Contraste Bajo", toggleLowContrast),
    ], 
    "view-categories4"),
  "view-tco": createCategoryView(
    "tco", 
    [
      createButton("", 'Notificaciones Controladas')
    ], 
    "view-categories4"),
};

const views5 = {
  "view-comunicacion": createCategoryView("comunicacion", [], "view-categories5"),
  "view-tco": createCategoryView("tco", [], "view-categories5"),
};

export function renderFullLayout() {
  return fullLayout([
    initialView(),
    visualView(),
    mentalView(),
    auditoryView(),
    physicalView(),
    cognitiveView(),
    // ...Object.values(views),
    // ...Object.values(views1),
    // ...Object.values(views2),
    ...Object.values(views3),
    ...Object.values(views4),
    ...Object.values(views5),
  ]);
}
