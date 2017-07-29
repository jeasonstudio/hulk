/* eslint-env node, mocha */

const str2reg = require('../../Bumblebee/str2reg');
const expect = require('chai').expect;

describe('STRING to REGEXP', () => {
  it('should match simple url 1 post', () => {
    const result = str2reg('/pet', 'post');
    expect(result).to.deep.equal(/\/pet$/);
    expect(result.test('/pet')).to.be.equal(true);
  });

  it('should match simple url 2 get', () => {
    const result = str2reg('/pet/findByTags?a=2', 'get');
    expect(result).to.deep.equal(/\/pet\/findByTags\?/);
    expect(result.test('/pet/findByTags?a=2')).to.be.equal(true);
  });

  it('should match simple url 2 post', () => {
    const result = str2reg('/pet/findByTags', 'post');
    expect(result).to.deep.equal(/\/pet\/findByTags$/);
    expect(result.test('/pet/findByTags')).to.be.equal(true);
  });

  it('should match {param} in url post', () => {
    const result = str2reg('/pet/{userid}/uploadimg', 'post');
    expect(result).to.deep.equal(/\/pet\/\S+\/uploadimg$/);
    expect(result.test('/pet/aaa/uploadimg')).to.be.equal(true);
  });

  it('should match {param} in url get', () => {
    const result = str2reg('/pet/{userid}/uploadimg', 'get');
    expect(result).to.deep.equal(/\/pet\/\S+\/uploadimg\?/);
    expect(result.test('/pet/aaa/uploadimg?aa=22')).to.be.equal(true);
  });

  it('should match {param} after url post', () => {
    const result = str2reg('/pet/uploadimg/{userid}', 'post');
    expect(result).to.deep.equal(/\/pet\/uploadimg\/\S+$/);
    expect(result.test('/pet/uploadimg/aaa/')).to.be.equal(true);
  });

  it('should match {param} after url get', () => {
    const result = str2reg('/pet/uploadimg/{userid}', 'get');
    expect(result).to.deep.equal(/\/pet\/uploadimg\/\S+\?/);
    expect(result.test('/pet/uploadimg/aaa?s=2/')).to.be.equal(true);
  });

  it('should match method put', () => {
    const result = str2reg('/pet/uploadimg/{userid}', 'put');
    expect(result).to.deep.equal(/\/pet\/uploadimg\/\S+$/);
    expect(result.test('/pet/uploadimg/aaa/')).to.be.equal(true);
  });
});
