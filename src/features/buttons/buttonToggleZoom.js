let textMagnifierActive = false;
let tooltip = null;

export function toggleTextMagnifier() {
    if (textMagnifierActive) {
        deactivateTextMagnifier();
    } else {
        activateTextMagnifier();
    }
}

function activateTextMagnifier() {
    tooltip = document.createElement("div");
    tooltip.id = "text-magnifier-tooltip";
    document.body.appendChild(tooltip);

    document.addEventListener("mouseover", showTooltip);
    document.addEventListener("mouseout", hideTooltip);

    textMagnifierActive = true;
}

function deactivateTextMagnifier() {
    if (tooltip) {
        tooltip.remove();
        tooltip = null;
    }

    document.removeEventListener("mouseover", showTooltip);
    document.removeEventListener("mouseout", hideTooltip);

    textMagnifierActive = false;
}

function showTooltip(event) {
    let target = event.target;

    if (target.tagName.match(/^(P|SPAN|H1|H2|H3|H4|H5|H6|A|BUTTON|B)$/)) {
        tooltip.textContent = target.textContent;
        tooltip.style.display = "block";

        document.addEventListener("mousemove", positionTooltip);
    }
}

function hideTooltip() {
    if (tooltip) {
        tooltip.style.display = "none";
        document.removeEventListener("mousemove", positionTooltip);
    }
}

function positionTooltip(event) {
    tooltip.style.left = event.pageX + 15 + "px";
    tooltip.style.top = event.pageY + 15 + "px";
}

// Agregar estilos al tooltip
const style = document.createElement("style");
style.innerHTML = `
  #text-magnifier-tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 12px;
    border-radius: 5px;
    font-size: 2em;
    display: none;
    pointer-events: none;
    z-index: 1000;
  }
`;
document.head.appendChild(style);
