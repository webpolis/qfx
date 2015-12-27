import importer from './importer';

export default class csvImporter extends importer {
  constructor(...args) {
    super(...args);

    this.config = {
      header: true,
      dynamicTyping: true,
      encoding: 'UTF-8',
      skipEmptyLines: true
    };
  }

  import () {
    let csv = Assets.getText(this.source);
    let ret = Baby.parse(csv, this.config);

    if (typeof ret.data !== undefined) {
      for (let row of ret.data) {
        let item = {};

        for (let p in this.map) {
          item[p] = row[this.map[p]];
        }

        this.items.push(item);
      }
    }
  }
}
