export class market {
  constructor(name, ticker) {
    this._name = name;
    this._ticker = ticker;
  }

  set description(description = null) {
    this._description = description;
  }

  get description() {
    return this._description;
  }

  set name(name = null) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set ticker(ticker = null) {
    this._ticker = ticker;
  }

  get ticker() {
    return this._ticker;
  }
}
