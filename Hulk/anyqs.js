class AnyQs {
  // eslint-disable-next-line
  handle(url, options = {}) {
    const postOptions = Object.assign({}, { parseNumber: true }, options);

    const params = {};
    const tempArr = decodeURI(url)
      .replace(/\+/g, ' ')
      .match(/\w+=[^&#?\\,;]+/g);

    if (!tempArr) return params;

    tempArr.map((item) => {
      const ps = item.split('=');
      if (postOptions.parseNumber) {
        params[ps[0]] = /^\d+(\.\d+)?$/.test(ps[1]) ? parseFloat(ps[1]) : ps[1];
      } else {
        params[ps[0]] = ps[1];
      }
      return item;
    });

    return params;
  }
  stringOnly(url) {
    return this.handle(url, { parseNumber: false });
  }
}

module.exports = new AnyQs();
