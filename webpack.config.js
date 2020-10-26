const path = require("path")
module.exports = {
  entry: [
    "./js/utill.js",
    "./js/makePin.js",
    "./js/active-map.js",
    "./js/move-pin.js",
    "./js/validate-form.js",
    "./js/cards.js",
    "./js/load.js",
    "./js/upload.js",
    "./js/similar-offer.js"
  ],
  output : {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
