export default class asset {
  constructor(name, ticker, icon = null, description = null, ref = null) {
    this.name = name;
    this.ticker = ticker;
    this.type = this.constructor.name;
    this.icon = null;
    this.ref = ref;
    this.description = description;
  }
}
