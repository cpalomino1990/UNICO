export function switchView(viewId) {
    document.querySelectorAll(".accessibility-view, .accessibility-view1,.main-menu").forEach((element) => {
      element.classList.add("hidden");
      element.setAttribute("aria-hidden", "true");
    });
  
    const activeView = document.getElementById(viewId);
    if (activeView) {
      activeView.classList.remove("hidden");
      activeView.setAttribute("aria-hidden", "false");
    }
  }