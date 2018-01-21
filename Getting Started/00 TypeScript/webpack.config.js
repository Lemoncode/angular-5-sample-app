const path = require('path');

module.exports = {
    context: path.join(__dirname, 'src'),
    resolve: {
        extensions: ['.js', '.ts']
    },
    entry: './main.ts',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    }
};