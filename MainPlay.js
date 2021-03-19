let Roll = require("./Roll.js")
let Player = require("./Player.js")
let { totalRolls, pinsNumber, DELAY_TURN_MS } = require("./globals.js");


let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = class MainPlay {
  constructor(players) {
    this.currentRoll = 1;
    this.players = players;
  }

  async start() {
    for (
      this.currentRoll = 1;
      this.currentRoll <= totalRolls;
      this.currentRoll++
    ) {
      await sleep(DELAY_TURN_MS);

      this.makeTurn();
      this.printTurn();
    }

    this.makeLastTurn();
    this.printTurn();
  }

  makeTurn() {
    let i = this.currentRoll - 1;
    for (let player of this.players) {
      let frame = Roll.rollFrame(this.currentRoll);
      player.addRoll(frame);

      if (i > 0) {
        if (player.frames[i - 1].isStrike() || player.frames[i - 1].isSpare()) {
          player.frames[i - 1].bonusScore += frame.firstRolledPins;
        }

        if (player.frames[i - 1].isStrike() && !frame.isStrike()) {
          player.frames[i - 1].bonusScore += frame.secondRolledPins;
        }

        player.frames[i].previousScore = player.frames[i - 1].getTotalScore();
      }

      if (
        i >= 2 &&
        player.frames[i - 2].isStrike() &&
        player.frames[i - 1].isStrike()
      ) {
        player.frames[i - 2].bonusScore += frame.firstRolledPins;
        player.frames[i - 1].previousScore = player.frames[
          i - 2
        ].getTotalScore();
        player.frames[i].previousScore = player.frames[i - 1].getTotalScore();
      }
    }
  }

  makeLastTurn() {
      let i = this.currentRoll - 2;
      for (let player of this.players) {
        let lastFrame = player.frames[i];
        let frame11 = undefined;

        if (lastFrame.isSpare() || lastFrame.isStrike()) {
          frame11 = Roll.rollOne(this.currentRoll);
          player.frames[i].bonusScore += frame11.firstRolledPins;

          if (
            player.frames[i].isStrike() &&
            player.frames[i - 1].isStrike()
          ) {
            player.frames[i - 1].bonusScore +=
              frame11.firstRolledPins;
          }

          player.frames[i].previousScore = player.frames[
            i - 1
          ].getTotalScore();
          frame11.previousScore = player.frames[i].getTotalScore();
          player.addRoll(frame11);
        }

        if (lastFrame.isStrike()) {
          if (frame11.isStrike()) {
            let frame12 = Roll.rollOne(this.currentRoll + 1);
            player.frames[i].bonusScore = frame12.firstRolledPins;
            player.frames[i + 1].previousScore = player.frames[
              i
            ].getTotalScore();
            frame12.previousScore = player.frames[i + 1].getTotalScore()
            player.addRoll(frame12);
          } else {
            player.frames[i + 1] = Roll.rollSecondShot(player.frames[i + 1]);
            player.frames[i].bonusScore += player.frames[i + 1].secondRolledPins;
          }
        }
      }
  }

  printTurn() {
    console.log(`############ ${this.currentRoll} ############`);
    for (let player of this.players) {
      console.log(`#### ${player.name} ####`);
      player.printFrames();
    }
  }
};