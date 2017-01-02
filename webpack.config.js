var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './src/index' // Your appʼs entry point
    ],
    output: {
        filename: "bundle.js",
        path: __dirname + "/build"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loaders: [ 'react-hot', "awesome-typescript-loader" ] }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            {
                context: 'node_modules/jquery/dist/',
                from: {
                    glob: 'jquery.min.*'
                },
                to: 'assets/jquery'
            },
            {
                context: 'node_modules/react/dist/',
                from: 'react.js',
                to: 'assets/react'
            },
            {
                context: 'node_modules/react-dom/dist/',
                from: 'react-dom.js',
                to: 'assets/react-dom'
            },
            {
                from: 'public'
            }

        ])
    ],


    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        // "react": "React",
        // "react-dom": "ReactDOM",
        "jquery": "$"
    },
};