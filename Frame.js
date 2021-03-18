import { pinsNumber, rollType, englishRollTypes } from "./globals.js";

export default class Frame {
  constructor(firstRolledPins, rollNumber) {
    this.rollNumber = rollNumber;
    this.firstRolledPins = firstRolledPins;
    this.rollType = firstRolledPins == pinsNumber ? rollTypes.STRIKE : rollTypes.NORMAL;
		this.bonusScore = 0;
		this.secondRolledPins = 0;
  }

  isStrike() {
    return(this.rollType === rollTypes.STRIKE)
  }

  isSpare() {
    return(this.rollType === rollTypes.SPARE)
  }

  isNormal() {
    return(this.rollType === rollTypes.NORMAL)
  }

  setSecondRolledPins(secondRolledPins) {
		this.secondRolledPins = secondRolledPins;
		this.rollType = firstRolledPins + secondRolledPins == pinsNumber ?
      rollTypes.SPARE :
      rollTypes.NORMAL;
  }

	toString() {
    let message = `***** ${this.rollNumber} *****` +
      `${this.firstRolledPins}` +
      `\t${this.secondRolledPins}` +
      `\t${englishRollTypes[this.rollTypes]}\n`;

    if (this.bonusScore) {
      message += `\tbonus: ${this.bonusScore}\n`;
    }

    let total = this.firstRolledPins + this.secondRolledPins + this.bonusScore;
    this.message += `\ttotal: ${total}\n**************`;

    return message;
  }
}