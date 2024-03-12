import { Color } from "../library/Color";


export function createColorBlob(color: Color) {
    const container = document.createElement("div");    
    container.classList.add("color-blob");
    const label = document.createElement("span");
    label.classList.add("color-blob__label");
    container.appendChild(label);
    if (color.isLight()) {
        label.textContent = "Light";
        container.classList.add("color-blob--light");
    } else {
        label.textContent = "Dark";
        container.classList.add("color-blob--dark");
    }
    container.style.backgroundColor = color.toRGB();
    return container;
}