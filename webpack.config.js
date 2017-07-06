module.exports = function(env) {
  const path = require("path");
  const HtmlWebpackPlugin = require("html-webpack-plugin");

  const config = {
    entry: ["./app/index.js"],
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

  const Merge = require("webpack-merge");
  const envConfig = require(`./webpack.${env}.js`);
  return Merge(config, envConfig);
};
