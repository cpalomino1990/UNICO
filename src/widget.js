// Importación de los estilos y funciones necesarios para el widget.
import "./shared/styles/widget.css";
import { toggleFontStyle } from "./features/buttons/buttonToggleFont";
import { toggleReadingBar } from "./features/buttons/buttonToggleReadingBar";
import { highlightLinks } from "./features/buttons/buttonhighlightLinks";
import { toggleHighlightColors } from "./features/buttons/buttonhighlightColors";
import { toggleAnimations } from "./features/buttons/buttonNoneAnimation";
import { FontsizeChange } from "./features/buttons/buttonChangeTextSize";
import { toggleReadOnHover } from "./features/buttons/buttonreadPageAloud";
import { animationInitButton } from "./shared/utils/animationInitButton";
import { toggleLetterSpacing } from "./features/buttons/buttonLetterSpacing";
import { toggleTextMagnifier } from "./features/buttons/buttonToggleZoom";
import { toggleHighlightImportant } from "./features/buttons/buttonhighlightimportant";
import { toggleLargeCursor } from "./features/buttons/buttonCursorSatyle";

// Función para mostrar u ocultar el menú de accesibilidad
function toggleMenu() {
  const menu = document.getElementById("accessibility-menu");  // Obtener el menú de accesibilidad
  menu.classList.toggle("hidden");  // Alternar la clase 'hidden' para mostrar/ocultar el menú
  menu.setAttribute("aria-hidden", menu.classList.contains("hidden"));  // Cambiar el atributo ARIA para la accesibilidad
}

// Función para cambiar entre las vistas (Visual, Auditiva, etc.)
function switchView(viewId) {
  // Ocultar todas las vistas (excepto la vista activa)
  document.querySelectorAll(".accessibility-view, .accessibility-view1 ,.main-menu").forEach((element) => {
    element.classList.add("hidden");  // Agregar la clase 'hidden' para ocultar
    element.setAttribute("aria-hidden", "true");  // Cambiar el atributo ARIA para accesibilidad
  });

  const activeView = document.getElementById(viewId);  // Obtener la vista que se quiere mostrar
  if (activeView) {
    activeView.classList.remove("hidden");  // Quitar la clase 'hidden' para mostrar la vista
    activeView.setAttribute("aria-hidden", "false");  // Cambiar el atributo ARIA para accesibilidad
  }
}

// Función para crear un botón con un id, texto y función asociada
function createButton(id, text, onClick, isActivateable = false) {
  const button = document.createElement("button");  // Crear un nuevo botón
  button.id = id;  // Asignar el id del botón
  button.textContent = text;  // Asignar el texto del botón
  button.classList.add("toggle-button");  // Agregar la clase CSS del botón

  // Evento de clic para manejar el comportamiento del botón
  button.addEventListener("click", function () {
    if (id === "close-menu" || id === "back-to-menu") {
      onClick();  // Ejecutar la función asociada al botón si es "Cerrar" o "Volver"
      return;
    }

    // Si el botón es activable, alternar la clase 'active'
    if (isActivateable) {
      this.classList.toggle("active");  // Alternar la clase 'active' para marcar el estado del botón
      updateCategoryButtons();  // Actualizar los botones de la categoría
    }
    onClick();  // Ejecutar la función asociada al botón
  });

  return button;  // Devolver el botón creado
}

// Función para actualizar los botones de categorías (Visual, Auditiva, etc.)
function updateCategoryButtons() {
  // Definición de categorías y botones asociados
  const categories = {
    "btn-visual": [
      "highlight-Important", "highlight-colors", "space-Text", "highlight-links", "toggle-animations", 
      "toggle-reading-bar", "read-text-aloud", "test-Size", "toggle-Zoon", "cursor-style", "toggle-font"
    ],  
  };

  // Iterar sobre cada categoría para actualizar los botones dentro de ella
  Object.entries(categories).forEach(([categoryButtonId, buttonIds]) => {
    const categoryButton = document.getElementById(categoryButtonId);  // Obtener el botón de la categoría
    const hasActiveButton = buttonIds.some((id) => document.getElementById(id)?.classList.contains("active"));  // Comprobar si algún botón de la categoría está activo

    // Si algún botón está activo, agregar la clase 'active' a la categoría
    if (hasActiveButton) {
      categoryButton.classList.add("active");
    } else {
      categoryButton.classList.remove("active");  // Si no hay botones activos, remover la clase 'active'
    }
  });
}

// Función para crear el botón de reinicio
function createResetButton() {
  return createButton("reset-all", "🔄 Restablecer", () => {
    // Esta función puede estar vacía o añadir lógica para reiniciar los botones
  });
}

