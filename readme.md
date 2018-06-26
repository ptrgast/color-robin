# What is color-robin?

It is a small library meant **for the browser** that uses `<canvas>` to extract the most used colors in an image.

# Installation

```
npm install color-robin
```

# Usage

First of all you must load the library in your page.

```
<script src="path/to/color-robin.min.js"></script>
```

Then you can call `analyze()` to analyze images.

```
// Create an instance of the analyzer
var colorRobin = new ColorRobin.Analyzer();

// Get an image (must be already loaded)
var image = ...;

// Analyze the image and print the results
var colors = colorRobin.analyze(image);
console.log(colors);
```