import { createButton, switchView } from "../../widget";
import { DynamicIcon } from "../assets/icons/generals/dinamicIcons";
import { isMobile } from "../constants/enviroments";

export function createButtonCard(props = { id, text, view, icon }) {
  // Creamos el boton de tipo card
  const card = createButton(props.id, "", () => {
    switchView(props.view);
  });
  card.classList.add("accessibility-card-button");
  card.classList.add("out-right");
  card.innerHTML = `
    <div class="accessibility-card-button-info blue" style="display: ${isMobile ? "block" : "none"};">
      ${DynamicIcon({ icon: "info" })}
    </div>
    <div class="accessibility-card-button-content">
      <div class="accessibility-card-button-icon">
        <img src="${props.icon}" alt="icon">
      </div>
      <p class="accessibility-card-button-text">${props.text}</p>
    </div>
    <div class="accessibility-card-button-info-content">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, saepe? Debitis ab temporibus labore ut quibusdam deleniti iusto, mollitia, a eveniet consectetur minus quis ipsum unde officia, explicabo doloremque est!</p>
    </div>
  `;
  if (isMobile) {
    const contentInfo = card.querySelector(".accessibility-card-button-info-content");
    contentInfo.style.paddingRight = "30px";
  }

  card.querySelector(".accessibility-card-button-info")?.addEventListener("click", (event) => {
    event.stopPropagation();
    const buttonInfo = card.querySelector(".accessibility-card-button-info");
    // Toogle de para activar la animacion
    console.log([...card.classList]);
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

  // - Noel Delgado | @pixelia_me
  // Animacion del hover cubo
  if (!isMobile) {
    const directions = { 0: "top", 1: "right", 2: "bottom", 3: "left" };
    const classNames = ["in", "out"]
      .map((p) => Object.values(directions).map((d) => `${p}-${d}`))
      .reduce((a, b) => a.concat(b));

    const getDirectionKey = (ev, node) => {
      const { width, height, top, left } = node.getBoundingClientRect();
      const l = ev.pageX - (left + window.pageXOffset);
      const t = ev.pageY - (top + window.pageYOffset);
      const x = l - (width / 2) * (width > height ? height / width : 1);
      const y = t - (height / 2) * (height > width ? width / height : 1);
      return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    };

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

    new Item(card);
  }

  return card; // Devolver el botón creado
}

// Creacion del banner de bienenida del usuario
export function createBannerUser() {
  const card = document.createElement("div");
  card.id = "accessibility-banner-user";
  card.innerHTML = `
    <div class="accessibility-banner-user-top">
      <p class="accessibility-banner-user-top-title">
        Capacidades diversas
      </p>  
      
      <p class="accessibility-banner-user-top-date">
        Lunes 17 De Noviembre 2025
      </p>
    </div>
    <p class="accessibility-banner-user-title">
      Bienvenid@
    </div>
    <p class="accessibility-banner-user-subtitle">
      Te invitamos a registrarte para tener una experiencia personalizada
    </div>
  `;

  return card; // Devolver el botón creado
}
