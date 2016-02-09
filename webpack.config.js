module.exports = {
  entry: "./src/frontend/App.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      {
        exclude: /(node_modules)/,
        loader: 'babel'
      }
    ]
  }
};