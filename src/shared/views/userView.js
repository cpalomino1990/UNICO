// components/loginView.js
import { createButton, switchView } from "../../widget";
import { DynamicIcon } from "../assets/icons/generals/dinamicIcons";
import { host } from "../constants/enviroments";
import { createCollapse, createInputFileForm, createInputForm, createSelectForm } from "../utils/createElements";

// Crea la vista para el login de usuario
export function loginView() {
  const login = document.createElement("div");
  login.id = "accessibility-user-login-view";
  login.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  login.setAttribute("aria-hidden", "true");
  login.innerHTML = `
    <div class="accessibility-user-view-content">
      <div class="accessibility-user-view-header">
      </div>
      <div class="accessibility-user-login-view-content-text">
        <p class="accessibility-title-card-text">Bienvenido a U</p>
        <p class="accessibility-description-card-text">Elige cualquiera de estas opciones para iniciar sesion o crear una cuenta.</p>
      </div>
      <div class="accessibility-user-login-view-content-form">
      </div>
      <div class="accessibility-user-login-view-content-footer">
        <p>¿No tienes una cuenta? <a>Registrarme</a></p>
        <p>o</p>
        <p>puedes ingresar con</p>
        <div class="accessibility-user-login-view-content-footer-icons">
          <button class="accessibility-icon-button" id="email-button" aria-label="email">
            <img src="${host}/src/shared/assets/icons/socialMedia/email.svg" alt="email" aria-label="email" />
          </button>
          <button class="accessibility-icon-button" id="google-button" aria-label="Google">
            <img src="${host}/src/shared/assets/icons/socialMedia/google.svg" alt="Google" aria-label="Google" />
          </button>
          <button class="accessibility-icon-button" id="instagram-button" aria-label="instagram">
            <img src="${host}/src/shared/assets/icons/socialMedia/instagram.svg" alt="instagram" aria-label="instagram" />
          </button>
          <button class="accessibility-icon-button" id="facebook-button" aria-label="Facebook">
            <img src="${host}/src/shared/assets/icons/socialMedia/facebook.svg" alt="Facebook" aria-label="Facebook" />
          </button>
        </div>
      </div>
    </div>
  `;

  // Creación del botón "atrás"
  const buttonBack = createButton("back", "", () => switchView("view-initial"));
  buttonBack.classList.add("accessibility-circle-button");
  buttonBack.innerHTML = `${DynamicIcon({ icon: "left" })}`; // Icono de flecha hacia atrás

  // Creación del título
  const title = document.createElement("p");
  title.classList.add("accessibility-title-card-text");
  title.innerHTML = "Iniciar sesion"; // Texto del título

  // Creacion del contenedor izquierdo (con el botón de retroceso)
  const contentLeft = document.createElement("div");
  contentLeft.classList.add("accessibility-user-view-header-left");

  // Agrega el botón "atrás" y el título al contenedor izquierdo
  contentLeft.appendChild(buttonBack);
  contentLeft.appendChild(title);

  // Agregar el contenedor izquierdo al header
  const header = login.querySelector(".accessibility-user-view-header");
  header.appendChild(contentLeft);

  // Creacion del formulario de inicio de sesion
  const content = login.querySelector(".accessibility-user-login-view-content-form");
  const form = document.createElement("form");
  form.classList.add("accessibility-user-login-form");
  form.appendChild(
    createInputForm({
      type: "text",
      id: "email",
      placeholder: "Ingresa tu correo electronico",
    })
  );
  form.appendChild(
    createInputForm({
      type: "password",
      id: "password",
      placeholder: "Ingresa tu contraseña",
    })
  );
  const button = document.createElement("div");
  button.innerHTML = `
      <a>¿Olvidaste tu contraseña?</a>
      <button id="login-button" class="accessibility-button-theme" >Iniciar sesión</button>
  `;
  form.appendChild(button);
  content.appendChild(form);

  // Funcion onlcick para el boton de ir a registrar
  const registerButton = login.querySelector(".accessibility-user-login-view-content-footer p a");
  registerButton.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    switchView("accessibility-user-register-view"); // Cambiar a la vista de registro
  });

  return login;
}

