const path = require('path');
const AnyQs = require('./anyqs');

/**
 * we will search your package.json property `hulkpath`
 * or the default path is `process.cwd()/hulks`
 */
// eslint-disable-next-line
const pack = require(`${process.cwd()}/package.json`);
const hulkPath = path.join(process.cwd(),
  pack.hulkpath ? pack.hulkpath : './hulks',
);

/**
 * load your hulk config
 */
// eslint-disable-next-line
const config = require(hulkPath);

// eslint-disable-next-line
module.exports = (req, res, next) => {
  let targetRule;
  config.Rules.map((self, o) => {
    /**
     * self.regURL should be typeof regexp and required
     */
    if (!(typeof self.regURL === 'object' && typeof self.regURL.test === 'function')) {
      throw new Error('\'Rules.regURL\' must be RegExp Type');
    }
    /**
     * Here match your reg rules and methods
     * we will match the last regURL rule that matched
     * and judge if self.method exsits and matchs
     */
    if (
      self.regURL.test(req.path)
      && (
        !self.method
        || self.method.toLowerCase() === req.method.toLowerCase()
      )
    ) targetRule = config.Rules[o];
    return self.regURL.test(req.path);
  });

  /**
   * HAVE NOT MATCH ANY REGRXPs
   */
  if (!targetRule) return next();

  /**
   * if targetRule has property 'invade'
   * we will ignore ['resCode', 'resHeaders', 'res'] property
   * and export a callback function invade(req, res, next)
   *
   */
  if (typeof targetRule.invade === 'function') return targetRule.invade(req, res, next);

  const params = req.method.toLowerCase() === 'get' ?
    AnyQs.handle(req.url) : req.body;

  res
    /**
     * set response header
     */
    .set(targetRule.resHeaders || {})
    /**
     * DIY you response HTTP CODE\
     * default 200
     */
    .status(targetRule.resCode || 200)
    /**
     * You can write logic code in self.res
     * we suggest to use an Arrow Function
     * param is your request params and it's better to return something
     * if you do not or forget this, you will get an empty Object
     *
     * something like:
     *
     * ({ userId }) => Hulk.Random.id()
     */
    .send(targetRule.res(params) || {});
};
