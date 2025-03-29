import { createButton } from './buttons';
 
import { createInitialView, createCategoriesView, createCategoriesView1 } from './/features/views/categoryViews'

export function toggleMenu() {
  const menu = document.getElementById("accessibility-menu");
  menu.classList.toggle("hidden");
  menu.setAttribute("aria-hidden", menu.classList.contains("hidden"));
}

export function initWidget() {
  const widgetContainer = document.createElement("div");
  widgetContainer.id = "my-widget";
  widgetContainer.className = "widget-container";

  const accessibilityButton = createButton("accessibility-button", "", toggleMenu);

  const accessibilityMenu = document.createElement("div");
  accessibilityMenu.id = "accessibility-menu";
  accessibilityMenu.classList.add("hidden");
  accessibilityMenu.setAttribute("role", "dialog");

  const closeButton = createButton("close-menu", "❌ Cerrar", toggleMenu);
  accessibilityMenu.appendChild(closeButton);

  // Vistas y categorías
  const initialView = createInitialView();
  const categoriesView = createCategoriesView();
  const categoriesView1 = createCategoriesView1();

  // Agregar vistas al menú
  accessibilityMenu.append(initialView, categoriesView, categoriesView1);

  widgetContainer.append(accessibilityButton, accessibilityMenu);
  document.body.appendChild(widgetContainer);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      accessibilityMenu.classList.add("hidden");
      accessibilityMenu.setAttribute("aria-hidden", "true");
    }
  });
}