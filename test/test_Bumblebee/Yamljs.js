/* eslint-env node, mocha */

const YAML = require('../../Bumblebee/yaml2json');
const expect = require('chai').expect;
const json = require('./swagger/swagger.json');

describe('YAMLJS', () => {
  it('should parse yaml 2 json', () => {
    const result = YAML('./test/test_Bumblebee/swagger/swagger.yaml');
    expect(result).to.deep.equal(json);
  });
});
