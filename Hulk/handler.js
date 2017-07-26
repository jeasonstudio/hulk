const AnyQs = require('./anyqs');
const config = require('../config');

module.exports = (req, res, next) => {
  config.Rules.map((item) => {
    if (!(typeof item.regURL === 'object' && typeof item.regURL.test === 'function')) {
      throw new Error('\'Rules.regURL\' must be RegExp');
    }
    if (!item.regURL.test(req.path)) {
      next();
    } else if (
      item.method
      && item.method.toLowerCase() !== req.method.toLowerCase()
    ) {
      next();
    } else {
      const params = req.method.toLowerCase() === 'get' ?
        AnyQs.handle(req.url) : req.body;

      res
        .set(item.resHeaders || {})
        .status(item.resCode || 200)
        .send(item.res(params) || {});
    }
    return item;
  });
};
