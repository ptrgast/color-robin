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
