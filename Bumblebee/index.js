const YAML = require('./yaml2json');
const handler = require('./handler');

const path = require('path');
const fs = require('fs');

// FIXME: json error
const res = handler(YAML('./test/test_Bumblebee/swagger/swagger.yaml'));
// console.log(
//   fs.readFileSync(path.join(__dirname, '../test/test_Bumblebee/swagger/swagger.json', 'utf8')),
// );
// fs.readFile(path.join(__dirname, '../test/test_Bumblebee/swagger/swagger.json', 'utf8'), (err, data) => {
//   console.log(data);
//   console.log(path.join(__dirname, '../test/test_Bumblebee/swagger/swagger.json'));
// });


function readText(pathname) {
  let bin = fs.readFileSync(pathname);
  if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
    bin = bin.slice(3);
  }
  return bin.toString('utf-8');
}
console.log(typeof readText(path.join(__dirname, '../test/test_Bumblebee/swagger/swagger.json')));

module.exports = {
  handler,
  yamlParser: YAML,
};
