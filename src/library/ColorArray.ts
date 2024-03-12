import { Color } from "./Color";

export class ColorArray {

    colors: Array<Color>;

    constructor(colors = []) {
        this.colors = colors;
    }

    push(color: Color) {
        this.colors.push(color);
    }

    getLightest(): Color|undefined {
        if (this.colors.length == 0) {
            return;
        }

        let result = this.colors[0];
        for(const color of this.colors) {
            if (color.isLighterThan(result)) {
                result = color;
            }
        }

        return result;
    }

    getDarkest(): Color | undefined {
        if (this.colors.length == 0) {
            return;
        }

        let result = this.colors[0];
        for (const color of this.colors) {
            if (color.isDarkerThan(result)) {
                result = color;
            }
        }

        return result;
    }

    getAverage(): Color {
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

    // Make object iterable
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                return {
                    value: this.colors[index++],
                    done: index > this.colors.length
                };
            }
        };
    }

}