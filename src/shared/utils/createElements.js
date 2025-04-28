import { createButton, switchView } from "../../widget";
import { DynamicIcon } from "../assets/icons/generals/dinamicIcons";
import { host, isMobile } from "../constants/enviroments";

// Función para crear un botón tipo tarjeta (card) para categorías
export function createButtonCard(props = { id, text, view, icon }) {
  // Creamos el botón de tipo card
  const card = createButton(props.id, "", () => {
    // Cambiar la vista cuando se haga clic en el botón
    switchView(props.view);
  });

  // Añadimos clases para el estilo del botón
  card.classList.add("accessibility-card-button");
  card.classList.add("out-right");

  // HTML del contenido del card (incluye icono, texto, y una descripción adicional)
  card.innerHTML = `
    <div class="accessibility-card-button-info blue" style="display: ${isMobile ? "block" : "none"};">
      ${DynamicIcon({ icon: "info" })} <!-- Icono dinámico para información -->
    </div>
    <div class="accessibility-card-button-content">
      <div class="accessibility-card-button-icon">
        <img src="${props.icon}" alt="icon"> <!-- Icono de la tarjeta -->
      </div>
      <p class="accessibility-card-button-text">${props.text}</p> <!-- Texto de la tarjeta -->
    </div>
    <div class="accessibility-card-button-info-content">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p> <!-- Descripción adicional de la tarjeta -->
    </div>
  `;

  // Ajuste de estilo para móviles (mostrar/ocultar contenido adicional)
  if (isMobile) {
    const contentInfo = card.querySelector(".accessibility-card-button-info-content");
    contentInfo.style.paddingRight = "30px";
  }

  // Event listener para el botón de información (muestra/oculta la información adicional)
  card.querySelector(".accessibility-card-button-info")?.addEventListener("click", (event) => {
    event.stopPropagation(); // Evitar propagación del evento
    const buttonInfo = card.querySelector(".accessibility-card-button-info");

    // Toggle de la animación (muestra/oculta contenido adicional)
    if ([...card.classList].some((cls) => cls.startsWith("in-"))) {
      card.classList.remove("in-right");
      card.classList.add("out-right");
      if (isMobile) {
        buttonInfo.classList.remove("white");
        buttonInfo.classList.add("blue");
      }
    } else {
      card.classList.remove("out-right");
      card.classList.add("in-right");
      if (isMobile) {
        buttonInfo.classList.remove("blue");
        buttonInfo.classList.add("white");
      }
    }
  });

  // Animación de hover para efectos en escritorio (cubo de entrada y salida)
  if (!isMobile) {
    const directions = { 0: "top", 1: "right", 2: "bottom", 3: "left" };
    const classNames = ["in", "out"]
      .map((p) => Object.values(directions).map((d) => `${p}-${d}`))
      .reduce((a, b) => a.concat(b));

    // Función para calcular la dirección del mouse y aplicar la animación correspondiente
    const getDirectionKey = (ev, node) => {
      const { width, height, top, left } = node.getBoundingClientRect();
      const l = ev.pageX - (left + window.pageXOffset);
      const t = ev.pageY - (top + window.pageYOffset);
      const x = l - (width / 2) * (width > height ? height / width : 1);
      const y = t - (height / 2) * (height > width ? width / height : 1);
      return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    };

    // Clase para manejar la animación de entrada y salida
    class Item {
      constructor(element) {
        this.element = element;
        this.element.addEventListener("mouseover", (ev) => this.update(ev, "in"));
        this.element.addEventListener("mouseout", (ev) => this.update(ev, "out"));
      }

      update(ev, prefix) {
        this.element.classList.remove(...classNames);
        this.element.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
      }
    }

    // Iniciamos la animación de entrada/salida en el card
    new Item(card);
  }

  // Devolvemos el card creado
  return card;
}

// Función para crear un banner de bienvenida para el usuario
export function createBannerUser() {
  const card = document.createElement("div");
  card.id = "accessibility-banner-user";
  card.innerHTML = `
    <div class="accessibility-banner-user-top">
      <div class="accessibility-banner-user-top-image">
        <div class="accessibility-banner-user-top-image-internal">
          <img src="https://cdn.pixabay.com/photo/2020/12/08/19/12/woman-5815354_640.jpg" alt="user image">
        </div>
      </div>
    </div>
    <p class="accessibility-banner-user-title">
      Bienvenid@ <!-- Título del banner -->
    </p>
    <p class="accessibility-banner-user-subtitle">
      Te invitamos a registrarte para tener una experiencia personalizada
    </p> <!-- Subtítulo del banner -->
  `;

  // Devolvemos el banner creado
  return card;
}

