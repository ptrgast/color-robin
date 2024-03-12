import { Color } from "./Color";


export class Thumbnail {

    private canvas: HTMLCanvasElement = document.createElement("canvas");
    private data: Array<Color> = [];

    constructor(image: HTMLImageElement, resolution: number = 20) {
        // Create thumbnail
        this.canvas.width = resolution;
        this.canvas.height = resolution;   
        const context = this.canvas.getContext('2d'); 
        if (!context) {
            throw new Error("Failed to get 2D context!");
        }        
        context.fillStyle = 'red';
        context.drawImage(image, 0, 0, resolution, resolution);
        
        // Get thumbnail raw data (bytes)
        const rawData = context.getImageData(0, 0, this.canvas.width, this.canvas.height);

        // Convert to pixels
        for (let i = 0; i < rawData.data.length; i += 4) {
            const pixel = new Color(
                rawData.data[i],
                rawData.data[i + 1],
                rawData.data[i + 2],
                rawData.data[i + 3]
            )
            this.data.push(pixel);
        }

    }

    getData(): Array<Color> {
        return this.data;
    }

}