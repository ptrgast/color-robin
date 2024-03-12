import { Color } from "./Color";


export class ColorBucket {

    totalColors: number;
    colors: Array<Color> = [];
    frequency: number = 0;
    relativeFrequency: number = 0;
    averageColor: Color = new Color();

    constructor(totalColors: number) {
        this.totalColors = totalColors;
    }

    push(color: Color) {
        this.colors.push(color);
    }
    
    close() {
        this.frequency = this.colors.length;
        this.relativeFrequency = this.colors.length / this.totalColors;        
        this.averageColor = this.getAverage();
    }

    private getAverage(): Color {
        let red = 0;
        let green = 0;
        let blue = 0;
        
        for (const color of this.colors) {
            red += color.red;
            green += color.green;
            blue += color.blue;
        }

        return new Color(
            red / this.colors.length | 0, 
            green / this.colors.length | 0, 
            blue / this.colors.length | 0
        );
    }

}