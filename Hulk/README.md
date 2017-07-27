# @mi/hulk

提供 mock 数据服务的 express 中间件，可能以后会支持导出/导入 swagger

### Install

```bash
$ nrm use mi
$ npm install @mi/hulk --save-dev
```

### Usage

```javascript
const bodyParser = require('body-parser');
const multer = require('multer');
const { HulkMiddleWare } = require('@mi/hulk');

setup(app) {
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(multer()); // for parsing multipart/form-data

  app.use(HulkMiddleWare);
}
```

`./hulks/index.js`

> 默认会读取此目录下的 index.js 为配置项，暂不支持自定义，如下：

```javascript
const { Hulk } = require('@mi/hulk');
module.exports = {
  Options: {},
  Rules: [{
    regURL: /\/Jeason/,
    method: 'get',
    resCode: 200,
    resHeaders: {
      'Content-Type': 'application/json',
    },
    res: ({ name, year }) => Hulk.mock({
      'stars|3': '★',
      'name': name,
      'year': year,
    }),
  }],
};
```

| key | value |
| --- | --- |
| Options | 留作扩展 |
| Rules | <Array> 所有 mock 项数组 |

| key | value |
| --- | --- |
| regURL | 必须是正则，匹配url |
| method | 同时匹配 method ，不填代表全部匹配 |
| resCode | 期望返回的 statusCode，默认为 200 |
| resHeaders | 期望返回的 response Headers，不填返回默认值 |
| res | <Function> 参数为 get/post 请求的参数，可以通过结构方式获取(见上)，返回值为期望返回的数据，无返回值则默认返回空 Object |

如上配置之后，如果我们请求 `GET /Jeason?name=jeason&year=20` 我们可以得到一个 `json` 对象，其内容为：
```json
{
  "stars": "★★★",
  "name": "jeason",
  "year": 20,
}
```

> note: 若所有路径 reg 均不匹配，则请求不作处理，若同时匹配多个正则（正则有交叉）则按数组顺序最后一个处理

`Hulk.mock(template)` 修改自开源库 [Mock.js](https://github.com/nuysoft/Mock/tree/refactoring)，大部分功能沿用，另外做了一些删减和也增加了一些 feature.

`Hulk.mock()` 数据规范： [点这里](http://v9.git.n.xiaomi.com/Jeason/hulk/wikis/Syntax-Specification)

> Hulk.mock(template) 例子：

```javascript
Hulk.mock({
  'foo': 'Syntax Demo',
  'name': function() {
    return this.foo
  }
})
// =>
{
  "foo": "Syntax Demo",
  "name": "Syntax Demo"
}
```

```javascript
Hulk.mock({
  "number|123.10": 1.123
})
// =>
{
  "number": 123.1237379745
}
```

```javascript
Hulk.mock({
    'regexp1': /[a-z][A-Z][0-9]/,
    'regexp2': /\w\W\s\S\d\D/,
    'regexp3': /\d{5,10}/
})
// =>
{
    "regexp1": "pJ7",
    "regexp2": "F)\fp1G",
    "regexp3": "561659409"
}
```

```javascript
Hulk.mock({
    name: {
        first: '@FIRST',
        middle: '@FIRST',
        last: '@LAST',
        full: '@first @middle @last'
    }
})
// =>
{
    "name": {
        "first": "Charles",
        "middle": "Brenda",
        "last": "Lopez",
        "full": "Charles Brenda Lopez"
    }
}
```

更详细的例子可以参考 [examples](http://mockjs.com/examples.html)
