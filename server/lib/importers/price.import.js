import importer from './importer';
import * as models from '../../../lib/models/index';

import * as repositories from '../../../lib/repositories/index';

export default class priceImporter extends importer {
  constructor(...args) {
    super(...args);
  }

  import () {
    let ret = HTTP.get(this.source);

    if (typeof ret.data !== undefined) {
      for (let price of ret.data) {
        let value = null;
        let time = null;

        if (this.map.value.startsWith('@')) {
          eval('value = price.' + this.map.value.slice(1));
        } else {
          value = parseFloat(price[this.map.value]);
        }

        if (this.map.time.startsWith('@')) {
          eval('time = price.' + this.map.time.slice(1));
        } else {
          time = price[this.map.time];
        }

        this.items.push({
          time: time,
          ref: price[this.map.ref],
          value: value
        });
      }
    }
  }
}
