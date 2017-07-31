const path = require('path');
const fs = require('fs');

const RULE_SNIPPET = `{
    url: {{RULE_URL}},
    method: {{RULE_METHOD}},
    resCode: {{RULE_RESCODE}},
    resHeaders: { 'Content-Type': 'application/json' },
    res: {{RULE_RES}},
  }`;

module.exports.Options = (hulk = {}, hulkrcLocation = '') => {
  const data = fs.readFileSync(hulkrcLocation, 'utf8');
  fs.writeFileSync(
    path.join(hulkrcLocation),
    data.replace(
      /\{\{OPTIONS\}\}/g,
      JSON.stringify(hulk, null, 2),
    ));
};

module.exports.Rules = (hulk = {}, hulkrcLocation = '', isEnd = false) => {
  let selfSnippet = RULE_SNIPPET;
  selfSnippet = selfSnippet.replace(/\{\{RULE_URL\}\}/, hulk.url)
    .replace(/\{\{RULE_METHOD\}\}/, hulk.method)
    .replace(/\{\{RULE_RESCODE\}\}/, hulk.resCode)
    .replace(/\{\{RULE_RES\}\}/, hulk.res);

  if (!isEnd) selfSnippet += ', {{RULE}}';

  const data = fs.readFileSync(hulkrcLocation, 'utf8');
  fs.writeFileSync(
    path.join(hulkrcLocation),
    data.replace(
      /\{\{RULE\}\}/g,
      selfSnippet,
    ));
};
