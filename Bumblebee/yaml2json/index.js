const fs = require('fs');
const YAML = require('js-yaml');

module.exports = (yamlPath = '') => YAML.safeLoad(fs.readFileSync(yamlPath, 'utf8'));
