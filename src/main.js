'use strict';

const chalk = require('chalk')

const MAX_NAME_LENGTH = 5;
const MIN_NAME_LENGTH = 1;

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
    let indent = ' '.repeat(MAX_NAME_LENGTH - level.name.length);
    console.log(` ${tag}${indent} ${message}`);
}

function configure(levelName, formatter) {
    if (levelName.length > MAX_NAME_LENGTH) {
        throw Error('Log names should not be longer than 5 characters');
    }
    if (levelName.length < MIN_NAME_LENGTH) {
        throw Error('Log names should be at least one character long');
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