'use strict';

const log = require('../src/main');
const chalk = require('chalk');

log.info("An informative message");

log.okay("Yay, it worked!");

log.warn("Maybe you should look into this");

log.error("hrngh soup")

log.configure('test', 'test', chalk.keyword('orange'))
log.custom('test', "Custom formatter!");
