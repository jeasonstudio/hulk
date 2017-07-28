const str2reg = require('./str2reg');

module.exports = (SWAGGER) => {
  const RESULT = {};
  if (!SWAGGER.swagger) console.warn('Did you forget the DOCs VERSION?');
  RESULT.Options = Object.assign({},
    SWAGGER.info,
    {
      swagger: SWAGGER.swagger,
      host: SWAGGER.host,
      basePath: SWAGGER.basePath,
      schemes: SWAGGER.schemes,
    },
  );

  if (typeof SWAGGER.paths !== 'object') throw new Error('The Propety `paths` should be Object');
  const URLs = Reflect.ownKeys(SWAGGER.paths);
  RESULT.Rules = URLs.map((hulkItem, key) => {
    const MRTHODs = Reflect.ownKeys(hulkItem);
    const HULK = Object.assign({},
      {
        url: str2reg(hulkItem, 'get'),
      },
    );
    return HULK;
  });
  return RESULT;
};
