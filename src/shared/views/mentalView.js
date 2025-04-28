// Importa funciones necesarias desde otros módulos
import { switchView } from "../../widget";
import { allButtons } from "../components/allButtons/allButtons";
import { createCardProfile, createCardTitle } from "../utils/createElements";
// Array para almacenar los perfiles activos
const activeProfiles = [];

// Función para activar o desactivar un perfil
const ToggleActiveProfiles = (id, title) => {
  const element = document.getElementById(id); // Obtiene el elemento por ID
  if (element) {
    // Alterna la clase "active"
    element.classList.toggle("active");
    // Muestra u oculta el check de accesibilidad
    const checkElement = element.querySelector(".accessibility-check");
    if (checkElement) {
      checkElement.style.display = checkElement.style.display === "none" ? "flex" : "none";
    }
  } 

  // Añade o elimina el ID del array de perfiles activos
  const index = activeProfiles.findIndex((profile) => profile.id === id); // Busca el índice del perfil en el array
  if (index !== -1) {
    activeProfiles.splice(index, 1); // Si ya existe, lo elimina
  } else {
    activeProfiles.push({ id, title }); // Si no existe, lo agrega
  }

  // Cambiar el titulo del perfil seleccionado
  const elementTitle = document.querySelector(
    "#accessibility-title-profile-select .accessibility-title-card-content-left .accessibility-title-card-text"
  );
  elementTitle.innerHTML = activeProfiles.length > 1 ? "Personalizado" : activeProfiles[0]?.title;

  // Muestra u oculta la sección de botones adicionales según si hay perfiles activos
  const contentButtons = document.getElementById("accessibility-content-button-profiles");
  if (activeProfiles.length > 0) {
    if (contentButtons) {
      contentButtons.style.display = "block";
    }
  } else {
    if (contentButtons) {
      contentButtons.style.display = "none";
    }
  }
};

// Función que crea la vista de perfiles mentales
export function mentalView() {
  // Crea el contenedor principal de la vista
  const categoriesView = document.createElement("div");
  
  categoriesView.id = "accessibility-mental-view";
  categoriesView.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  categoriesView.setAttribute("aria-hidden", "true");

  // Crea el título de la sección de perfiles (vacío por ahora)
  const title = document.createElement("div");
  title.id = "accessibility-title-profiles";

  // Crea el contenedor de los perfiles disponibles
  const profiles = document.createElement("div");
  profiles.id = "accessibility-content-profiles";

  // Agrega tarjetas de perfil al contenedor
  profiles.append(
    createCardProfile({
      id: "accessibility-btn-mental",
      title: "Baja Visión",
      description: "Lorem ipsum dolor sit amet, consecteturadip iscingelit. Ut a enim necnislullamcorpere",
      onclick: () => ToggleActiveProfiles("accessibility-btn-mental", "Baja Visión"),
    }),
    createCardProfile({
      id: "accessibility-btn-total-blindness",
      title: "Ceguera",
      description: "Lorem ipsum dolor sit amet, consecteturadip iscingelit. Ut a enim necnislullamcorpere",
      onclick: () => ToggleActiveProfiles("accessibility-btn-total-blindness", "Ceguera"),
    }),
    createCardProfile({
      id: "accessibility-btn-color-blindness",
      title: "Daltonismo",
      description: "Lorem ipsum dolor sit amet, consecteturadip iscingelit. Ut a enim necnislullamcorpere",
      onclick: () => ToggleActiveProfiles("accessibility-btn-color-blindness", "Daltonismo"),
    })
    // Este perfil está comentado, no se incluye en la vista
    // createCardProfile({
    //   id: "accessibility-btn-color-perception",
    //   title: "Percepción del Color",
    //   description: "...",
    //   onclick: () => switchView("view-color-perception"),
    // })
  );

  // Crea el contenedor para los botones adicionales que dependen del perfil seleccionado
  const contentButtonProfiles = document.createElement("div");
  contentButtonProfiles.id = "accessibility-content-button-profiles";
  contentButtonProfiles.style.display = "none"; // Oculto por defecto

  // Agrega título y botón funcional dentro del contenedor de botones de perfil
  contentButtonProfiles.appendChild(
    
    createCardTitle({ id: "accessibility-title-profile-select", text: "", btnBack: false, collapse: false })

  );

  // Agrega todos los elementos al contenedor principal
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
  categoriesView.appendChild(createCardTitle({ id: "", text: "Mas configuraciones", btnBack: false, collapse: false }));
  categoriesView.appendChild(allButtons("accessibility-content-others-buttons"));

  // Retorna la vista completa para ser agregada al DOM
  return categoriesView;
}
