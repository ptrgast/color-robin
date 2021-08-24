module.exports = {
    entry: "./src/color-robin.js",
    output: {
        publicPath: "",
        filename: "color-robin.js",
        library: {
            name: "ColorRobin",
            type: 'umd',
            export: "default"
        },
    }    
}