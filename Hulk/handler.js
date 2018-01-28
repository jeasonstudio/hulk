const path = require('path');
const AnyQs = require('./anyqs');
// eslint-disable-next-line
const colors = require('colors');

/**
 * we will search your package.json property `hulkpath`
 * or the default file is `process.cwd()/.hulkrc.js`
 */
// eslint-disable-next-line
const pack = require(`${process.cwd()}/package.json`);
const hulkPath = path.join(process.cwd(),
  pack.hulkpath ? pack.hulkpath : '/.hulkrc.js',
);

// force require
function requireF(modulePath) {
  try {
    // eslint-disable-next-line
    return require(modulePath);
  } catch (e) {
    // eslint-disable-next-line
    console.warn('We need at least `.hulkrc.js` in your workplace root folder to use Hulk.');
    return false;
  }
}

// load hulk config
const config = requireF(hulkPath);

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const ruleMatchs = config.Rules.filter((self) => {
    /**
     * self.url should be one of [ regexp, string, function ]
     * JUDGE_URL Boolean
     */
    let JUDGE_URL;

    if (typeof self.url === 'string') {
      // is String
      // eslint-disable-next-line
      self.method.toLowerCase() === 'post' ?
        JUDGE_URL = (self.url === req.path) :
        JUDGE_URL = (self.url.split('?')[0] === req.path);
    } else if (typeof self.url === 'object'
      && typeof self.url.test === 'function'
      && typeof self.url.exec === 'function'
    ) {
      // is RegExp
      JUDGE_URL = self.url.test(req.path);
    } else if (typeof self.url === 'function') {
      // is Function
      JUDGE_URL = self.url(req.path) || false;
    } else {
      // Do not match any of it
      JUDGE_URL = false;
      throw new Error('Propety \'url\' should be one of [ regexp, string, function ]');
    }

    /**
     * Here match your reg rules and methods
     * we will match the last url rule that matched
     * and judge if self.method exsits and matchs
     */
    if (
      JUDGE_URL
      && (
        !self.method
        || self.method.toLowerCase() === req.method.toLowerCase()
      )
    ) return true;
    return false;
  });

  const targetRule = ruleMatchs[0];

  /**
   * if too many rules matchs, we will warn you
   */
  // eslint-disable-next-line
  if (ruleMatchs.length > 1) console.log(`${`[HULK warning] ${ruleMatchs.length}`} Rules Matchs. Hulk Let You to Know This.`.yellow);

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

  // eslint-disable-next-line
  console.log(
    `${'[HULK success]'.cyan} ${req.method.toUpperCase()} ${req.path.split('?')[0]} ${
      targetRule.resCode < 200 || targetRule.resCode > 200 ?
        String(targetRule.resCode).red :
        String(targetRule.resCode).green
    } mocked by Hulk`,
  );

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
    .send(targetRule.res(params));
};
