const path = require("path");

module.exports = {
    devtool: "inline-source-map",
    entry: {
        movements: path.join(__dirname + "/public/js/movements.js"),
        business: path.join(__dirname + "/public/js/business.js")
    },
    output: {
        path: path.join(__dirname, "/public/js"),
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "babel",
            exclude: /node_modules/
        }]
    }
};
