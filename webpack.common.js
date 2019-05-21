const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: ["@babel/polyfill",
        './src/index.js',
        './src/assets/scss/main.scss'
    ],
    output: {
        publicPath: "",
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
    },
    module: {
        rules: [{
                test: /.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
            },
            {
                test: /\.(png|svg|jpg|gif|svg)$/,
                use: [
                    'file-loader?name=images/render/[name].[ext]'
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({               
            filename: "css/[name].css"
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            hash: true,
            minify: {
              removeAttributeQuotes: true,
              collapseWhitespace: true,
              html5: true,
              removeComments: true,
              removeEmptyAttributes: true,
              minifyCSS: true,
            },
          }),
    ]
}