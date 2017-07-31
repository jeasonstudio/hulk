const path = require('path');
const fs = require('fs');

const ORIGN_DATA = fs.readFileSync(path.join(__dirname, './main.template'), 'utf8');
fs.writeFileSync(path.join(__dirname, './.hulkrc.js'), ORIGN_DATA);

const RULE_SNIPPET = `{
    url: {{RULE_URL}},
    method: {{RULE_METHOD}},
    resCode: {{RULE_RESCODE}},
    resHeaders: { 'Content-Type': 'application/json' },
    res: {{RULE_RES}},
  }`;

module.exports.Options = (hulk = {}) => {
  const data = fs.readFileSync(path.join(__dirname, './.hulkrc.js'), 'utf8');
  fs.writeFileSync(
    path.join(__dirname, './.hulkrc.js'),
    data.replace(
      /\{\{OPTIONS\}\}/g,
      JSON.stringify(hulk, null, 2),
    ));
};

module.exports.Rules = (hulk = {}, isEnd = false) => {
  let selfSnippet = RULE_SNIPPET;
  selfSnippet = selfSnippet.replace(/\{\{RULE_URL\}\}/, hulk.url)
    .replace(/\{\{RULE_METHOD\}\}/, hulk.method)
    .replace(/\{\{RULE_RESCODE\}\}/, hulk.resCode)
    .replace(/\{\{RULE_RES\}\}/, hulk.res);

  if (!isEnd) selfSnippet += ', {{RULE}}';

  const data = fs.readFileSync(path.join(__dirname, './.hulkrc.js'), 'utf8');
  fs.writeFileSync(
    path.join(__dirname, './.hulkrc.js'),
    data.replace(
      /\{\{RULE\}\}/g,
      selfSnippet,
    ));
};
