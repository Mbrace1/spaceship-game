var path = require( 'path' );
module.exports = {
    mode: 'development',
    entry: "./js/index.js",
    devtool: 'inline-source-map',
    output: {
        filename: "./js/bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
};