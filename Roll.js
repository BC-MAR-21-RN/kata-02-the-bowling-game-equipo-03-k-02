let Frame = require("./Frame.js");
let { pinsNumber } = require("./globals.js");

module.exports = class Roll {
  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static rollOne(rollNumber) {
    return new Frame(random(0, pinsNumber), rollNumber);
  }

  static rollSecondShot(frame) {
    frame.setSecondRolledPins(random(0, pinsNumber - frame.firstRolledPins));
  }

  static rollFrame(rollNumber) {
    let frame = this.rollOne(rollNumber);

    if (!frame.isStrike()) {
      this.rollSecondShot(frame);
    }

    return frame;
  }
};