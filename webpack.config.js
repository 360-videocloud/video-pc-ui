const path = require('path');
// const webpack = require('webpack');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'control.js'
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            helper: path.resolve(__dirname, './src/helper'),
            control: path.resolve(__dirname, './src/control')
        },
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
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: './.babel-cache'
                    }
                }
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader'                     
                }
            }
        ]
    },

    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true
        // })
    ]
};
