import { host } from "../../shared/constants/enviroments";

const cursorManito = `${host}/public/03.svg`;
const cursorGrande = `${host}/public/03.svg`;


export function toggleLargeCursor() {
    const isActive = document.body.classList.toggle("cursor-large");
    localStorage.setItem("cursorMode", isActive ? "large" : "default");
}

// Aplicar configuración guardada al cargar la página
export function loadCursorSetting() {
    if (localStorage.getItem("cursorMode") === "large") {
        document.body.classList.add("cursor-large");
    }
}

// Agregar estilos CSS para los cursores personalizados
const cursorStyleTag = document.createElement("style");
cursorStyleTag.innerHTML = `
  /* Cursor normal grande */
  .cursor-large { 
    cursor: url('${cursorGrande}') 13 9, default !important; 
  }
  

  /* Cursor de "manito" para enlaces */
  .cursor-large a, 
  .cursor-large button, 
  .cursor-large [role="button"] {
    cursor: url('${ cursorManito}') 30 9, pointer !important; 
  }
`;
document.head.appendChild(cursorStyleTag);

// Cargar la configuración al iniciar
loadCursorSetting();