// Función para crear la vista de una categoría
function createCategoryView(categoryName, buttons, returnToView) {
  const div = document.createElement("div");  // Crear un contenedor div para la vista de la categoría
  div.id = `view-${categoryName.toLowerCase()}`;  // Asignar un id único a la vista de la categoría
  div.classList.add("accessibility-view", "hidden");  // Agregar clases para ocultar la vista inicialmente
  div.setAttribute("aria-hidden", "true");  // Asegurar la accesibilidad

  // Crear un botón de "Volver" para regresar a la vista anterior
  const backButton = createButton("back-to-menu", "⬅ Volver", () => switchView(returnToView));

  div.appendChild(backButton);  // Añadir el botón de "Volver" a la vista
  div.appendChild(createResetButton());  // Añadir el botón de "Restablecer" a la vista
  buttons.forEach(button => div.appendChild(button));  // Añadir los botones de la categoría a la vista
  
  return div;  // Devolver la vista creada
}

// Crear vistas para cada categoría con los botones correspondientes
const views = {
  "view-visual": createCategoryView("Visual", [
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
  ], "view-categories"),

  "view-total-blindness": createCategoryView("total-blindness", [], "view-categories"),
  "view-color-blindness": createCategoryView("color-blindness", [], "view-categories"),
  "view-color-perception": createCategoryView("color-perception", [], "view-categories")
};

// Vistas adicionales de categorías relacionadas con la cognición o neurología
const views1 = {
  "view-asperger": createCategoryView("Asperger", [], "view-categories1"),
  "view-s-down": createCategoryView("s-down", [], "view-categories1"),
  "view-hiperactividad": createCategoryView("hiperactividad", [], "view-categories1"),
  "view-color-perception": createCategoryView("color-perception", [], "view-categories1")
};

const views2 = {
  "view-sordera": createCategoryView("sordera", [], "view-categories2"),  
}

const views3 = {  
  "view-extremidades": createCategoryView("extremidades", [], "view-categories3"),
}
const views4 = {
  "view-autismo": createCategoryView("autismo", [], "view-categories4"),
  "view-tco": createCategoryView("tco", [], "view-categories4"),
}
const views5 = {  
  "view-comunicacion": createCategoryView("comunicacion", [], "view-categories5"),
  "view-tco": createCategoryView("tco", [], "view-categories5"),
}

