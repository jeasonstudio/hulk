const Mock = require('mockjs');

/**
 * DO NOT DELETE any of propety below
 */
module.exports = {
  Options: {},
  Rules: [{
    url: /\/allMethod/,
    resCode: 200,
    resHeaders: {},
    res: () => Mock.mock({ allMethod: 1 }),
  }, {
    url: /\/resCode/,
    method: 'get',
    resCode: 500,
    resHeaders: {},
    res: () => Mock.mock({ resCode: 500 }),
  }, {
    url: /\/resHeaders/,
    method: 'get',
    resCode: 200,
    resHeaders: {
      'Content-Type': 'application/json',
      'Header-Test': 'Jeason',
    },
    res: () => Mock.mock(),
  }, {
    url: /\/Jeason/,
    method: 'get',
    resCode: 200,
    resHeaders: {},
    res: () => Mock.mock({ Jeason: 1 }),
  }, {
    url: /\/Jeasons/,
    method: 'get',
    resCode: 200,
    resHeaders: {},
    res: () => Mock.mock({ Jeason: 2 }),
  }, {
    url: /\/invade/,
    method: 'get',
    resCode: 200,
    resHeaders: {},
    invade: (req, res /* next */) => {
      res.set({ jeason: '21' }).send(Mock.mock({ invade: 1 }));
    },
  }, {
    url: '/string',
    method: 'get',
    resCode: 200,
    resHeaders: {},
    res: () => Mock.mock({ string: 1 }),
  }, {
    url: reqPath => reqPath === '/function',
    method: 'get',
    resCode: 200,
    resHeaders: {},
    res: () => Mock.mock({ function: 1 }),
  }],
};
