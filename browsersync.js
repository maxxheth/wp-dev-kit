/* global require, setInterval */
/* eslint-disable */

const browsersync = require('browser-sync').create();

const reload = browsersync.reload;

const onChangePaths = [

    {
        fileDir: '*.php', 
        event: 'change'
    },
    {
        fileDir: './**/*.php',
        event: 'change'
    },
    {
        fileDir: './**/**/*.php',
        event: 'change'
    },
    {
        fileDir: './**/**/**/*.php',
        event: 'change'
    },
    {
        fileDir: './assets/js/dist/*.js',
        event: 'change'
    },
    {
        fileDir: './assets/scss/dist/*.css',
        event: 'change'
    },


];

// browsersync.watch('./assets/scss/dist/*.css').on('change', reload);

const fileDirNegCheck = (fileDir = '/', pathname = 'pathname') => fileDir !== `./${pathname}/` && `/${pathname}/` && fileDir !== `/${pathname}` && fileDir !== `./${pathname}/`; 

onChangePaths.forEach(pathObj => {

    const {
        fileDir,
        event
    } = pathObj;

    if (fileDirNegCheck(fileDir, 'vendor') && fileDirNegCheck(fileDir,'node_modules'))

        browsersync.watch(fileDir).on(event, reload);

});

browsersync.init({

    namespace: function (namespace) {

        return 'localhost:3000' + namespace;

    },

    injectChanges: false,

});