export function registerView() {
  const register = document.createElement("div");
  register.id = "accessibility-user-register-view";
  register.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  register.setAttribute("aria-hidden", "true");
  register.innerHTML = `
    <div class="accessibility-user-view-content">
      <div class="accessibility-user-view-header">
      </div>
      <div class="accessibility-user-register-view-content">
        <div class="accessibility-banner-user-top-image" style="position: relative; top: 0; width: 120px; height: 120px; left: calc(50% - 60px);">
          <div class="accessibility-banner-user-top-image-internal" style="width: 105px; height: 105px;">
            <img src="https://cdn.pixabay.com/photo/2020/12/08/19/12/woman-5815354_640.jpg" alt="user image">
          </div>
        </div>
        <a class="accessibility-user-button-edit-img" >Editar imagen <span>${DynamicIcon({ icon: "pen" })}</span></a>
        <h2 class="accessibility-user-register-view-title">Bienvenido</h2>
        <p>Por favor completa todos los campos para crear tu perfil.</p>
      </div>
    </div>
  `;

  // Creación del botón "atrás"
  const buttonBack = createButton("back", "", () => switchView("accessibility-user-login-view"));
  buttonBack.classList.add("accessibility-circle-button");
  buttonBack.innerHTML = `${DynamicIcon({ icon: "left" })}`; // Icono de flecha hacia atrás

  // Creación del título
  const title = document.createElement("p");
  title.classList.add("accessibility-title-card-text");
  title.innerHTML = "Registrarme"; // Texto del título

  // Creación del botón "home"
  const buttonHome = createButton("home", "", () => switchView("view-initial"));
  buttonHome.classList.add("accessibility-home-button");
  buttonHome.innerHTML = `${DynamicIcon({ icon: "home" })}`; // Icono de flecha hacia atrás

  // Creacion del contenedor izquierdo (con el botón de retroceso)
  const contentLeft = document.createElement("div");
  contentLeft.classList.add("accessibility-user-view-header-left");

  // Creacion del contenedor derecho (con el botón de home)
  const contentRight = document.createElement("div");
  contentRight.classList.add("accessibility-user-view-header-right");

  // Agrega el botón "atrás" y el título al contenedor izquierdo
  contentLeft.appendChild(buttonBack);
  contentLeft.appendChild(title);

  // Agrega el botón "home" al contenedor derecho
  contentRight.appendChild(buttonHome);

  // Agregar los contenendores al header
  const header = register.querySelector(".accessibility-user-view-header");
  header.appendChild(contentLeft);
  header.appendChild(contentRight);

  // Creacion de los collapses
  const content = register.querySelector(".accessibility-user-register-view-content");
  const form = document.createElement("form");
  form.classList.add("accessibility-user-register-form");

  // Crear seccion del formulario para informacion personal basica
  const personalInfo = document.createElement("div");
  personalInfo.classList.add("accessibility-user-register-form-personal-info");

  // Nombre y apellido
  personalInfo.appendChild(
    createInputForm({ type: "text", id: "name", label: "Nombre", placeholder: "Ingresa tu nombre completo" })
  );
  // Tipos de documento
  personalInfo.appendChild(
    createSelectForm({
      id: "document-type",
      label: "Tipo de documento",
      options: [
        { value: "", text: "Seleccione" },
        { value: "cc", text: "Cédula de ciudadania" },
        { value: "ce", text: "Cédula de extrangeria" },
        { value: "pt", text: "Pasaporte" },
      ],
    })
  );
  // Numero de documento
  personalInfo.appendChild(
    createInputForm({
      type: "text",
      id: "document-number",
      label: "Número de documento",
      placeholder: "Ingresa tu número de documento",
    })
  );
  // Correo electronico
  personalInfo.appendChild(
    createInputForm({
      type: "email",
      id: "email",
      label: "Correo electronico",
      placeholder: "Ingresa tu correo electronico",
    })
  );
  // Fecha de nacimiento
  personalInfo.appendChild(
    createInputForm({
      type: "date",
      id: "birth-date",
      label: "Fecha de nacimiento",
      placeholder: "Ingresa tu fecha de nacimiento",
    })
  );
  // Pais de residencia
  personalInfo.appendChild(
    createSelectForm({
      id: "country",
      label: "País de residencia",
      options: [
        { value: "", text: "Seleccione" },
        { value: "colombia", text: "Colombia" },
        { value: "mexico", text: "México" },
      ],
    })
  );
  // Ciudad de residencia
  personalInfo.appendChild(
    createSelectForm({
      id: "city",
      label: "Ciudad de residencia",
      options: [
        { value: "", text: "Seleccione" },
        { value: "bogota", text: "Bogotá" },
        { value: "medellin", text: "Medellín" },
        { value: "cali", text: "Cali" },
      ],
    })
  );
  // zona de residencia
  personalInfo.appendChild(
    createSelectForm({
      id: "zone",
      label: "Zona de residencia",
      options: [
        { value: "", text: "Seleccione" },
        { value: "urbana", text: "Urbana" },
        { value: "rural", text: "Rural" },
      ],
    })
  );
  // Nivel educativo
  personalInfo.appendChild(
    createSelectForm({
      id: "education-level",
      label: "Nivel educativo",
      options: [
        { value: "", text: "Seleccione" },
        { value: "basico", text: "Básico" },
        { value: "medio", text: "Medio" },
        { value: "superior", text: "Superior" },
      ],
    })
  );
  // Situacion ocupacional
  personalInfo.appendChild(
    createSelectForm({
      id: "occupation-situation",
      label: "Situación ocupacional",
      options: [
        { value: "", text: "Seleccione" },
        { value: "estudiante", text: "Estudiante" },
        { value: "trabajando", text: "Trabajando" },
        { value: "desempleado", text: "Desempleado" },
      ],
    })
  );

  // Crear seccion del formulario para informacion de accesibilidad
  const accessibilityInfo = document.createElement("div");
  accessibilityInfo.classList.add("accessibility-user-register-form-accessibility-info");
  // Tiene alguna discapacidad
  accessibilityInfo.appendChild(
    createSelectForm({
      id: "disability",
      label: "¿Tiene alguna capacidad diversa?",
      options: [
        { value: "", text: "Seleccione" },
        { value: "si", text: "Sí" },
        { value: "no", text: "No" },
      ],
    })
  );
  // Tipo de discapacidad
  accessibilityInfo.appendChild(
    createSelectForm({
      id: "disability-type",
      label: "Tipo de capacidsad diversa",
      options: [
        { value: "", text: "Seleccione" },
        { value: "visual", text: "Visual" },
        { value: "auditiva", text: "Auditiva" },
        { value: "motora", text: "Motora" },
        { value: "intelectual", text: "Intelectual" },
      ],
    })
  );
  // nivel de discapacidad
  accessibilityInfo.appendChild(
    createSelectForm({
      id: "disability-level",
      label: "Nivel de capacidad diversa",
      options: [
        { value: "", text: "Seleccione" },
        { value: "leve", text: "Leve" },
        { value: "moderada", text: "Moderada" },
        { value: "grave", text: "Grave" },
      ],
    })
  );

  // Agregamos los collapses al formulario
  form.appendChild(
    createCollapse({
      id: "register-collapse",
      title: "Información Personal Básica",
      content: personalInfo,
      visible: true,
    })
  );
  form.appendChild(
    createCollapse({
      id: "register-collapse2",
      title: "Información de Accesibilidad",
      content: accessibilityInfo,
      visible: true,
    })
  );

  // Agregamos el boton de registro
  const button = document.createElement("div");
  button.innerHTML = `
    <button id="register-button" class="accessibility-button-theme">
      <span style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <span>Guardar y continuar</span> 
        <span>
          ${DynamicIcon({
            icon: "right",
          })}
        </span>
      </span>
    </button>
  `;
  // Onclick para el boton de registro
  const registerButton = button.querySelector("#register-button");
  registerButton.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
  });

  // Funcion onlcick para el editar la imagen de perfil
  const editButton = register.querySelector(".accessibility-user-button-edit-img");
  editButton.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    switchView("accessibility-user-image-view"); // Cambiar a la vista de imagen de usuario
  });

  form.appendChild(button);
  content.appendChild(form);

  return register;
}

