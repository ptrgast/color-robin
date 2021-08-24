import { Analyzer } from "./analyzer.js"

let ColorRobin = {

    Analyzer,

    toRgbString: function(rgbArray)
    {
        return "rgb("+
            rgbArray[0]+","+
            rgbArray[1]+","+
            rgbArray[2]+")";
    }
        
};

export default ColorRobin;