// Función para inicializar el widget de accesibilidad
async function initWidget(accountId) {
  const widgetContainer = document.createElement("div");  // Crear el contenedor del widget
  widgetContainer.id = "my-widget";  // Asignar un id único al contenedor del widget
  widgetContainer.className = "widget-container";  // Asignar una clase para el estilo del widget

  const accessibilityButton = createButton("accessibility-button", "", toggleMenu);  // Crear el botón de accesibilidad
  animationInitButton();  // Inicializar la animación del botón

  const accessibilityMenu = document.createElement("div");  // Crear el menú de accesibilidad
  accessibilityMenu.id = "accessibility-menu";  // Asignar un id al menú
  accessibilityMenu.classList.add("hidden");  // Ocultar el menú inicialmente
  accessibilityMenu.setAttribute("role", "dialog");  // Establecer el rol ARIA del menú

  const closeButton = createButton("close-menu", "❌ Cerrar", toggleMenu);  // Crear el botón de "Cerrar"
  accessibilityMenu.appendChild(closeButton);  // Añadir el botón de "Cerrar" al menú

  const mainMenu = document.createElement("div");  // Crear el contenedor del menú principal
  mainMenu.id = "main-menu";  // Asignar un id único al menú principal
  mainMenu.classList.add("main-menu");  // Asignar la clase para el estilo del menú principal
  mainMenu.setAttribute("aria-hidden", "false");  // Cambiar el atributo ARIA para accesibilidad//



  //******************************************************/
  // Crear botones para mostrar las vistas de categorías
  //******************************************************/


  const showVistualButton = createButton("show-Vistual", "CAPASIDA DIVERSA VISUAL", () => {
    switchView("view-categories");
  });

  const showPsicosocialButton = createButton("show-Mental", "CAPASIDA DIVERSA PSICOLOGICA O MENTAL", () => {
    switchView("view-categories1");
  });


  const showAuditivaButton = createButton("show-Auditiva", "CAPASIDA DIVERSA AUDITIVA", () => {
    switchView("view-categories2");
  });

  
  const showFisicaButton = createButton("show-Motora", "CAPASIDA DIVERSA FISICA O MOTORA", () => {
    switchView("view-categories3");
  });

  const showCognitivaButton = createButton("show-Cognitiva", "CAPASIDA DIVERSA COGNITIVA O INTELECTUAL", () => {
    switchView("view-categories4");
  });

  const showComunicaciónButton = createButton("show-Comunicación", "CAPASIDA DIVERSAdel LENGUAJE Y COMUNICACION", () => {
    switchView("view-categories4");
  });



  // Vista inicial con botones para elegir la categoría
  const initialView = document.createElement("div");
  initialView.id = "view-initial";
  initialView.classList.add("accessibility-view");
  initialView.appendChild(showVistualButton);
  initialView.appendChild(showPsicosocialButton);
  initialView.appendChild(showAuditivaButton);
  initialView.appendChild(showFisicaButton);
  initialView.appendChild(showCognitivaButton);
  initialView.appendChild(showComunicaciónButton);

  // Vista de categorías (Visual, Ceguera, Daltonismo, etc.)
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

  // Vista de categorías para trastornos cognitivos o neurológicos
  const categoriesView1 = document.createElement("div");
  categoriesView1.id = "view-categories1";
  categoriesView1.classList.add("accessibility-view", "hidden");
  categoriesView1.setAttribute("aria-hidden", "true");
  categoriesView1.appendChild(createButton("back-to-menu", "⬅ Volver", () => switchView("view-initial")));
  categoriesView1.appendChild(createResetButton());
  categoriesView1.append(
    createButton("btn-asperger", "Trastorno del Asperger Aprendizaje", () => switchView("view-asperger")),
    createButton("btn-s-down", "Sindrome De Down", () => switchView("view-s-down")),
    createButton("btn-hiperactividad", "Trastorno de Déficit de Atención e Hiperactividad", () => switchView("view-hiperactividad")),
   
  );

  // Vista de categorías para trastornos auditivos
  const categoriesView2 = document.createElement("div");
  categoriesView2.id = "view-categories2";
  categoriesView2.classList.add("accessibility-view", "hidden");
  categoriesView2.setAttribute("aria-hidden", "true");
  categoriesView2.appendChild(createButton("back-to-menu", "⬅ Volver", () => switchView("view-initial")));
  categoriesView2.appendChild(createResetButton());
  categoriesView2.append(
    createButton("btn-sordera", "Sordera", () => switchView("view-sordera")),
  
  );

    // Vista de categorías para discapacidades físicas o motoras
    const categoriesView3 = document.createElement("div");
    categoriesView3.id = "view-categories3";
    categoriesView3.classList.add("accessibility-view", "hidden");
    categoriesView3.setAttribute("aria-hidden", "true");
    categoriesView3.appendChild(createButton("back-to-menu", "⬅ Volver", () => switchView("view-initial")));
    categoriesView3.appendChild(createResetButton());
    categoriesView3.append(
      createButton("btn-extremidades", "limitaciones en las extremidades", () => switchView("view-extremidades")),
    
    );

    // Vista de categorías para discapacidades físicas o motoras
    const categoriesView4 = document.createElement("div");
    categoriesView4.id = "view-categories4";
    categoriesView4.classList.add("accessibility-view", "hidden");
    categoriesView4.setAttribute("aria-hidden", "true");
    categoriesView4.appendChild(createButton("back-to-menu", "⬅ Volver", () => switchView("view-initial")));
    categoriesView4.appendChild(createResetButton());
    categoriesView4.append(
      createButton("btn-autismo", "Autismo", () => switchView("view-autismo")),
      createButton("btn-tco", "TOC Trastorno Obsesivo Compulsivo", () => switchView("view-tco")),
    
    );

    const categoriesView5 = document.createElement("div");
    categoriesView5.id = "view-categories4";
    categoriesView5.classList.add("accessibility-view", "hidden");
    categoriesView5.setAttribute("aria-hidden", "true");
    categoriesView5.appendChild(createButton("back-to-menu", "⬅ Volver", () => switchView("view-initial")));
    categoriesView5.appendChild(createResetButton());
    categoriesView5.append(
      createButton("btn-autismo", "Autismo", () => switchView("view-autismo")),
      createButton("btn-tco", "TOC Trastorno Obsesivo Compulsivo", () => switchView("view-tco")),
    
    );
  
  

  // Añadir todo al contenedor del widget
  accessibilityMenu.append(
    mainMenu,
    initialView,
    categoriesView,
    categoriesView1,
    categoriesView2,
    categoriesView3, 
    categoriesView4,
    categoriesView5,
    ...Object.values(views),
    ...Object.values(views1),
    ...Object.values(views2),
    ...Object.values(views3),
    ...Object.values(views4),
    ...Object.values(views5),  // Añadir las vistas de categorías al menú
    
      // Añadir las vistas de categorías al menú,

  );

  widgetContainer.append(accessibilityButton, accessibilityMenu);  // Añadir el botón y el menú al contenedor
  document.body.appendChild(widgetContainer);  // Añadir el widget al cuerpo del documento

  // Evento para cerrar el menú cuando se presiona la tecla Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      accessibilityMenu.classList.add("hidden");  // Ocultar el menú
      accessibilityMenu.setAttribute("aria-hidden", "true");  // Cambiar atributo ARIA para accesibilidad
    }
  });
}

// Inicializar el widget de accesibilidad
initWidget("123434");
