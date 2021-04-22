'use strict';

const chalk = require('chalk')

let config = {
    info: {name: 'info', formatter: chalk.blue},
    okay: {name: 'okay', formatter: chalk.green},
    warn: {name: 'warn', formatter: chalk.yellow},
    error: {name: 'error', formatter: chalk.red}
}

function configure(level, name, formatter) {
    if (name.length > 5) {
        throw Error('Log names should not be longer than 5 characters');
    }

    config[level] = {name, formatter};
}

function log(level, message) {
    if (!level) {
        level = config.info;
    }

    let tag = level.formatter(level.name);
    let indent = level.name.length === 5 ? '' : ' ';
    console.log(` ${tag}${indent} ${message}`);
}

function custom(levelName, message) {
    log(config[levelName], message);
}

function factory(level) {
    return message => log(level, message);
}

module.exports = {
    info: factory(config.info),
    okay: factory(config.okay),
    warn: factory(config.warn),
    error: factory(config.error),
    configure,
    custom
}