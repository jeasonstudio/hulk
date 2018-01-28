const Mock = require('mockjs');

module.exports = {
  Options: {
  "description": "This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net,",
  "version": "1.0.0",
  "title": "Swagger Petstore",
  "termsOfService": "http://swagger.io/terms/",
  "contact": {
    "email": "apiteam@swagger.io"
  },
  "license": {
    "name": "Apache 2.0",
    "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
  },
  "swagger": "2.0",
  "host": "petstore.swagger.io",
  "basePath": "/v2",
  "schemes": [
    "http"
  ]
},
  Rules: [{
    url: /\/pet$/,
    method: undefined,
    resCode: 405,
    resHeaders: { 'Content-Type': 'application/json' },
    res: ({ body }) => Mock.mock({ a: 1 }),
  }, {
    url: /\/pet\/findByStatus\?/,
    method: get,
    resCode: 200,
    resHeaders: { 'Content-Type': 'application/json' },
    res: ({ status }) => Mock.mock({ }),
  }, {
    url: /\/pet\/findByTags\?/,
    method: get,
    resCode: 200,
    resHeaders: { 'Content-Type': 'application/json' },
    res: ({ tags }) => Mock.mock({ }),
  }, {
    url: /\/pet\/\S+$/,
    method: undefined,
    resCode: 200,
    resHeaders: { 'Content-Type': 'application/json' },
    res: ({ petId }) => Mock.mock({ }),
  }, {
    url: /\/pet\/\S+\/uploadImage$/,
    method: post,
    resCode: 200,
    resHeaders: { 'Content-Type': 'application/json' },
    res: ({ petId, additionalMetadata, file }) => Mock.mock({ }),
  }, {
    url: /\/store\/inventory\?/,
    method: get,
    resCode: 200,
    resHeaders: { 'Content-Type': 'application/json' },
    res: () => Mock.mock({ }),
  }, {
    url: /\/store\/order$/,
    method: post,
    resCode: 200,
    resHeaders: { 'Content-Type': 'application/json' },
    res: ({ body }) => Mock.mock({ }),
  }, {
    url: /\/store\/order\/\S+$/,
    method: undefined,
    resCode: 200,
    resHeaders: { 'Content-Type': 'application/json' },
    res: ({ orderId }) => Mock.mock({ }),
  }, {
    url: /\/user$/,
    method: post,
    resCode: 200,
    resHeaders: { 'Content-Type': 'application/json' },
    res: ({ body }) => Mock.mock({ }),
  }, {
    url: /\/user\/createWithArray$/,
    method: post,
    resCode: 200,
    resHeaders: { 'Content-Type': 'application/json' },
    res: ({ body }) => Mock.mock({ }),
  }, {
    url: /\/user\/createWithList$/,
    method: post,
    resCode: 200,
    resHeaders: { 'Content-Type': 'application/json' },
    res: ({ body }) => Mock.mock({ }),
  }, {
    url: /\/user\/login\?/,
    method: get,
    resCode: 200,
    resHeaders: { 'Content-Type': 'application/json' },
    res: ({ username, password }) => Mock.mock({ }),
  }, {
    url: /\/user\/logout\?/,
    method: get,
    resCode: 200,
    resHeaders: { 'Content-Type': 'application/json' },
    res: () => Mock.mock({ }),
  }, {
    url: /\/user\/\S+$/,
    method: undefined,
    resCode: 200,
    resHeaders: { 'Content-Type': 'application/json' },
    res: ({ username }) => Mock.mock({ }),
  }],
};
