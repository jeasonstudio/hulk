# @mi/hulk

Hulk => 无敌浩克：提供 mock 数据服务的 express 中间件

| Question | Answers |
| :--- | :--- |
| Mock 是什么？ | mock 就是在开发过程中，由于一些原因，需要模拟网络请求(大多为 REST API)并拿到数据，正常开发的方法。 |
| Hulk 是什么？ | Hulk 是一个可插拔的 express 中间件，如果你使用了 Hulk，它可以提供 mock 服务(拦截请求，填充数据，返回结果)。|
| Hulk 是如何做到的？ | Hulk 依赖于 webpack-dev-server ，在数据请求的中间层做匹配和拦截，符合条件的请求会做 mock 处理 |
| 为什么要用 Mockjs？ | Mockjs 是目前看来业界比较成熟的提供 mock 数据的库，我们用它来提供更加真实的 mock 数据，比如数组、对象、地名、ip、人名、复杂的 json 结构等等。 |
| 我要怎么使用它们？ | 请参阅下方文档。 |

### Install

```bash
$ nrm use mi
$ npm install @mi/hulk mockjs --save-dev
```

### Usage

你需要在你的 webpack 配置文件暴露 `express实例: app` 的位置做如下例所示修改，其中：
 - `bodyParser` 和 `multer` 是用来解析 post 参数的中间件
 - `HulkMiddleWare` 是提供 mock 代理服务的中间件：Hulk
```javascript
const bodyParser = require('body-parser');
const multer = require('multer');
const HulkMiddleWare = require('@mi/hulk');

// ...

setup(app) {
  app.use(bodyParser.json());
  // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true }));
  // for parsing application/x-www-form-urlencoded
  app.use(multer());
  // for parsing multipart/form-data

  app.use(HulkMiddleWare);
  // use Hulk Middle Ware
}
```

```javascript
/** `./.hulkrc.js`
 * 默认会读取项目根目录下的 .hulkrc.js 为配置项
 * 如需自定义配置请在项目根目录 `package.json` 中配置 `hulkpath` 字段
 */

const Mock = require('mockjs');
// 这里引入 mockjs 提供更真实的数据模拟服务
// 这是我们推荐的，但您可以根据习惯自由选择

module.exports = {
  Options: {},
  Rules: [{
    url: /\/Jeason/,
    method: 'get',
    resCode: 200,
    resHeaders: {
      'Content-Type': 'application/json',
    },
    res: ({ name, year }) => Mock.mock({
      'stars|3': '★',
      'name': name,
      'year': year,
    }),
  }],
};
```

> Module.exports Schema

| key | type | value |
| --- | --- | --- |
| Options | <Object> | 留作扩展(swagger) |
| Rules | <Array> | Rule 数组 |

> Rules Schema

| key | type | value |
| --- | --- | --- |
| url | <RegExp>, <String>, <Function> | 我们推荐正则形式，但也支持字符串和函数，如果为函数类型，其参数为 `(reqPath)`，返回值必须为布尔值 |
| method | <String> | 匹配 req.method，不填代表匹配全部 |
| resCode | <Number> | 期望返回的 statusCode，默认为 200 |
| resHeaders | <Object> | 期望返回的 response Headers，不填返回默认值 |
| res | <Function> 参数为 get/post 请求的参数对象，可以通过解构方式获取(见上)，返回值为期望返回的数据 |
| invade | <Function> 自定义方法字段，若 `typeof invade === 'function'`，`Hulk` 会忽略 `resCode,resHeaders,res` 三个字段，并暴露一个回调函数 `invade(req, res, next)` |

如上配置，请求 `GET /Jeason?name=jeason&year=20` 我们可以得到一个 `json` 对象，其内容为：
```json
{
  "stars": "★★★",
  "name": "jeason",
  "year": 20,
}
```

### NOTE: important!!

> 一些声明：
 - Hulk 只提供中间件代理服务，`模拟生成数据服务` 我们推荐使用 `mockjs` ，但你可以有其他类似的选择。
 - 若 `url` 字段无请求匹配，则 `Hulk` 会不作处理，忽略此请求
 - 若多个正则(或字符串或函数)匹配成功，则按最后一次匹配的结果处理

> 关于 MockJS
 - `Mock.mock()` [数据规范及wiki](http://v9.git.n.xiaomi.com/Jeason/hulk/wikis/Syntax-Specification)
 - 下面列出了几个例子，更多请参考 [examples](http://mockjs.com/examples.html)

> Mock.mock(template) example：

```javascript
Mock.mock({
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
Mock.mock({
  "number|123.10": 1.123
})
// =>
{
  "number": 123.1237379745
}
```

```javascript
Mock.mock({
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
Mock.mock({
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

### Devlope

请 clone 原仓库：`git clone git@v9.git.n.xiaomi.com:Jeason/hulk.git`

```bash
// 开发
$ nrm use mi
$ cd Hulk && npm install
$ cd .. && npm install
$ npm start
// 如果使用 vscode 开发可以直接 F5，支持调试。
```

```bash
// 测试
$ npm run test:simple
// 不生成覆盖率报告
$ npm run test:server
// 只测试 server
$ npm run test
// 生成测试覆盖率报告
```
