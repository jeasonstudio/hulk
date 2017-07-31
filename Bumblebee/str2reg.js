module.exports = (STR, METHOD) => {
  const self = METHOD.toLowerCase() === 'get' ? '\\?' : '$';
  return `/${STR
    .split('?')[0]
    // .replace(/\\/g, '\\')
    .replace(/\//g, '\\/')
    .replace(/\$/g, '\\$')
    /**
     * I think there will never be `()` in url
     * .replace(/\(/g, '\\(')
     * .replace(/\)/g, '\\)')
     */
    .replace(/\*/g, '\\*')
    .replace(/\+/g, '\\+')
    .replace(/\./g, '\\.')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\^/g, '\\^')
    .replace(/\{\S+\}/, '\\S+')
    .replace(/\|/g, '\\|')}${self}/`;
};

