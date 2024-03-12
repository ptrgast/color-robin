import { ColorArray } from "../library/ColorArray";
import { createColorBlob } from "./ColorBlob";


export function createColorPalette(title: string, colors: ColorArray) {
    const container = document.createElement("div");
    container.classList.add("color-palette");
    container.innerHTML = `<h3>${title}</h3>`;

    for (const color of colors) {
        container.appendChild(createColorBlob(color));
    }

    return container;
}