// Función para crear tarjetas de perfil
export function createCardProfile(props = { id, title, description, onclick }) {
  const card = document.createElement("div");
  card.id = props.id;
  card.classList.add("accessibility-profile-card");
  card.innerHTML = `
    <div class="accessibility-profile-card-content">
      <div class="accessibility-check float-top-right" style="display: none;">
        <div class="accessibility-check-external">
          <div class="accessibility-check-internal"></div>
        </div>
      </div>
      <div class="accessibility-profile-card-top">
        <div class="accessibility-profile-card-top-icon">
          ${DynamicIcon({ icon: "user" })} <!-- Icono de perfil -->
        </div>
        <p>${props.title}</p> <!-- Título del perfil -->
      </div>
      <p class="description">
        ${props.description} <!-- Descripción del perfil -->
      </p>
    </div>
  `;

  // Event listener para manejar clics en la tarjeta de perfil
  card.addEventListener("click", props.onclick);

  // Devolvemos el card creado
  return card;
}

// Función para crear tarjetas de título con botón de retroceso y/o colapsables
export function createCardTitle(props = { id, text, btnBack, collapse, onclick }) {
  const card = document.createElement("div");
  card.id = props.id;
  card.classList.add("accessibility-title-card");

  // Creación del botón "atrás"
  const buttonBack = createButton("back-to-menu", "", props.onclick);
  buttonBack.classList.add("accessibility-circle-button-sm");
  buttonBack.innerHTML = `${DynamicIcon({ icon: "right" })}`; // Icono de flecha hacia atrás

  // Creación del título
  const title = document.createElement("p");
  title.classList.add("accessibility-title-card-text");
  title.innerHTML = props.text; // Texto del título

  // Contenedor izquierdo (con el botón de retroceso si es necesario)
  const contentLeft = document.createElement("div");
  contentLeft.classList.add("accessibility-title-card-content-left");
  if (props.btnBack) {
    contentLeft.appendChild(buttonBack);
  }
  contentLeft.appendChild(title);

  // Contenedor derecho (icono de colapso si es necesario)
  const contentRight = document.createElement("div");
  contentRight.classList.add("accessibility-title-card-content-right");
  contentRight.innerHTML = `${DynamicIcon({ icon: "bottom" })}`; // Icono de colapso

  // Agregamos los contenedores al card
  card.appendChild(contentLeft);
  if (props.collapse) {
    card.appendChild(contentRight);
  }

  return card;
}

// Función para crear botones de funcionalidad (con opciones de selección)
export function createFuncionalityButton(
  props = { id, title, icon, description, onclick, countOptions, labelOptions }
) {
  const countOptions = props.countOptions || 1; // Si no se especifica, el valor por defecto es 1
  const card = document.createElement("div");
  card.id = props.id;
  if (countOptions === 1) {
    card.style.position = "relative"; // Aseguramos que se posicionen bien las opciones si es solo una
  }
  card.classList.add("accessibility-funcionality-button");
  card.innerHTML = `
    <div class="accessibility-funcionality-button-content">
      <div class="accessibility-funcionality-button-icon">
        ${props.icon ? props.icon : DynamicIcon({ icon: "user" })} <!-- Icono de la funcionalidad -->
      </div>
      <p>${props.title}</p> <!-- Título del botón -->
      <div class="accessibility-content-checks ${countOptions === 1 ? "float-top-right" : ""}">
        ${Array.from({ length: countOptions })
          .map(
            () => `
            <div class="accessibility-check" style="${countOptions === 1 && "display: none;"}">
              <div class="accessibility-check-external" style="${
                countOptions > 1 && "background: color-mix(in srgb, #cacaca 33%, transparent) !important;"
              }">
                <div class="accessibility-check-internal" style="${
                  countOptions > 1 && "background: #cacaca !important;"
                }"></div>
              </div>
            </div>
          `
          )
          .join("")}
      </div>
    </div>
  `;

  // Event listener para manejar el clic en el botón de funcionalidad
  card.addEventListener("click", props.onclick);

  return card;
}
