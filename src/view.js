import { FontsizeChange } from "./features/buttons/buttonChangeTextSize.js";
import { toggleLargeCursor } from "./features/buttons/buttonCursorSatyle.js";
import { initDaltonismControl } from "./features/buttons/buttondaltonismo.js";
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
import "./shared/styles/views.css";
import { initEyeCursorControl } from "./features/buttons/buttonEyeCursorControl.js";

export function initialView() {
  const bannerUser = createBannerUser();

  const showVistualButton = createButtonCard({
    id: "show-Visual",
    view: "view-categories",
    text: "Visual",
    icon: `${host}/src/shared/assets/icons/iconsInitbuttonBlue/4-glasses.svg`,
  });

  const showPsicosocialButton = createButtonCard({
    id: "show-Mental",
    view: "view-categories1",
    text: "Psicosocial o Mental",
    icon: `${host}/src/shared/assets/icons/iconsInitbuttonBlue/5-peoples.svg`,
  });

  const showAuditivaButton = createButtonCard({
    id: "show-Auditiva",
    view: "view-categories2",
    text: "Auditiva",
    icon: `${host}/src/shared/assets/icons/iconsInitbuttonBlue/6-hands.svg`,
  });

  const showFisicaButton = createButtonCard({
    id: "show-Motora",
    view: "view-categories3",
    text: "Fisica o Motriz",
    icon: `${host}/src/shared/assets/icons/iconsInitbuttonBlue/3-arm.svg`,
  });

  const showCognitivaButton = createButtonCard({
    id: "show-Cognitiva",
    view: "view-categories4",
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

export function createCategoriesView() {
  const categoriesView = document.createElement("div");
  categoriesView.id = "view-categories";
  categoriesView.classList.add("accessibility-view", "hidden");
  categoriesView.setAttribute("aria-hidden", "true");
  categoriesView.appendChild(createButton("back-to-menu", "⬅ Volver", () => switchView("view-initial")));
  categoriesView.appendChild(createResetButton());
  categoriesView.append(
    createButton("btn-visual", "Baja Visión", () => switchView("view-visual")),
    createButton("btn-total-blindness", "Ceguera Total", () => switchView("view-total-blindness")),
    createButton("btn-color-blindness", "Daltonismo", () => switchView("view-color-blindness")),
    createButton("btn-color-perception", "Percepción del Color", () => switchView("view-color-perception"))
  );
  return categoriesView;
}

export function createCategoriesView1() {
  const categoriesView1 = document.createElement("div");
  categoriesView1.id = "view-categories1";
  categoriesView1.classList.add("accessibility-view", "hidden");
  categoriesView1.setAttribute("aria-hidden", "true");
  categoriesView1.appendChild(createButton("back-to-menu", "⬅ Volver", () => switchView("view-initial")));
  categoriesView1.appendChild(createResetButton());
  categoriesView1.append(
    createButton("btn-asperger", "Trastorno del Asperger Aprendizaje", () => switchView("view-asperger")),
    createButton("btn-s-down", "Sindrome De Down", () => switchView("view-s-down")),
    createButton("btn-hiperactividad", "Trastorno de Déficit de Atención e Hiperactividad", () =>
      switchView("view-hiperactividad")
    )
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
    createButton("btn-extremidades", "limitaciones en las extremidades", () => switchView("view-extremidades"))
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

// Crear vistas para cada categoría con los botones correspondientes
const views = {
  "view-visual": createCategoryView(
    "Visual",
    [
      createButton("highlight-Important", "Resaltar Texto", toggleHighlightImportant),
      createButton("toggle-Zoon", "Zoom", toggleTextMagnifier),
      createButton("test-Size", "Aumentar Texto", FontsizeChange),
      createButton("space-Text", "Aumentar Espaciado", toggleLetterSpacing),
      createButton("highlight-colors", "Resaltar Colores", toggleHighlightColors),
      createButton("read-text-aloud", "Leer en voz alta", toggleReadOnHover),
      createButton("highlight-links", "Resaltar Enlaces", highlightLinks),
      createButton("toggle-animations", "Detener Animaciones", toggleAnimations),
      createButton("toggle-reading-bar", "Activar Barra de Lectura", toggleReadingBar),
      createButton("cursor-style", "Cursor Grande", toggleLargeCursor, true),
      createButton("toggle-font", "Cambiar Fuente", toggleFontStyle),
      createButton("eye-cursor", "Cursor Ocular", initEyeCursorControl),
    ],
    "view-categories"
  ),

  "view-total-blindness": createCategoryView("total-blindness", [], "view-categories"),

  "view-color-blindness": createCategoryView(
    "color-blindness",
    // [createButton("daltonismo-protanopia", "", initDaltonismControl)],
    "view-categories"
  ),

  "view-color-perception": createCategoryView("color-perception", [], "view-categories"),
};

// Vistas adicionales de categorías relacionadas con la cognición o neurología
const views1 = {
  "view-asperger": createCategoryView("Asperger", [], "view-categories1"),
  "view-s-down": createCategoryView("s-down", [], "view-categories1"),
  "view-hiperactividad": createCategoryView("hiperactividad", [], "view-categories1"),
  "view-color-perception": createCategoryView("color-perception", [], "view-categories1"),
};

const views2 = {
  "view-sordera": createCategoryView("sordera", [], "view-categories2"),
};

const views3 = {
  "view-extremidades": createCategoryView("extremidades", [], "view-categories3"),
};

const views4 = {
  "view-autismo": createCategoryView("autismo", [], "view-categories4"),
  "view-tco": createCategoryView("tco", [], "view-categories4"),
};

const views5 = {
  "view-comunicacion": createCategoryView("comunicacion", [], "view-categories5"),
  "view-tco": createCategoryView("tco", [], "view-categories5"),
};

export function renderFullLayout() {
  return fullLayout([
    initialView(),
    createCategoriesView(),
    createCategoriesView1(),
    createCategoriesView2(),
    createCategoriesView3(),
    createCategoriesView4(),
    ...Object.values(views),
    ...Object.values(views1),
    ...Object.values(views2),
    ...Object.values(views3),
    ...Object.values(views4),
    ...Object.values(views5),
  ]);
}
