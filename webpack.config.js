const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    entry: {
        app: './src/boot.ts',
        vendors: [
            'es6-shim',
            'reflect-metadata',
            'rxjs', // Agresiv and stupid
            'zone.js/dist/zone-microtask',
            'zone.js/dist/long-stack-trace-zone',
            'angular2/platform/browser',
            'angular2/core',
            'angular2/http',
            'angular2/router'
        ]
    },
    output: {
        path: './src/',
        filename: 'one-file-to-rule-them-all.js'
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }],
        noParse: [/zone\.js\/dist\/.+/]
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    devServer: {
        port: 9000,
        inline: true,
        hot: true,
        historyApiFallback: true,
        contentBase: 'src'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', Infinity),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.DedupePlugin()
    ]
};
