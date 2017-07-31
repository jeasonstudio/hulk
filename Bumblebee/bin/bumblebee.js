#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require('fs');

const pack = require('../package.json');

const handler = require('../handler');
const YAML = require('../yaml2json');

function loadJsonFile(pathname) {
  let bin = fs.readFileSync(pathname);
  if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
    bin = bin.slice(3);
  }
  return bin.toString('utf-8');
}

program
  .version(pack.version)
  .description('@mi/Bumblebee: A node script for Hulk.')
  .usage('[options] <file ...>')
  .option('-S, --source <file>', 'Your swagger config file')
  .option('-T, --target <file>', 'Your Hulk config: .huckrc.js', `${process.cwd()}/.hulkrc.js`)
  .parse(process.argv);

module.exports.hulkrcLocation = program.target;

const ORIGN_DATA = fs.readFileSync(path.join(__dirname, '../templates/main.template'), 'utf8');
fs.writeFileSync(program.target, ORIGN_DATA);

if (program.source && program.target) {
  console.log('Loading file...');

  const swaggerObject = /\.yaml$/.test(program.source) ?
    YAML(program.source) :
    JSON.parse(loadJsonFile(program.source));

  handler(swaggerObject, program.target);
}
