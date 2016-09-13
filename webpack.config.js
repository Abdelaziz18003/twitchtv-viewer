var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: "./src/jsx/app.jsx",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["react", "es2015"]
                }
            }
        ]
    },
    output: {
        path: __dirname + "/dist/js/",
        filename: "app.js"
    }
}