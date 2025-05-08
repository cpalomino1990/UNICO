// components/visualView.js
import { switchView } from "../../widget";
import { allButtons } from "../components/allButtons/allButtons";
import { createCardProfile, createCardTitle } from "../utils/createElements";

// Array para almacenar los perfiles activos
const activeProfiles = [];

// Función para activar o desactivar un perfil y reconstruir botones
const ToggleActiveProfiles = (id, title) => {
  const element = document.getElementById(id);
  if (element) {
    element.classList.toggle("active");
    const checkElement = element.querySelector(".accessibility-check");
    if (checkElement) {
      checkElement.style.display = checkElement.style.display === "none" ? "flex" : "none";
    }
  }

  // Añade o elimina del array
  const index = activeProfiles.findIndex((profile) => profile.id === id);
  if (index !== -1) {
    activeProfiles.splice(index, 1);
  } else {
    activeProfiles.push({ id, title });
  }

  // Actualiza texto del título según perfiles activos
  const elementTitle = document.querySelector(
    "#accessibility-title-profile-select .accessibility-title-card-content-left .accessibility-title-card-text"
  );
  elementTitle.innerHTML = activeProfiles.length > 1 ? "Personalizado" : activeProfiles[0]?.title || "";

  // Reconstruye el contenedor de botones de perfiles
  const contentButtons = document.getElementById("accessibility-content-button-profiles");
  if (activeProfiles.length > 0) {
    contentButtons.style.display = "block";
    // Limpia botones anteriores (dejando el título)
    while (contentButtons.children.length > 1) {
      contentButtons.removeChild(contentButtons.lastChild);
    }
    // Filtra por títulos activos
    const perfilNames = activeProfiles.map((p) => p.id);
    const botonesPerfil = allButtons("accessibility-buttons-active", perfilNames);
    contentButtons.appendChild(botonesPerfil);
  } else {
    contentButtons.style.display = "none";
  }
};

// Crea la vista de perfiles visuales
export function visualView() {
  const categoriesView = document.createElement("div");
  categoriesView.id = "accessibility-visual-view";
  categoriesView.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  categoriesView.setAttribute("aria-hidden", "true");

  // Contenedor de perfiles
  const profiles = document.createElement("div");
  profiles.id = "accessibility-content-profiles";

  profiles.append(
    createCardProfile({
      id: "accessibility-btn-visual",
      title: "Baja Visión",
      description: "Este perfil mejora la visibilidad del contenido para personas con visión reducida.",
      onclick: () => ToggleActiveProfiles("accessibility-btn-visual", "Baja Visión"),
    }),
    createCardProfile({
      id: "accessibility-btn-total-blindness",
      title: "Ceguera",
      description: "Este perfil permite escuchar el contenido mediante lectura por voz.",
      onclick: () => ToggleActiveProfiles("accessibility-btn-total-blindness", "Ceguera"),
    }),
    createCardProfile({
      id: "accessibility-btn-color-blindness",
      title: "Daltonismo",
      description: "Este perfil ofrece filtros de color adaptados a distintos tipos de daltonismola.",
      onclick: () => ToggleActiveProfiles("accessibility-btn-color-blindness", "Daltonismo"),
    })
  );

  // Contenedor de botones adicionales (oculto por defecto)
  const contentButtonProfiles = document.createElement("div");
  contentButtonProfiles.id = "accessibility-content-button-profiles";
  contentButtonProfiles.style.display = "none";
  contentButtonProfiles.appendChild(
    createCardTitle({ id: "accessibility-title-profile-select", text: "", btnBack: false, collapse: false })
  );

  // Ensamblado de la vista
  categoriesView.appendChild(
    createCardTitle({
      id: "",
      text: "Perfiles de capacidad diversa",
      btnBack: true,
      collapse: false,
      onclick: () => switchView("view-initial"),
    })
  );
  categoriesView.appendChild(profiles);
  categoriesView.appendChild(contentButtonProfiles);
  categoriesView.appendChild(
    createCardTitle({ id: "", text: "Mas configuraciones", btnBack: false, collapse: false })
  );
  // Sección general de botones: muestra todos
  categoriesView.appendChild(allButtons("accessibility-content-others-buttons"));

  return categoriesView;
} 