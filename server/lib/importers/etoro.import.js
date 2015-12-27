/*
instruments: https://api.etorostatic.com/sapi/instrumentsmetadata/V1.1/instruments
closing prices: https://www.etoro.com/sapi/candles/closingprices.json?client_request_id=e7037d74-14a0-41ef-be1a-1082ca7c6069
*/
import importer from './importer';
import * as models from '../../../lib/models/index';

export default class etoroImporter extends importer {
  constructor(...args) {
    super(...args);
  }

  import () {
    let ret = HTTP.get(this.source);

    // instruments info
    if (typeof ret.data !== undefined && typeof ret.data.InstrumentDisplayDatas !== undefined) {
      for (let instrument of ret.data.InstrumentDisplayDatas) {
        let icon = null;

        if (this.map.icon.startsWith('@')) {
          eval('icon = instrument.' + this.map.icon.slice(1));
        } else if (typeof instrument[this.map.icon] !== undefined) {
          icon = instrument[this.map.icon];
        }

        let asset = null;

        switch (instrument[this.map.type]) {
          case 1:
            asset = new models.cross(instrument[this.map.name], instrument[this.map.ticker]);
            break;
          case 4:
          case 6:
          case 7:
            asset = new models.stock(instrument[this.map.name], instrument[this.map.ticker]);
            break;
        }

        if (asset instanceof models.asset) {
          asset.icon = icon;
          asset.ref = instrument[this.map.ref];

          this.items.push(asset);
        }
      }
    }
  }
}
