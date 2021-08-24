import { Map } from "./map";

export function Histogram() {

    this._tolerance = 100;
    
    this.create = function (pixels) 
    {
        let map = new Map();

        for (let i = 0; i < pixels.length; i++) {
            let pixel = pixels[i];
    
            let groupName = this._combineRGB(pixel, this._tolerance);
            let group = map.get(groupName);
            if (group != null) {
                group.total++;
                group.data.push(pixel);
            } else {
                group = { total: 1, data: [pixel] };
                map.set(groupName, group);
            }
        }

        // Sort the result
        let values = map.getValues();
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
        let r = (pixel[0] / groupFactor | 0) * groupFactor;
        let g = (pixel[1] / groupFactor | 0) * groupFactor;
        let b = (pixel[2] / groupFactor | 0) * groupFactor;
        let combined = (((r << 8) + g) << 8) + b;
        return combined;
    }

    this._sortMapByOccurences = function (a, b)
    {
        return b.total - a.total;
    }

}