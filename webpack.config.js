const path = require("path");

module.exports = {
    devtool: "inline-source-map",
    entry: path.join(__dirname + "/public/js/index.js"),
    output: {
        path: path.join(__dirname, "/public/js"),
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "babel",
            exclude: /node_modules/
        }]
    }
};
