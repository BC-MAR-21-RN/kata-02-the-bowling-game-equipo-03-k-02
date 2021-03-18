export default class Player {
  constructor(name) {
    this.name = name;
    this.frames = [];
  }

  addRoll(frame) {
    this.frames.push(frame)
  }
}