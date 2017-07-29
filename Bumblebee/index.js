const YAML = require('./yaml2json');
const handler = require('./handler');

const res = handler(YAML('./test/test_Bumblebee/swagger/swagger.yaml'));
// console.dir(JSON.stringify(res));

const fastJson = require('fast-json-stringify')
;

const stringify = fastJson({
  title: 'Example Schema',
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    age: {
      description: 'Age in years',
      type: 'integer',
    },
    reg: {
      type: 'string',
    },
  },
});

console.log(stringify({
  firstName: 'Matteo',
  lastName: 'Collina',
  age: 32,
  reg: /"([^"]|\\")*"/,
}));

module.exports = {
  handler,
  yamlParser: YAML,
};
