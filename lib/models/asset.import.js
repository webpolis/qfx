export class asset {
  constructor(name, ticker, type, description = null) {
    this.name = name;
    this.ticker = ticker;
    this.type = type;
    this.description = description;
  }
}
