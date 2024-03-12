import { Thumbnail } from "./Thumbnail";
import { Color } from "./Color";
import { ColorBucket } from "./ColorBucket";
import { ColorArray } from "./ColorArray";


export class Histogram {

    private buckets: Array<ColorBucket>;

    constructor(thumbnail: Thumbnail, maxClasses: number) {
        // Bucket and count colors
        const bucketsMap = new Map();
        for (const color of thumbnail.getData()) {
            const colorClass = this.classify(color, maxClasses);

            if (!bucketsMap.has(colorClass)) {
                bucketsMap.set(colorClass, new ColorBucket(thumbnail.getData().length));
            }
            bucketsMap.get(colorClass).push(color);
        }
        this.buckets = Array.from(bucketsMap.values());
        this.buckets.forEach((bucket: ColorBucket) => bucket.close());

        // Sort buckets by frequency
        this.buckets.sort((a: ColorBucket, b: ColorBucket) => b.frequency - a.frequency)    
    }

    getColors(max?: number): ColorArray {
        const result = new ColorArray();
        const buckets = max ? this.buckets.slice(0, max) : this.buckets;
        for (const bucket of buckets) {
            result.push(bucket.averageColor);
        }
        return result;
    }

    private classify(pixel: Color, maxClasses: number) {
        const classWidth = 255 / maxClasses;
        const red = pixel.red / classWidth | 0;
        const green = pixel.green / classWidth | 0;
        const blue = pixel.blue / classWidth | 0;
        const colorClass = (((red << 8) + green) << 8) + blue;
        return colorClass;
    }

}
