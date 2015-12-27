/*
instruments: https://api.etorostatic.com/sapi/instrumentsmetadata/V1.1/instruments
closing prices: https://www.etoro.com/sapi/candles/closingprices.json?client_request_id=e7037d74-14a0-41ef-be1a-1082ca7c6069
*/
import importer from './importer';

export default class etoroImporter extends importer {
  constructor(...args) {
    super(...args);
  }
}
