export default class stat {
  constructor(asset, value, type, period) {
    this.asset = asset;
    this.value = value;
    this.type = type;
    this.period = period;
  }

  static get types() {
    return {
      force: 'force',
      volatility: 'volatility'
    }
  }
}
