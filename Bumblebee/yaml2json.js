const fs = require('fs');
const YAML = require('js-yaml');

module.exports = (yamlPath = '') => (/\.yaml$/g.test(yamlPath) ? YAML.safeLoad(fs.readFileSync(yamlPath, 'utf8')) : JSON.parse(require(yamlPath)));
