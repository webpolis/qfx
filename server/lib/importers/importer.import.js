let polyfill = Meteor.npmRequire('babel-polyfill');

export default class importer {
  constructor(map = {}, source = null) {
    this.map = map;
    this.source = source;
    this.items = [];

    this.import();
  }

  import () {}

  * [Symbol.iterator]() {
    for (let item of this.items) {
      yield item;
    }
  }
}
