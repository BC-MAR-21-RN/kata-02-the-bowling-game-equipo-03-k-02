let Frame = require("./Frame.js");
let { pinsNumber } = require("./globals.js");

module.exports = class Roll {
  static random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static rollOne(rollNumber) {
    return new Frame(this.random(7, pinsNumber), rollNumber);
  }

  static rollSecondShot(frame) {
    frame.setSecondRolledPins(
      this.random(0, pinsNumber - frame.firstRolledPins)
    );

    return frame;
  }

  static rollFrame(rollNumber) {
    let frame = this.rollOne(rollNumber);

    if (!frame.isStrike()) {
      frame = this.rollSecondShot(frame);
    }

    return frame;
  }
};