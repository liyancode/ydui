/*-- webpack.config.dev.js --*/
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var path = require("path");
var SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
    devtool: 'cheap-eval-source-map',

    entry: SRC_DIR + "/app.js",
    output: {
        path: __dirname + "/dist",
        // publicPath: "/assets/",
        filename: "bundle.js"
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: SRC_DIR + "/index.html"
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ],

    module: {
        loaders: [
            {
                test: /\.css$/,
                //loader: 'style-loader!css-loader?modules'
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loader: 'css-loader!less-loader',
                options: {
                    modifyVars: {
                        '@icon-url': '"/font/antd"',
                    },
                },
            },
            {test: /\.(js|jsx)$/, loader: 'babel-loader'},
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            },
            // {
            // 	test: /\.(woff|ttf|woff2|eot)$/, loader: 'file-loader!url-loader'
            // },
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},  //添加
            {test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000"}, //添加
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"}, //添加
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml"} //添加
        ]
    },
    devServer: {
        port: 8889,
        contentBase: './dist',
        hot: true,
        proxy: {
            "/api/*":"http://localhost:9292",
            "/auth/**": "http://localhost:9292",
            "/assets/*":"http://localhost:9292",
        }
    }
}