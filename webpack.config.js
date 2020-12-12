/* eslint-disable */

const path = require('path');

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
                    }
                ]
            }
        ],

    },
    output: {
        path: path.resolve(__dirname, './assets/js/dist')
    }

};

const parseNodeEnv = config => {

    switch(process.env.NODE_ENV) {
        case 'production': 
            config.mode = 'production';
            break;
        case 'development':
            config.mode = 'development';
            config.devtool = 'inline-cheap-source-map';
            config.watch = true;
            break;
    } 

    return config;
};

const parseBrowserEnv = config => {

    switch(process.env.BROWSERSLIST_ENV) {
        case 'modern': 
            config.output.filename = '[name].modern.js';
            config.module.rules[1].use[0].options = null;
            config.module.rules[1].use[0].options =  {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: {
                                        esmodules: true
                                    }
                                }]
                            ]
            };
            break;
        case 'legacy':
            config.output.filename = '[name].legacy.js';
            config.module.rules[1].use[0].options = null;
            config.module.rules[1].use[0].options =  {
                            presets: [
                                ['@babel/preset-env', {
                                    useBuiltIns: 'usage',
                                    corejs: {
                                        version: 3,
                                        proposals: true
                                    }
                                }]
                            ]
            };
            break;
    } 

    return config;

};

const pipe = (...funcs) => target => funcs.reduce((result, func) => func(result), target);

const parseEnvs = pipe(parseNodeEnv, parseBrowserEnv);

return parseEnvs(config);

// const finalConfig = parseEnvs(config);

// console.log({options: finalConfig.module.rules[1].use[0].options.presets[0][1]});

// return finalConfig;

};