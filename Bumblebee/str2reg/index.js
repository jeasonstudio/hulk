module.exports = (STR, METHOD) => {
  const self = METHOD.toLowerCase() === 'get' ? '\\?' : '';
  return `/${STR
    .replace(/\//g, '\\/')
    .replace(/\$/g, '\\$')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\*/g, '\\*')
    .replace(/\+/g, '\\+')
    .replace(/\./g, '\\.')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\\/g, '\\')
    .replace(/\^/g, '\\^')
    .replace(/\{\S+\}/, '\\S+')
    .replace(/\|/g, '\\|')}${self}$/`;
};

