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