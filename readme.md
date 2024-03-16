# Welcome to color-robin

Color-robin is a small library for extracting the colors from an image. 
It is based on the canvas element and it requires the browser environment.

## 🚀 Getting started

### Installation

```
npm install color-robin
```

### Usage example

HTML

```html
<div>
    <img id="image1" src="image1.jpg" alt="..." />
</div>
```
JavaScript

```javascript
import { analyzeImage } from "color-robin";

const image1 = document.getElementById("image1");

analyzeImage(image1).then(histogram => {
    // Get the top 3 colors
    const colors = histogram.getColors(3);

    // Print colors in rgb() form
    for (const color of colors) {
        console.log(color.toRGB());
    }
});
```

## ❔ How it works

### Thumbnail
The first step of the process is to create a low resolution version of the image in order to speed up the analysis. The default resolution of the resized image is 20x20 pixels but this can be configured accordingly.

Note: The resized image has always a 1:1 ratio. Keeping the original aspect ratio of the input images could be a nice future improvement.

### Histogram

The next step after generating the thumbnail is the generation of the colors' histogram. The color space is divided into a number of buckets where each bucket represent a group of similar colors. Then the thumbnail is scanned and each pixel color is thrown into one of the buckets. The amount of colors in each bucket represent the usage of the specific color in the image.

## 📑 Reference

### Function analyzeImage(image, resolution, maxClasses)

This is the main function of the library. A wrapper of the whole process that given an image element it will:
- wait for the image to load, 
- generate a `Thumbnail` of the image, 
- generate a `Histogram` of the thumbnail
- and then return the histogram through a `Promise`.

| Argument | Type | Description |
|----------|------|-------------|
| image | HTMLImageElement | The image element to analyze. |
| resolution | number (default 20) | The resolution of the `Thumbnail` that will be created. This means that for the default value the thumbnail will be 20x20 pixels. |
| maxClasses | number (default 2) | This number represent the divisions of each color channel for creating the color buckets. The higher the number, the more buckets will be created but the result will be less diverse |

### Method Histogram.getColors(max)

This function returns a `ColorArray` which is an iterable object holding a collection of `Color` objects. The collection is ordered and the first color returned is the most frequent inside the image while the last one is the less frequent.

**Arguments**

| Argument | Type | Description |
|----------|------|-------------|
| max (optional) | number | Can be used to limit the amount of colors that will be returned, always starting from the most frequent color. |

**Returns**
| Type | Description |
|------|-------------|
| ColorArray | An iterable collection of `Color` objects ordered from the most frequent colors to the less ones. |

### Class Color

A class representing a color.

**Methods**

| Method | Description |
|--------|-------------|
| toRGB() | Return the color in rgb() form e.g. `rgb(255,0,0)` |
| getLightness() | Returns the lightness of the color (0 to 1). |
| isLight() | Return `true` if the color has more than 50% lightness. |
| isDark() | The opossite of `isLight()`. |
| isLighterThan(Color) | Returns `true` if the current color is lighter than the given one. |
| isDarkerThan(Color) | Returns `true` if the current color is darker than the given one. |
| compareLightness(Color) | A lightness comparison method that can be used for sorting colors. |


