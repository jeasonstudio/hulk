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
  RESULT.Rules = URLs.map((hulkItem) => {
    // console.log(hulkItem);
    const METHODs = Reflect.ownKeys(SWAGGER.paths[hulkItem]);
    const FINAL_METHOD = METHODs.length > 1 ? 'MORE' : METHODs[0];

    const CODEs = Reflect.ownKeys(SWAGGER.paths[hulkItem][METHODs[0]].responses);
    const FINAL_CODE = CODEs.length === 1 && CODEs[0] !== 'default' ? CODEs[0] : 200;

    const PARAMs = SWAGGER.paths[hulkItem][METHODs[0]].parameters;
    const PARAMarray = PARAMs.map(item => item.name);
    const PARAMsString = PARAMarray.join(', ');

    const RES_FUNCTION = 'Mock.mock({ \'Jeason|2\': \'e\' })';
    const RES = PARAMarray.length > 0 ? `({ ${PARAMsString} }) => ${RES_FUNCTION}` : `() => ${RES_FUNCTION}`;

    const HULK = Object.assign({},
      {
        url: str2reg(hulkItem, FINAL_METHOD),
        method: METHODs.length > 1 ? undefined : METHODs[0],
        resCode: FINAL_CODE,
        res: eval(RES),
      },
    );
    // console.log(eval(RES).toString());
    // console.log(HULK.res.toString());
    return HULK;
  });
  return RESULT;
};
