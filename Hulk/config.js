const Mock = require('./src/mock');

module.exports = {
  Options: {},
  Rules: [{
    regURL: /\/Jeason/,
    method: 'post',
    resCode: 200,
    resHeaders: {
      'Content-Type': 'application/json',
    },
    res: Mock.mock({ 'aa|1-14': '2' }),
  }],
};
