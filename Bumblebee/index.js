const YAML = require('./yaml2json');
const handler = require('./handler');

console.log(handler(YAML('./test/test_Bumblebee/swagger/swagger.yaml')));

module.exports = {
  handler,
  yamlParser: YAML,
};
