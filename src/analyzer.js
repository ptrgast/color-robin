import { Histogram } from "./histogram";

export function Analyzer() {

    this._resolution = 20;

    // init canvas
    this._canvas = document.createElement("canvas");
    this._canvas.width = this._resolution;
    this._canvas.height = this._resolution;

    this.analyze = function (image, tolerance) {
        let pixels = this._groupToPixels(this._getImageData(image));

        // Init histogram
        let histogram = new Histogram();
        if (tolerance != null) {
            histogram.setTolerance(tolerance);
        }

        let results = histogram.create(pixels);
        // console.log(results);

        let output = [];
        for (let i = 0; i < results.length; i++) {
            let item = {
                occurrences: results[i].total,
                color: this._averageColor(results[i].data)
            }
            output.push(item);
        }

        return output;
    }

    this.setResolution = function(resolution) 
    {
        this._resolution = resolution;
        this._canvas.width = this._resolution;
        this._canvas.height = this._resolution;        
    }

    this._getImageData = function (image) {
        let context = this._canvas.getContext('2d');
        context.fillStyle = 'red';
        context.drawImage(image, 0, 0, this._resolution, this._resolution);
        let imageData = context.getImageData(0, 0, this._canvas.width, this._canvas.height);

        return imageData;
    }

    this._groupToPixels = function (imageData) {
        let pixels = [];
        for (let i = 0; i < imageData.data.length; i += 4) {
            let pixel = [
                imageData.data[i],
                imageData.data[i + 1],
                imageData.data[i + 2],
            ]
            pixels.push(pixel);
        }

        return pixels;
    }

    this._averageColor = function (colorsArray) {
        let r = 0;
        let g = 0;
        let b = 0;

        for (let i = 0; i < colorsArray.length; i++) {
            r += colorsArray[i][0];
            g += colorsArray[i][1];
            b += colorsArray[i][2];
        }

        r = r / colorsArray.length | 0;
        g = g / colorsArray.length | 0;
        b = b / colorsArray.length | 0;

        return [r, g, b];
    }

};
