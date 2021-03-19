let { pinsNumber, rollTypes, englishRollTypes } = require("./globals.js");

module.exports = class Frame {
  constructor(firstRolledPins, rollNumber) {
    this.rollNumber = rollNumber;
    this.previousScore = 0;
    this.firstRolledPins = firstRolledPins;
    this.rollType =
      firstRolledPins == pinsNumber ? rollTypes.STRIKE : rollTypes.NORMAL;
    this.bonusScore = 0;
    this.secondRolledPins = 0;
  }

  isStrike() {
    return this.rollType === rollTypes.STRIKE;
  }

  isSpare() {
    return this.rollType === rollTypes.SPARE;
  }

  isNormal() {
    return this.rollType === rollTypes.NORMAL;
  }

  setSecondRolledPins(secondRolledPins) {
    this.secondRolledPins = secondRolledPins;
    this.rollType =
      this.firstRolledPins + this.secondRolledPins == pinsNumber
        ? rollTypes.SPARE
        : rollTypes.NORMAL;
  }

  getTotalScore() {
    return (
      this.firstRolledPins +
      this.secondRolledPins +
      this.bonusScore +
      this.previousScore
    );
  }

  toString() {
    console.log("");
    console.log("rollNumber: ", this.rollNumber);
    console.log("firstRolledPins: ", this.firstRolledPins);
    console.log("secondRolledPins: ", this.secondRolledPins);
    console.log("rollType: ", englishRollTypes[this.rollType]);
    console.log("bonusScore: ", this.bonusScore);
    console.log("previousScore: ", this.previousScore);
    console.log("total: ", this.getTotalScore());
    console.log("");
  }

  // toString() {
  //   let message =
  //     "***** " +
  //     this.rollNumber +
  //     " *****" +
  //     this.firstRolledPins +
  //     "\t" +
  //     this.secondRolledPins +
  //     "\t" +
  //     englishRollTypes[this.rollType];

  //   if (this.bonusScore) {
  //     message += "\tbonus: " + this.bonusScore + "\n";
  //   }

  //   let total = this.firstRolledPins + this.secondRolledPins + this.bonusScore;
  //   message += "\ttotal: " + total + "\n**************";

  //   return message;
  // }
};// }
