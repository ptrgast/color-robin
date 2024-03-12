import { Thumbnail } from './library/Thumbnail';
import { Histogram } from './library/Histogram';


export function analyzeImage(image: HTMLImageElement, maxClasses: number = 2) {
    const result = new Promise<Histogram>((resolve) => {
        if (image.complete) {
            generateHistogram(image, resolve, maxClasses)();
        } else {
            image.addEventListener("load", generateHistogram(image, resolve,maxClasses));
        }
    });
    return result;
}

function generateHistogram(image: HTMLImageElement, resolve: any, maxClasses: number) {
    return () => {
        const thumbnail = new Thumbnail(image);
        const histogram = new Histogram(thumbnail, maxClasses);
        resolve(histogram);
    };
}
