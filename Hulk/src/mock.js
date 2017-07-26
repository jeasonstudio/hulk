const Util = require('./mock/util');
const Handler = require('./mock/handler');
const Random = require('./mock/random');
const RE = require('./mock/regexp');

class Mock {
  constructor() {
    this.Handler = Handler;
    this.Util = Util;
    this.Random = Random;
    this.RE = RE;
    this.heredoc = Util.heredoc;
  }
  // eslint-disable-next-line
  mock(template) {
    return Handler.gen(template);
  }
}

module.exports = new Mock();
