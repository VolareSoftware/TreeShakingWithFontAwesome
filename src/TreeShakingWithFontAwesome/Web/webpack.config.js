const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = () => {   
    return {
        entry: {
            index: "index.js"
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "dist"),
            publicPath: "/dist"
        },
        devtool: "source-map",
        plugins: [
            new CleanWebpackPlugin(["dist"]),
            new webpack.optimize.CommonsChunkPlugin({
                name: "lib"
            }),
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    dead_code: true
                }
            })
        ],
        resolve: {
            extensions: [
                ".js"
            ],
            modules: [
                path.resolve(__dirname, "scripts"),
               "node_modules"
            ]
        },
        module: {
            rules: [
               {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["env"],
                            babelrc: false,
                            cacheDirectory: true,
                            plugins: [
                                "transform-runtime"]
                        }
                    }
                }
            ]
        }
    };
};