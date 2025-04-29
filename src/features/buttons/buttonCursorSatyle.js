import { host } from "../../shared/constants/enviroments";

const cursorManito = `${host}/public/03.svg`; // Para enlaces, botones
const cursorGrande = `${host}/public/01.svg`; // Cursor grande general
const cursorArrastrar = `${host}/public/04.svg`; // Mano para arrastrar

export function toggleLargeCursor() {
  const isActive = document.body.classList.toggle("cursor-large");
  localStorage.setItem("cursorMode", isActive ? "large" : "default");
}

// Aplicar configuración guardada al cargar la página
export function loadCursorSetting() {
  const mode = localStorage.getItem("cursorMode");
  if (mode === "large") {
    document.body.classList.add("cursor-large");
  }
}

// Inyectar estilos solo si no existen aún
if (!document.getElementById("custom-cursor-style")) {
  const cursorStyleTag = document.createElement("style");
  cursorStyleTag.id = "custom-cursor-style";
  cursorStyleTag.innerHTML = `
    /* Cursor normal grande */
    .cursor-large { 
      cursor: url('${cursorGrande}') 13 9, default !important; 
    }

    /* Cursor de manito grande para enlaces y botones */
    .cursor-large a, 
    .cursor-large button, 
    .cursor-large [role="button"] {
      cursor: url('${cursorManito}') 30 9, pointer !important; 
    }

    /*  Cursor de arrastrar */
    .cursor-large [draggable="true"],
    .cursor-large .draggable {
      cursor: url('${cursorArrastrar}') 25 10, grab !important;
    }
  `;
  document.head.appendChild(cursorStyleTag);
}

// Cargar la configuración al iniciar
loadCursorSetting();