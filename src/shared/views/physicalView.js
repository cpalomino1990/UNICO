// components/physicalView.js
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
    "#accessibility-title-profile-select-physical .accessibility-title-card-content-left .accessibility-title-card-text"
  );
  elementTitle.innerHTML = activeProfiles.length > 1 ? "Personalizado" : activeProfiles[0]?.title || "";

  // Reconstruye el contenedor de botones de perfiles
  const contentButtons = document.getElementById("accessibility-content-button-profiles-physical");
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

// Crea la vista de perfiles physical
export function physicalView() {
  const categoriesView = document.createElement("div");
  categoriesView.id = "accessibility-physical-view";
  categoriesView.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  categoriesView.setAttribute("aria-hidden", "true");

  // Contenedor de perfiles
  const profiles = document.createElement("div");
  profiles.id = "accessibility-content-profiles";

  profiles.append(
    createCardProfile({
      id: "accessibility-btn-physical",
      title: "Movilidad Superior Baja",
      description: "Lorem ipsum dolor sit amet...",
      onclick: () => ToggleActiveProfiles("accessibility-btn-physical", "Movilidad Superior Baja"),
    }),
    

      
  );

  // Contenedor de botones adicionales (oculto por defecto)
  const contentButtonProfiles = document.createElement("div");
  contentButtonProfiles.id = "accessibility-content-button-profiles-physical";
  contentButtonProfiles.style.display = "none";
  contentButtonProfiles.appendChild(
    createCardTitle({ id: "accessibility-title-profile-select-physical", text: "", btnBack: false, collapse: false })
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