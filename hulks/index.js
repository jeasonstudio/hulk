const Hulk = require('../Hulk/src');

module.exports = {
  Options: {},
  Rules: [{
    regURL: /\/allMethod/,
    resCode: 200,
    resHeaders: {},
    res: () => Hulk.mock({ allMethod: 1 }),
  }, {
    regURL: /\/resCode/,
    method: 'get',
    resCode: 500,
    resHeaders: {},
    res: () => Hulk.mock({ resCode: 500 }),
  }, {
    regURL: /\/resHeaders/,
    method: 'get',
    resCode: 200,
    resHeaders: {
      'Content-Type': 'application/json',
      'Header-Test': 'Jeason',
    },
    res: () => Hulk.mock(),
  }, {
    regURL: /\/Jeason/,
    method: 'get',
    resCode: 200,
    resHeaders: {},
    res: () => Hulk.mock({ Jeason: 1 }),
  }, {
    regURL: /\/Jeasons/,
    method: 'get',
    resCode: 200,
    resHeaders: {},
    res: () => Hulk.mock({ Jeason: 2 }),
  }, {
    regURL: /\/invade/,
    method: 'get',
    resCode: 200,
    resHeaders: {},
    res: () => Hulk.mock({ Jeason: 2 }),
    invade: (req, res /* next */) => {
      res.set({ jeason: '21' }).send(Hulk.mock({ invade: 1 }));
    },
  }],
};
