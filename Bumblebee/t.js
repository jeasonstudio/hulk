const a = { Options: { description: 'This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net,', version: '1.0.0', title: 'Swagger Petstore', termsOfService: 'http://swagger.io/terms/', contact: { email: 'apiteam@swagger.io' }, license: { name: 'Apache 2.0', url: 'http://www.apache.org/licenses/LICENSE-2.0.html' }, swagger: '2.0', host: 'petstore.swagger.io', basePath: '/v2', schemes: ['http'] }, Rules: [{ url: '/\\/pet$/', resCode: '405' }, { url: '/\\/pet\\/findByStatus\\?$/', method: 'get', resCode: 200 }, { url: '/\\/pet\\/findByTags\\?$/', method: 'get', resCode: 200 }, { url: '/\\/pet\\/\\S+$/', resCode: 200 }, { url: '/\\/pet\\/\\S+\\/uploadImage$/', method: 'post', resCode: '200' }, { url: '/\\/store\\/inventory\\?$/', method: 'get', resCode: '200' }, { url: '/\\/store\\/order$/', method: 'post', resCode: 200 }, { url: '/\\/store\\/order\\/\\S+$/', resCode: 200 }, { url: '/\\/user$/', method: 'post', resCode: 200 }, { url: '/\\/user\\/createWithArray$/', method: 'post', resCode: 200 }, { url: '/\\/user\\/createWithList$/', method: 'post', resCode: 200 }, { url: '/\\/user\\/login\\?$/', method: 'get', resCode: 200 }, { url: '/\\/user\\/logout\\?$/', method: 'get', resCode: 200 }, { url: '/\\/user\\/\\S+$/', resCode: 200 }] };