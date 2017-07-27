const Hulk = require('./Hulk/src');

module.exports = {
  Options: {},
  Rules: [{
    regURL: /\/Jeason\//,
    resCode: 200,
    resHeaders: {
      'Content-Type': 'application/json',
    },
    res: () => Hulk.mock({ app: 2 }),
  }, {
    regURL: /\/Jeason\/app\//,
    method: 'get',
    resCode: 200,
    resHeaders: {
      'Content-Type': 'application/json',
    },
    res: () => Hulk.mock({ app: 1 }),
  }, {
    regURL: /\/Jeason\/b/,
    method: 'post',
    resCode: 200,
    resHeaders: {
      'Content-Type': 'application/json',
    },
    res: () => Hulk.mock({ b: 2 }),
  }],
};
