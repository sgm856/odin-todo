const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
    ],
    module: {
    rules: [
        {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
        },
        {
            test: /\.js$/,
            exclude: [
                /node_modules/,
                /\.test.js%/,
                /\.spec.js%/,
                /__tests__/
            ]
        }
        ],
    },
    watchOptions: { ignored: /node_modules/ },
};