import { analyzeImage } from '../index';
import { createColorPalette } from './Palette';


export function createExample(imageUrl: string) {
    const container = document.createElement("div");
    container.classList.add("example");

    const image = document.createElement("img");
    image.src = imageUrl;
    container.appendChild(image);

    // Analyze the image

    analyzeImage(image).then((histogram) => {
        const imageColors = histogram.getColors(5);
        container.appendChild(createColorPalette("Extracted colors", imageColors));
    });

    return container;
}