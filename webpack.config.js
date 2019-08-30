const path = require("path")
const CopyPlugin = require('copy-webpack-plugin');
 
module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  // Entry point to my app
  entry: {
    index: path.resolve(__dirname, "src", "index.js"),
    topbar: path.resolve(__dirname, "src", "topbar.js")
  },
  // Where to output the build/compiled file
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "dist", "assets")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
    stats: "minimal",
    https: true
  },
  externals: {
    zendesk_app_framework_sdk: 'ZAFClient',
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  // files Needed for the zendesk app
  plugins: [
    new CopyPlugin([
      { from: 'manifest.json', to: path.resolve(__dirname, 'dist', 'manifest.json') },
      { from: 'requirements.json', to: path.resolve(__dirname, 'dist', 'requirements.json') },
      { from: 'src/assets', to: path.resolve(__dirname, 'dist', 'assets') },
    ]),
  ]
}
