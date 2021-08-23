module.exports = {
  devServer: {
    proxy: {
      '/re': {
        target: 'http://localhost:5000',
        pathRewrite: {
          '^/re': ''
        }
      }
    }
  }
}
