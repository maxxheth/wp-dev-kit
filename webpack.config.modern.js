/* eslint-disable */

const path = require('path');

const autoprefixer = require('autoprefixer');

module.exports = () => {

const config = {
    entry: {
        main: "./assets/js/src/main.js",
        style: "./assets/scss/src/style.scss",
        admin: "./assets/js/src/admin.js",
        'admin-style': "./assets/scss/src/admin.scss",
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [

                    {
                        loader: 'file-loader',
                        options: {
                            name: '../../scss/dist/[name].css',
                        },
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => [autoprefixer()]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {

                            sourceMap: true,

                            implementation: require('sass'),

                            sassOptions: {

                                includePaths: ['./node_modules'],

                            },

                            webpackImporter: true,

                        },
                    }
                ],
            },
            {
                test: /\.js$/,
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: {
                                        esmodules: true
                                    }
                                }]
                            ],
                            plugins: [
                                ['@babel/plugin-transform-runtime', {
                                    useESModules: true
                                }]
                            ],

                            cacheDirectory: true
                        }

                    }
                ]
            }
        ],

    },
    output: {
        filename: '[name].modern.js',
        path: path.resolve(__dirname, './assets/js/dist')
    }

};

switch(process.env.NODE_ENV) {
    case 'production': 
        return config;
    case 'development':
        config.devtool = 'inline-cheap-source-map';
        config.watch = true;
        return config;
} 

};