import { Thumbnail } from './library/Thumbnail';
import { Histogram } from './library/Histogram';


export function analyzeImage(image: HTMLImageElement, resolution: number = 20, maxClasses: number = 2) {
    const result = new Promise<Histogram>((resolve) => {
        if (image.complete) {
            generateHistogram(image, resolve, resolution, maxClasses)();
        } else {
            image.addEventListener("load", generateHistogram(image, resolve, resolution, maxClasses));
        }
    });
    return result;
}

function generateHistogram(image: HTMLImageElement, resolve: any, resolution: number, maxClasses: number) {
    return () => {
        const thumbnail = new Thumbnail(image, resolution);
        const histogram = new Histogram(thumbnail, maxClasses);
        resolve(histogram);
    };
}
