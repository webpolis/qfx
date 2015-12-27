import importer from './importer';

export default class csvImporter extends importer {
  constructor(...args) {
    super(...args);
  }

  import () {
    let isUrl = /^https?:\/\/.*/gi.test(this.source);
    let csv = null;

    // it's assumed csv are placed relative to the 'private' folder
    csv = isUrl ? HTTP.get(this.source) : Assets.getText(this.source);
    let ret = Baby.parse((isUrl ? csv.content : csv), {
      header: true,
      dynamicTyping: true,
      encoding: 'UTF-8',
      skipEmptyLines: true
    });

    if (typeof ret.data !== undefined) {
      for (let row of ret.data) {
        let item = {};

        if (this.map !== null) {
          for (let p in this.map) {
            item[p] = row[this.map[p]];
          }
        } else {
          item = row;
        }

        this.items.push(item);
      }
    }
  }
}
