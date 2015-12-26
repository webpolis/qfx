export default class asset {
  constructor(name, ticker, description = null) {
    this.name = name;
    this.ticker = ticker;
    this.type = this.constructor.name;
    this.description = description;
  }
}
