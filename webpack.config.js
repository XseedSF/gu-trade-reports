const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const config = {
  devtool: "#source-map",
  entry: ["webpack-hot-middleware/client?reload=true", "./app/index.js"],
  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: "/",
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "public/favicon.png",
      template: "public/index.html"
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  );
} else {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}

module.exports = config;
