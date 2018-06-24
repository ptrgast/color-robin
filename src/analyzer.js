var Histogram = require("./histogram");

module.exports = function () {

    this._resolution = 20;

    // init canvas
    this._canvas = document.createElement("canvas");
    this._canvas.width = this._resolution;
    this._canvas.height = this._resolution;

    this.analyze = function (image, tolerance) {
        var pixels = this._groupToPixels(this._getImageData(image));

        // Init histogram
        var histogram = new Histogram();
        if (tolerance != null) {
            histogram.setTolerance(tolerance);
        }

        var results = histogram.create(pixels);
        // console.log(results);

        var output = [];
        for (var i = 0; i < results.length; i++) {
            var item = {
                importance: results[i].total,
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
        var context = this._canvas.getContext('2d');
        context.fillStyle = 'red';
        context.drawImage(image, 0, 0, this._resolution, this._resolution);
        imageData = context.getImageData(0, 0, this._canvas.width, this._canvas.height);

        return imageData;
    }

    this._groupToPixels = function (imageData) {
        var pixels = [];
        for (var i = 0; i < imageData.data.length; i += 4) {
            var pixel = [
                imageData.data[i],
                imageData.data[i + 1],
                imageData.data[i + 2],
            ]
            pixels.push(pixel);
        }

        return pixels;
    }

    this._averageColor = function (colorsArray) {
        var r = 0;
        var g = 0;
        var b = 0;

        for (var i = 0; i < colorsArray.length; i++) {
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