// Crea la vista para caragar la imagen del perfil del usuario
export function userImageView() {
  const userImage = document.createElement("div");
  userImage.id = "accessibility-user-image-view";
  userImage.classList.add("accessibility-custom-scroll", "accessibility-view", "hidden");
  userImage.setAttribute("aria-hidden", "true");
  userImage.innerHTML = `
    <div class="accessibility-user-view-content">
      <div class="accessibility-user-view-header">
      </div>
      <div class="accessibility-user-image-view-content">
        <div class="accessibility-user-image-view-content-text">
          <h2 class="accessibility-user-image-view-title">Tu imagen es nuestro foco</h2>
          <p>Agrega una foto de perfil</p>
        </div>
        <div class="accessibility-user-image-view-form" >
        </div>
      </div>
    </div>
  `;

  // Creación del botón "atrás"
  const buttonBack = createButton("back", "", () => switchView("accessibility-user-register-view"));
  buttonBack.classList.add("accessibility-circle-button");
  buttonBack.innerHTML = `${DynamicIcon({ icon: "left" })}`; // Icono de flecha hacia atrás

  // Creación del título
  const title = document.createElement("p");
  title.classList.add("accessibility-title-card-text");
  title.innerHTML = "Registrarme"; // Texto del título

  // Creación del botón "home"
  const buttonHome = createButton("home", "", () => switchView("view-initial"));
  buttonHome.classList.add("accessibility-home-button");
  buttonHome.innerHTML = `${DynamicIcon({ icon: "home" })}`; // Icono de flecha hacia atrás

  // Creacion del contenedor izquierdo (con el botón de retroceso)
  const contentLeft = document.createElement("div");
  contentLeft.classList.add("accessibility-user-view-header-left");

  // Creacion del contenedor derecho (con el botón de home)
  const contentRight = document.createElement("div");
  contentRight.classList.add("accessibility-user-view-header-right");

  // Agrega el botón "atrás" y el título al contenedor izquierdo
  contentLeft.appendChild(buttonBack);
  contentLeft.appendChild(title);

  // Agrega el botón "home" al contenedor derecho
  contentRight.appendChild(buttonHome);

  // Agregar los contenendores al header
  const header = userImage.querySelector(".accessibility-user-view-header");
  header.appendChild(contentLeft);
  header.appendChild(contentRight);

  // Creacion del formulario de carga de imagen
  const content = userImage.querySelector(".accessibility-user-image-view-form");
  content.appendChild(
    createInputFileForm({
      id: "user-image",
      accept: "image/*",
    })
  );
  // Creacion del boton de continuar
  const button = document.createElement("div");
  button.innerHTML = `
    <button id="user-image-button" class="accessibility-button-theme" disabled>
      <span style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <span>Confirmar</span> 
        <span>
          ${DynamicIcon({
            icon: "right",
          })}
        </span>
      </span>
    </button>
  `;

  // Onclick para el boton de registro
  button.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    switchView("accessibility-user-terms-view"); // Cambiar a la vista de terminos y condiciones
  });

  content.appendChild(button);

  return userImage;
}
