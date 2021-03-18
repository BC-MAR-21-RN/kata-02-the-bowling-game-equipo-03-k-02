import { Frame } from "./Frame.js";
import { pinsNumber } from "./globals.js";

export default class Roll {
  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static roll() {
    let frame = new Frame(random(0, pinsNumber));
    if (!frame.isStrike()) {
      frame.setSecondRolledPins(random(0, pinsNumber - frame.firstRolledPins));
    }

    return frame;
  }
}