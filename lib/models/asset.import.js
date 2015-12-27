export default class asset {
  constructor(name, ticker, icon = null, description = null) {
    this.name = name;
    this.ticker = ticker;
    this.type = this.constructor.name;
    this.icon = null;
    this.description = description;
  }
}
