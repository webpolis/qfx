export default class asset {
  constructor(name, ticker, icon = null, description = null, ref = null, active = true) {
    this.name = name;
    this.ticker = ticker;
    this.type = this.constructor.name;
    this.icon = null;
    this.ref = ref;
    this.active = active;
    this.description = description;
  }
}
