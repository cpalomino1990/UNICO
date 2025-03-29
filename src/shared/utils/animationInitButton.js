import { host } from "../constants/enviroments";
import "../styles/AccesibilityButton.css";

const getStyles = () => {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"; // Ruta del css de swiper
  document.head.appendChild(link);
};

const loadSwiperScript = (callback) => {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
  script.onload = callback;
  document.body.appendChild(script);
};

export const animationInitButton = () => {
  getStyles();
  const images = [
    `${host}/src/shared/assets/icons/iconsInitbutton/1-people.svg`,
    `${host}/src/shared/assets/icons/iconsInitbutton/2-brain.svg`,
    `${host}/src/shared/assets/icons/iconsInitbutton/3-arm.svg`,
    `${host}/src/shared/assets/icons/iconsInitbutton/4-glasses.svg`,
    `${host}/src/shared/assets/icons/iconsInitbutton/5-peoples.svg`,
    `${host}/src/shared/assets/icons/iconsInitbutton/6-hands.svg`,
  ];

  document.addEventListener("DOMContentLoaded", () => {
    const initButton = document.querySelector("#accessibility-button");
    if (initButton) {
      initButton.innerHTML = `
        <div class="line">
          <div class="internal">
            <div class="circle">  
              <div class="swiper mySwiper">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <img src="${images[0]}" />
                  </div>
                  <div class="swiper-slide">
                    <img src="${images[1]}" />
                  </div>
                  <div class="swiper-slide">
                    <img src="${images[2]}" />
                  </div>
                  <div class="swiper-slide">
                    <img src="${images[3]}" />
                  </div>
                  <div class="swiper-slide">
                    <img src="${images[4]}" />
                  </div>
                  <div class="swiper-slide">
                    <img src="${images[5]}" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      // Cargar y ejecutar Swiper después de que el script se haya cargado
      loadSwiperScript(() => {
        new Swiper(".mySwiper", {
          effect: "flip",
          grabCursor: false,
          loop: true,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },
        });
      });

      const img = initButton.querySelector("#imgInitButton");
      let currentIndex = 0;
      setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length; // Reinicia al llegar al final
        if (img) {
          img.src = images[currentIndex];
          img.alt = `Icon-${currentIndex + 1}`;
        }
      }, 4300); // Cambia la imagen cada 1 segundo (ajustable)
    }
  });
};
