export default class task {
  constructor(schedule) {
    this.name = this.constructor.name;
    this.schedule = schedule;

    this.add();
  }

  add() {}
}
