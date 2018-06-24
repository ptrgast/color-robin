(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./histogram":3}],2:[function(require,module,exports){
var ColorRobin = {}; 

ColorRobin.Analyzer = require("./analyzer");

ColorRobin.toRgbString = function (rgbArray)
{
    return "rgb("+
        rgbArray[0]+","+
        rgbArray[1]+","+
        rgbArray[2]+")";
}

window.ColorRobin = ColorRobin;

},{"./analyzer":1}],3:[function(require,module,exports){
var Map = require("./map");

module.exports = function () {

    this._tolerance = 100;
    
    this.create = function (pixels) 
    {
        var map = new Map();

        for (var i = 0; i < pixels.length; i++) {
            var pixel = pixels[i];
    
            var groupName = this._combineRGB(pixel, this._tolerance);
            var group = map.get(groupName);
            if (group != null) {
                group.total++;
                group.data.push(pixel);
            } else {
                group = { total: 1, data: [pixel] };
                map.set(groupName, group);
            }
        }

        // Sort the result
        var values = map.getValues();
        values.sort(this._sortMapByOccurences);

        return values;
    }

    /**
     * Set the color groups tolerance. Greater values mean that groups will accept wider range of colors thus the result will contain less colors.
     * @param {number} tolerance 
     */
    this.setTolerance = function(tolerance)
    {
        this._tolerance = tolerance;
    }

    this._combineRGB = function (pixel, groupFactor) 
    {
        var r = (pixel[0] / groupFactor | 0) * groupFactor;
        var g = (pixel[1] / groupFactor | 0) * groupFactor;
        var b = (pixel[2] / groupFactor | 0) * groupFactor;
        var combined = (((r << 8) + g) << 8) + b;
        return combined;
    }

    this._sortMapByOccurences = function (a, b)
    {
        return b.total - a.total;
    }

}
},{"./map":4}],4:[function(require,module,exports){
module.exports = function () {

    this._keys = [];
    this._values = [];

    this.set = function (key, value) {
        var index = this._keyIndex(key);
        if (index >= 0) {
            // found
            this._values[index] = value;
        } else {
            // not found
            this._keys.push(key);
            this._values.push(value);
        }
    }

    this.get = function (key) {
        var index = this._keyIndex(key);
        if (index >= 0) {
            // found
            return this._values[index];
        } else {
            // not found
            return null;
        }
    }

    this.getValues = function () {
        // return a copy of the values array
        return this._values.slice();
    }

    this._keyIndex = function (key) {
        for (var i = 0; i < this._keys.length; i++) {
            if (this._keys[i] == key) {
                return i;
            }
        }
        return -1;
    }

}
},{}]},{},[2]);
