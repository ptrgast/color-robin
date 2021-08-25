# What is color-robin?

It is a small library meant **for the browser** that uses `<canvas>` to extract the most used colors in an image.

<a href="https://projects.ptrgast.com/color-robin/">Live Example</a>

# Installation

```
npm install color-robin
```

# Usage

First of all you must load the library in your page.

```html
<script src="path/to/color-robin.js"></script>
```
or

```javascript
import ColorRobin from "color-robin";
```

Then you can call `analyze()` to analyze images.

```javascript
// Create an instance of the analyzer
var analyzer = new ColorRobin.Analyzer();

// Get an image (must be already loaded)
var image = ...;

// Analyze the image and print the results
var colors = analyzer.analyze(image);
console.log(colors);
```

Output example:

```json
[
    {
        "occurrences": 189,
        "color": [88, 84, 68]
    },
    {
        "occurrences": 148,
        "color": [192, 203, 214]
    },
    {
        "occurrences": 43,
        "color": [140, 159, 179]
    },
    {
        "occurrences": 20,
        "color": [121, 141, 157]
    }
]
```

For performance reasons the analyzer scans a resized version of the image. The default size of the image that will be scanned is 20x20 pixels but this can be changed by calling the `setResolution()` function of the analyzer before an analysis. For example:

```javascript
analyzer.setResolution(50); // This means that the scanned image will be 50x50
```
The derived images used for the analysis have always a 1:1 ratio. (Keeping the original aspect ratio of the input images could be a nice future improvement...)

The analyzer produces the final results by grouping together similar colors and counting the occurences of each color group. The total groups produced by the analyzer depend on the color variations of the input image, the analysis resolution as long as the color similarity `tolerance` used by the algorithm. Greater tolerance value means that more colors will fall under the same color group thus reducing the produced color groups.

To change the tolerance you can pass the required value in the `analyze()` function. For example:

```javascript
let tolerance = 200;
let colors = analyzer.analyze(image, tolerance);
```

If you plan to use the resulting colors to style elements then there is a convenient function that converts the color arrays to "rgb(r,g,b)" strings. For example:

```javascript
ColorRobin.toRgbString([255,255,0]);
```

will return:

```javascript
"rgb(255,255,0)"
```
