export function createButton(id, text, onClick, isActivateable = false) {
    const button = document.createElement("button");
    button.id = id;
    button.textContent = text;
    button.classList.add("toggle-button");
  
    button.addEventListener("click", function () {
      if (id === "close-menu" || id === "back-to-menu" ) {
        onClick();
        return;
      }
  
      if (isActivateable) {
        this.classList.toggle("active");
      }
      updateCategoryButtons
      onClick();
    });
  
    return button;
  }
  
// Function to update category buttons (Visual, Auditory, etc.) 
 function updateCategoryButtons() {
    const categories = {
      "btn-visual": [
        "highlight-Important", "highlight-colors", "space-Text", "highlight-links", "toggle-animations", 
        "toggle-reading-bar", "read-text-aloud", "test-Size", "toggle-Zoon", "cursor-style","toggle-font"
      ],  
    };

    Object.entries(categories).forEach(([categoryButtonId, buttonIds]) => {
      const categoryButton = document.getElementById(categoryButtonId);
      const hasActiveButton = buttonIds.some((id) => document.getElementById(id)?.classList.contains("active"));

      if (hasActiveButton) {
        categoryButton.classList.add("active");
      } else {
        categoryButton.classList.remove("active");
      }
    });
  }


  export function createResetButton() {
    return createButton("reset-all", "🔄 Restablecer", () => {});
  }