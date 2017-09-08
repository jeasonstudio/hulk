<div align="center">
  <h1>
    <a href="https://learn-anything.xyz">Hulk.js 🎃</a>
  </h1>

  [![Build Status](https://travis-ci.org/jeasonstudio/hulk.svg?branch=master)](https://travis-ci.org/jeasonstudio/hulk)
  [![Support Me](https://img.shields.io/badge/Support%20Us-💗-ff69b4.svg)](https://github.com/jeasonstudio)
  [![npm](https://img.shields.io/npm/v/hulk.js.svg)](https://www.npmjs.com/package/hulk.js)
  [![Liense MIT](https://img.shields.io/pypi/l/pipenv.svg)](https://github.com/learn-anything/learn-anything/blob/master/LICENSE)
</div>

Hulk.js: An express middleware provide Mock data service.

[以中文查看此文](Hulk/README.md)

| Question | Answers |
| :--- | :--- |
| What is Mock? | In short, mocking is creating objects that simulate the behaviour of real objects. |
| What is Hulk? | Hulk is a pluggable express middleware, you can use Hulk.js to get the Mock service. |
| How does Hulk do it? | Hulk.js relies on webpack-dev-server, match and intercept in any middle of the request that matches the rules. |
| Why Mockjs？ | Mockjs library seems to be more mature to provide mock data, We use it to provide more real mock data such as arrays, objects, place names, ip, names, complex json structures, and so on. |
| How can I use it? | Continue reading. |

### Install

```bash
$ npm install hulk.js mockjs body-parser --save-dev
```

### Usage & Example

Locate the `express instance: app` in the webpackDevServer configuration file, then make the changes as shown below:

```javascript
const bodyParser = require('body-parser')
const HulkMiddleWare = require('hulk.js')
// some code here...

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// use Hulk Middle Ware
app.use(HulkMiddleWare);
```

Note:
 - `bodyParser` and` multer` are middlewares used to parse the post parameter
 - `HulkMiddleWare` is the middleware that provides mock proxy service

Next step, add the `.hulkrc.js` file to the project root.

(This is the default configuration file, if you do not like it, you can add `hulkpath` field to the `package.json` file to specify the hulk profile location.)

```javascript
/**
 * .hulkrc.js
 *
 * We introduce mockjs to provide `more real data simulation service`
 * This is what we recommend, but you can choose freely according to your habit
 */

const Mock = require('mockjs')
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

Then, request `GET /Jeason?name=jeason&year=20` we can get a `json` object:
```json
{
  "stars": "★★★",
  "name": "jeason",
  "year": 20,
}
```

### API Doc

> Module.exports Schema

| key | type | value |
| --- | --- | --- |
| Options | Object | Stay for expansion(swagger) |
| Rules | Array | Rule Array |

> Rules Schema

| key | type | value |
| --- | --- | --- |
| url | RegExp, String, Function | We recommend the `regular` form, but also support the `string` and `function`, if function type, its parameter is `(reqPath)` and the return value must be a Boolean. |
| method | String | Match req.method, `undefined` means match `all method` |
| resCode | Number | The expected return value for `statusCode`, default is `200` |
| resHeaders | Object | The expected return value for `response Headers`, `undefined` returns the default value |
| res | Function | The parameter is a parameter object of the `get/post` request, and the return value is the desired data |
| invade | Function | Invade field, it can override the previous options. if `typeof invade === 'function'`, `Hulk.js` will ignore` resCode, resHeaders, res` three fields and expose a callback function `invade(req, res, next)` |

### Tips: important!

 - Hulk.js middleware only provides proxy services, `simulation data service` we recommend using `mockjs`, but you can have other similar options.
 - If no request matchs `url` field,` Hulk.js` will do nothing, ignore this request
 - If there are more than one regular (or string or function) matches, we will follow the results of the first match, of course, `Hulk.js` will give you a warning log.

### Devlope

Please fork `https://github.com/jeasonstudio/hulk.git`

```bash
# 开发
$ nrm use npm
$ cd Hulk && npm install
$ cd .. && npm install
$ npm start
# If you use vscode, you can just press F5, support debugging.
```

```bash
# unit test
$ npm run test:simple
# No coverage report
$ npm run test:server
# Only test server
$ npm run test
# Generate a test coverage report
```

### About Mockjs

 - `Mock.mock()` [Data specification and wiki](https://github.com/nuysoft/Mock/wiki)
 - Here are a few examples, please refer to [examples](http://mockjs.com/examples.html)

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
