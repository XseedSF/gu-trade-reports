const webpack = require("webpack");

const config = {
  devtool: "#source-map",
  entry: ["webpack-hot-middleware/client?reload=true"],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

module.exports = config;
