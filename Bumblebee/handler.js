const str2reg = require('./str2reg');
const render = require('./templates/render');

module.exports = (SWAGGER) => {
  /**
   * render result object
   */
  const RESULT = {};
  if (!SWAGGER.swagger) console.warn('Did you forget the DOCs VERSION?');

  /**
   * fill in the swagger options
   * and render to template
   */
  RESULT.Options = Object.assign({},
    SWAGGER.info,
    {
      swagger: SWAGGER.swagger,
      host: SWAGGER.host,
      basePath: SWAGGER.basePath,
      schemes: SWAGGER.schemes,
    },
  );
  render.Options(RESULT.Options);

  /**
   * parser swagger api
   * and render to Rules
   */
  if (typeof SWAGGER.paths !== 'object') throw new Error('The Propety `paths` should be Object');
  const URLs = Reflect.ownKeys(SWAGGER.paths);
  RESULT.Rules = URLs.map((hulkItem, i) => {
    // console.log(hulkItem);
    const METHODs = Reflect.ownKeys(SWAGGER.paths[hulkItem]);
    const FINAL_METHOD = METHODs.length > 1 ? 'MORE' : METHODs[0];

    const CODEs = Reflect.ownKeys(SWAGGER.paths[hulkItem][METHODs[0]].responses);
    const FINAL_CODE = CODEs.length === 1 && CODEs[0] !== 'default' ? CODEs[0] : 200;

    const PARAMs = SWAGGER.paths[hulkItem][METHODs[0]].parameters;
    const PARAMarray = PARAMs.map(item => item.name);
    const PARAMsString = PARAMarray.join(', ');

    const RES_FUNCTION = 'Mock.mock({ })';
    const RES = PARAMarray.length > 0 ? `({ ${PARAMsString} }) => ${RES_FUNCTION}` : `() => ${RES_FUNCTION}`;

    const HULK = Object.assign({},
      {
        url: str2reg(hulkItem, FINAL_METHOD),
        method: METHODs.length > 1 ? undefined : METHODs[0],
        resCode: FINAL_CODE,
        res: RES,
      },
    );

    render.Rules(HULK, URLs.length === i + 1);

    return HULK;
  });
  return RESULT;
};
