const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['./src/base/pc.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                use: [
          {loader: 'style-loader', options: {insertAt: 'bottom'}},
          {loader: 'css-loader', options: {importLoaders: 1}},
                    {loader: 'postcss-loader', options: {
                        plugins: () => {
                            return [
                                require('autoprefixer'), // 添加前缀
                // require('cssnano') // css 中的 Uglify
                            ];
                        }
                    }}
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: { loader: 'url-loader', options: { limit: 100000 } }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {loader: 'babel-loader', options: {
                    presets: ['es2015']
                }}
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ]
};
