#!/usr/bin/env node

const argsParser = require('../src/argument-parser');

(async () => {
    await argsParser.parse(process.argv.slice(2));
})();