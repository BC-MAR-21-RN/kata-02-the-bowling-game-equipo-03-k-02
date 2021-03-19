module.exports = class Player {
  constructor(name) {
    this.name = name;
    this.frames = [];
  }

  addRoll(frame) {
    this.frames.push(frame)
  }

  printFrames() {
    for (let frame of this.frames) {
      console.log(frame.toString())
    }
  }
}