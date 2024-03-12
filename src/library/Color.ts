export class Color {

    red: number;
    green: number;
    blue: number;
    alpha: number;

    constructor(red: number = 0, green: number = 0, blue: number = 0, alpha: number = 255) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    getLightness() {
        return (this.red / 255 + this.green / 255 + this.blue / 255) / 3;
    }

    isLight() {
        return this.getLightness() > 0.5;
    }

    isDark() {
        return !this.isLight();
    }

    compareLightness(to: Color) {
        return to.getLightness() - this.getLightness();
    }

    isLighterThan(to: Color) {
        return this.compareLightness(to) < 0;
    }

    isDarkerThan(to: Color) {
        return this.compareLightness(to) >= 0;
    }

    toRGB() {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }

}