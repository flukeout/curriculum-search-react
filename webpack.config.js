module.exports = {
  entry: "./js/activity-search.js",
  output: {
    path: __dirname,
    filename: "./js/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel', // 'babel-loader' is also a valid name to reference
        query: {
          presets: ['es2015','react']
        }
      }
    ]
  }
}
