const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";
module.exports = {
  entry: ["@babel/polyfill", "./src/index.js", "./src/assets/scss/main.scss"],
  // devtool: "cheap-module-eval-source-map",
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    runtimeChunk: "single",
    moduleIds: 'hashed',
    chunkIds: 'named',
    removeAvailableModules: true,
    mergeDuplicateChunks: true,
    removeEmptyChunks: true,
    // splitChunks: {
    //   chunks: "all",
    //   maxInitialRequests: Infinity,
    //   minSize: 0,
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name(module) {
    //         const packageName = module.context.match(
    //           /[\\/]node_modules[\\/](.*?)([\\/]|$)/
    //         )[1];
    //         return `${packageName.replace("@", "")}`;
    //       }
    //     }
    //   }
    // }
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-router-dom|react-dom)[\\/]/,
          name: "react",
          chunks: "all",
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        loader: "babel-loader",
        exclude: [/node_modules/]
      },
      {
        test: /\.(png|svg|jpg|gif|svg)$/,
        use: ["file-loader?name=images/render/[name].[ext]"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? "css/[name].css" : "css/[name].[hash].css",
      chunkFilename: devMode ? "css/[id].css" : "css/[id].[hash].css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
      hash: true,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        removeComments: true,
        removeEmptyAttributes: true,
        minifyCSS: true
      }
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: "sha256",
      hashDigest: "hex",
      hashDigestLength: 20
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: "service-worker.js",
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/\.(?:png|jpg|jpeg|svg|js|css)$/],
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "images",
            expiration: {
              maxEntries: 12
            }
          }
        },
        {
          urlPattern: /js$/,
          handler: "CacheFirst",
          options: {
            cacheName: "javascripts",
            expiration: {
              maxEntries: 10
            }
          }
        },
        {
          urlPattern: /css$/,
          handler: "CacheFirst",
          options: {
            cacheName: "css",
            expiration: {
              maxEntries: 1
            }
          }
        }
      ]
    })
  ],
  devServer: {
    hot: true,
    historyApiFallback: true
  }
};
