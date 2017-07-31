const YAML = require('./yaml2json');
const handler = require('./handler');

// FIXME: json error
const res = handler(YAML('./test/test_Bumblebee/swagger/swagger.yaml'));
// console.dir((res));

module.exports = {
  handler,
  yamlParser: YAML,
};
