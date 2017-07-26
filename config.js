const Hulk = require('./Hulk/src/mock');

module.exports = {
  Options: {},
  Rules: [{
    regURL: /\/Jeason/,
    method: 'post',
    resCode: 200,
    resHeaders: {
      'Content-Type': 'application/json',
    },
    res: ({ aaa }) => {
      console.log(aaa);
      return Hulk.mock('@range(10)');
    },
  }],
};
