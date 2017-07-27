const Hulk = require('../Hulk/src');
const expect = require('chai').expect;

const Random = Hulk.Random;

describe('Hulk', () => {
  describe('Hulk.mock(template)', () => {
    it('can run string', () => {
      const params = Hulk.mock({
        'string|1-10': '★',
      });
      expect(params).to.be.haveOwnProperty('string');
    });

    it('can run number', () => {
      const params = Hulk.mock({
        'number|+1': 202,
      });

      expect(params).to.be.haveOwnProperty('number');
    });

    it('can run number', () => {
      const params = Hulk.mock({
        'number|123.10': 1.123,
      });
      expect(params).to.be.haveOwnProperty('number');
    });

    it('can run boolean', () => {
      const params = Hulk.mock({
        'boolean|1-2': true,
      });
      expect(params).to.be.haveOwnProperty('boolean');
    });

    it('can run object', () => {
      const params = Hulk.mock({
        'object|2-4': {
          110000: '北京市',
          120000: '天津市',
          130000: '河北省',
          140000: '山西省',
        },
      });
      expect(params).to.be.haveOwnProperty('object');
    });

    it('can run array', () => {
      const params = Hulk.mock({
        'array|1-10': [
          {
            'name|+1': [
              'Hello',
              'Mock.js',
              '!',
            ],
          },
        ],
      });
      expect(params).to.be.haveOwnProperty('array');
    });

    it('can run function', () => {
      const params = Hulk.mock({
        foo: 'Syntax Demo',
        name() {
          return this.foo;
        },
      });
      expect(params).to.be.haveOwnProperty('foo');
      expect(params.name).to.be.equal('Syntax Demo');
    });

    it('can run Relative Path', () => {
      const params = Hulk.mock({
        foo: 'Hello',
        nested: {
          a: {
            b: {
              c: 'Mock.js',
            },
          },
        },
        relativePath: {
          a: {
            b: {
              c: '@../../../foo @../../../nested/a/b/c',
            },
          },
        },
      });
      expect(params).to.deep.equal({
        foo: 'Hello',
        nested: {
          a: {
            b: {
              c: 'Mock.js',
            },
          },
        },
        relativePath: {
          a: {
            b: {
              c: 'Hello Mock.js',
            },
          },
        },
      });
    });

    it('can run regexp', () => {
      const params = Hulk.mock({
        'regexp|1-5': /\d{5,10}\-/,
      });
      expect(params).to.be.haveOwnProperty('regexp');
    });
  });

  describe('Hulk.Random', () => {
    it('can run Basic boolean', () => {
      const param1 = Random.boolean(1, 9, true);
      const param2 = Hulk.mock('@boolean(1, 9, true)');
      const param3 = Random.boolean();
      const param4 = Hulk.mock('@boolean');
      const param5 = Hulk.mock('@boolean()');

      expect(param1).to.be.oneOf([true, false]);
      expect(param2).to.be.oneOf([true, false]);
      expect(param3).to.be.oneOf([true, false]);
      expect(param4).to.be.oneOf([true, false]);
      expect(param5).to.be.oneOf([true, false]);
    });

    it('can run Basic natural', () => {
      const param1 = Hulk.mock('@natural(60, 100)');
      const param2 = Random.natural(60, 100);

      expect(param1).to.be.within(60, 100);
      expect(param2).to.be.within(60, 100);
    });

    it('can run Color', () => {
      const param1 = Hulk.mock('@color()');
      const param2 = Hulk.mock('@rgba()');
      const param3 = Hulk.mock('@hsl()');

      expect(param1).to.be.a('string');
      expect(param2).to.be.a('string');
      expect(param3).to.be.a('string');
    });

    it('can run Text', () => {
      const param1 = Random.paragraph();
      const param2 = Random.sentence();
      const param3 = Random.word();
      const param4 = Random.title();
      const param5 = Random.cparagraph();
      const param6 = Random.csentence();
      const param7 = Random.cword();
      const param8 = Random.ctitle();

      expect(param1).to.be.a('string');
      expect(param2).to.be.a('string');
      expect(param3).to.be.a('string');
      expect(param4).to.be.a('string');
      expect(param5).to.be.a('string');
      expect(param6).to.be.a('string');
      expect(param7).to.be.a('string');
      expect(param8).to.be.a('string');
    });

    it('can run Name', () => {
      const param1 = Random.first();
      const param2 = Random.last();
      const param3 = Random.name();
      const param4 = Random.cfirst();
      const param5 = Random.clast();
      const param6 = Random.cname();

      expect(param1).to.be.a('string');
      expect(param2).to.be.a('string');
      expect(param3).to.be.a('string');
      expect(param4).to.be.a('string');
      expect(param5).to.be.a('string');
      expect(param6).to.be.a('string');
    });

    it('can run Web', () => {
      const param1 = Random.url();
      const param2 = Random.domain();
      const param3 = Random.protocol();
      const param4 = Random.tld();
      const param5 = Random.email();
      const param6 = Random.ip();

      expect(param1).to.be.a('string');
      expect(param2).to.be.a('string');
      expect(param3).to.be.a('string');
      expect(param4).to.be.a('string');
      expect(param5).to.be.a('string');
      expect(param6).to.be.a('string');
    });

    it('can run Address', () => {
      const param1 = Random.region();
      const param2 = Random.province();
      const param3 = Random.city();
      const param4 = Random.county();
      const param5 = Random.zip();

      expect(param1).to.be.a('string');
      expect(param2).to.be.a('string');
      expect(param3).to.be.a('string');
      expect(param4).to.be.a('string');
      expect(param5).to.be.a('string');
    });

    it('can run Helper', () => {
      const param1 = Random.capitalize('hello');
      expect(param1).to.be.equal('Hello');

      const param2 = Random.upper('hello');
      expect(param2).to.be.equal('HELLO');

      const param3 = Random.lower('HELLO');
      expect(param3).to.be.equal('hello');

      const param4 = Random.pick(['a', 'e', 'i', 'o', 'u']);
      expect(param4).to.be.oneOf(['a', 'e', 'i', 'o', 'u']);

      const param5 = Random.shuffle(['a', 'e', 'i', 'o', 'u']);
      expect(param5).to.be.a('array');
    });

    it('can run Miscellaneous', () => {
      const param1 = Random.guid();
      expect(param1).to.be.a('string');
      expect(param1.length).to.be.equal(36);

      const param2 = Random.id();
      expect(param2).to.be.a('string');
      expect(param2.length).to.be.equal(18);
    });
  });
});
