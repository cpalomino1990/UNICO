// Funcion para cambiar el tema del widget
export function ChangeTheme() {
  const theme = document.documentElement.getAttribute("data-theme");
  document.documentElement.setAttribute("data-theme", theme === "blue" ? "purple" : "blue");

  // Cambiar el color del logo
  const logo = document.querySelector("#accessibility-header-logo img");
  const logoSrc = logo.getAttribute("src");
  logo.setAttribute(
    "src",
    logoSrc.includes("Blue") ? logoSrc.replace("Blue", "Purple") : logoSrc.replace("Purple", "Blue")
  );

  // Cambiar el color de los iconos de las cards de la vista inicial
  const icons = document.querySelectorAll(".accessibility-card-button-icon");
  icons.forEach((div) => {
    const img = div.querySelector("img");
    const src = img.getAttribute("src");
    img.setAttribute("src", src.includes("Blue") ? src.replace("Blue", "Purple") : src.replace("Purple", "Blue"));
  });
}