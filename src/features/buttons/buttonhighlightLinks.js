/*Función para resaltar los enlaces de la página.
 */
export function highlightLinks() {
  const links = document.querySelectorAll("a");
  links.forEach(link => {
    link.classList.toggle("highlight");
  });

  // Agrega el estilo solo una vez
  if (!document.getElementById("highlight-links-style")) {
    const styleTag = document.createElement("style");
    styleTag.id = "highlight-links-style";
    styleTag.innerHTML = `
      a.highlight {
        position: relative;
        color: #d97706 !important;
        background-color: rgba(255, 243, 191, 0.5);
        padding: 2px 4px;
        border-radius: 20px;
        transition: background-color 0.4s ease, color 0.4s ease;
        animation: linkFadeIn 0.4s ease;
      }

      @keyframes linkFadeIn {
        from {
          background-color: transparent;
          color: inherit;
          opacity: 0.5;
        }
        to {
          background-color: rgba(255, 243, 191, 0.5);
          color: #d97706;
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(styleTag);
  }
}
