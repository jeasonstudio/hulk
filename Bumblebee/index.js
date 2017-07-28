const YAML = require('./yaml2json');
const handler = require('./handler');

module.exports = {
  handler,
  yamlParser: YAML,
};

// console.log(YAML('../test/test_Bumblebee/swagger/swagger.yaml'));
