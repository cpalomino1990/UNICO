import "../styles/fullLayout.css";
import "../styles/views.css";
import "../styles/elements.css";
import { createButton, toggleMenu } from "../../widget";
import { host } from "../constants/enviroments";
import { ChangeTheme } from "../utils/actions";

const header = () => {
  // Creamos el header
  const header = document.createElement("div");
  header.id = "accessibility-header";
  header.innerHTML = `
    <div id="accessibility-header-logo">
    </div>
    <div id="accessibility-header-nav">
    </div>
  `;
  // Agregamos el logo al header
  const logo = header.querySelector("#accessibility-header-logo");
  const logoImg = document.createElement("img");
  logoImg.src = `${host}/src/shared/assets/logos/LogoPrincipalBlue.svg`;
  logoImg.alt = "Logo de Unyco";
  logo.appendChild(logoImg);

  // Boton de usuario
  const userButton = createButton("accessibility-user-button", "", toggleMenu);
  userButton.classList.add("accessibility-circle-button");
  userButton.innerHTML = `<img src="${host}/src/shared/assets/icons/generals/icon-user.svg" alt="User Icon">`;

  // Boton de cerrar menu
  const closeButton = createButton("accessibility-close-menu", "❌", toggleMenu);
  closeButton.classList.add("accessibility-circle-button");
  closeButton.innerHTML = `<img src="${host}/src/shared/assets/icons/generals/icon-x.svg" alt="Close Icon">`;

  // Agregamos los botones al header
  const nav = header.querySelector("#accessibility-header-nav");
  nav.appendChild(userButton);
  nav.appendChild(closeButton);

  return header;
};

export const main = (outlet) => {
  // Creamos el main
  const main = document.createElement("div");
  main.id = "accessibility-main";
  main.classList.add("accessibility-custom-scroll");

  // Agregamos el outlet al main
  outlet.forEach((element) => {
    main.appendChild(element);
  });

  return main;
};

const footer = () => {
  // Creamos el footer
  const footer = document.createElement("div");
  footer.id = "accessibility-footer";

  // Boton de lenguajes
  const languageButton = createButton("accessibility-language-button", "", toggleMenu);
  languageButton.classList.add("accessibility-flag-button");
  languageButton.style.backgroundImage = `url("${host}/src/shared/assets/icons/generals/Flag_of_Colombia.png")`;
  languageButton.style.backgroundSize = "cover";
  languageButton.style.backgroundPosition = "center";
  languageButton.style.backgroundRepeat = "no-repeat";

  // Boton de restaurar
  const resetButton = createButton("accessibility-reset-button", "", ChangeTheme);
  resetButton.classList.add("accessibility-circle-button");
  resetButton.innerHTML = `<img src="${host}/src/shared/assets/icons/generals/icon-reset.svg" alt="Reset Icon">`;

  // Boton de tamaño xl
  const sizeXLButton = createButton("accessibility-size-xl-button", "", toggleMenu);
  sizeXLButton.classList.add("accessibility-circle-button");
  sizeXLButton.innerHTML = `<img src="${host}/src/shared/assets/icons/generals/icon-xl.svg" alt="Size XL Icon">`;

  // Boton mover widget
  const moveRightButton = createButton("accessibility-move-button", "", toggleMenu);
  moveRightButton.classList.add("accessibility-circle-button");
  moveRightButton.innerHTML = `<img src="${host}/src/shared/assets/icons/generals/icon-arrow-left.svg" alt="Move Right Icon">`;

  // Boton de ayuda
  const helpButton = createButton("accessibility-help-button", "", toggleMenu);
  helpButton.classList.add("accessibility-circle-button");
  helpButton.innerHTML = `<img src="${host}/src/shared/assets/icons/generals/icon-help.svg" alt="Help Icon">`;

  // Link de statuto de accesibilidad
  const accessibilityLink = document.createElement("a");
  accessibilityLink.id = "accessibility-footer-link";
  accessibilityLink.href = "https://www.unyco.org/estatutodeaccesibilidad/";
  accessibilityLink.target = "_blank";
  accessibilityLink.innerText = "Accessibility Statement";

  // Agregamos los botones al footer
  const footerButtons = document.createElement("div");
  footerButtons.id = "accessibility-footer-buttons";
  footerButtons.appendChild(languageButton);
  footerButtons.appendChild(resetButton);
  footerButtons.appendChild(sizeXLButton);
  footerButtons.appendChild(moveRightButton);
  footerButtons.appendChild(helpButton);

  footer.appendChild(footerButtons);
  footer.appendChild(accessibilityLink);

  return footer;
};

export const fullLayout = (outlet) => {
  // Creamos la estructura del fullLayout y agregamos el header, main y footer
  const fullLayout = document.createElement("div");
  fullLayout.id = "accessibility-full-layout";
  fullLayout.classList.add("accessibility-custom-scroll");
  fullLayout.appendChild(header());
  fullLayout.appendChild(main(outlet));
  fullLayout.appendChild(footer());

  return fullLayout;
};
