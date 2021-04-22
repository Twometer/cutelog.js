'use strict';

const chalk = require('chalk')

let config = {
    info: {name: 'info', formatter: chalk.blue},
    okay: {name: 'okay', formatter: chalk.green},
    warn: {name: 'warn', formatter: chalk.yellow},
    error: {name: 'error', formatter: chalk.red}
}

function log(level, message) {
    if (!level) {
        level = config.info;
    }

    let tag = level.formatter(level.name);
    let indent = level.name.length === 5 ? '' : ' ';
    console.log(` ${tag}${indent} ${message}`);
}

function configure(levelName, formatter) {
    if (levelName.length > 5) {
        throw Error('Log names should not be longer than 5 characters');
    }

    config[levelName] = {name: levelName, formatter};
}

function custom(levelName, message) {
    log(config[levelName], message);
}

function factory(levelName) {
    return message => custom(levelName, message);
}

module.exports = {
    info: factory('info'),
    okay: factory('okay'),
    warn: factory('warn'),
    error: factory('error'),
    configure,
    custom
}