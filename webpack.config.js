const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/front/index.js"
  , mode: "development"
  , module: {
    rules: [
      {
        test: /\.(js|jsx)$/
        , exclude: /(node_modules|bower_components)/
        , loader: "babel-loader"
        , options: { presets: ["@babel/env"] }
      }
      , {
        test: /\.css$/
        , use: [
          "style-loader"
          , "css-loader"
        ]
      }
    ]
  }
  , resolve: { extensions: ["*", ".js", ".jsx"] }
  , output: {
    path: path.resolve(__dirname, "dist/")
    , publicPath: "/dist/"
    , filename: "bundle.js"
  }
  , devServer: {
    contentBase: path.join(__dirname, "public/")
    , port: 8080
    , publicPath: "http://localhost:3000/"
    , hotOnly: true
    , historyApiFallback: true
  }
  , plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'BASE_URL': "`http://127.0.0.1:3000/`"
      }
    })
  ]

};