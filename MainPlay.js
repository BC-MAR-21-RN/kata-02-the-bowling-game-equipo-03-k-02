let Roll = require("./Roll.js")
let Player = require("./Player.js")
let { totalRolls, pinsNumber } = require("./globals.js")

module.exports = class MainPlay {
    constructor(players) {
        this.currentRoll = 1;
        this.players = players;
    }

    start(){
        for (let player of players) {
            let updatedFrames = [];

            let frame = Roll.roll(this.currentRoll);
            player.addRoll(frame);
            updatedFrames.push(frame);

            if (this.currentRoll < totalRolls) {
                if (this.currentRoll > 1) {
                    if (player.frames[this.currentRoll - 2].isSpare()) {
                        player.frames[this.currentRoll - 2].bonusScore = frame.firstRolledPins;
                    } else if (player.frames[this.currentRoll - 2].isStrike()) {
                        player.frames[this.currentRoll - 2].bonusScore =
                        frame.firstRolledPins + frame.secondRolledPins;
                    }

                    player.frames[this.currentRoll - 1].previousScore =
                        player.frames[this.currentRoll - 2].getTotalScore();
                }

                if (this.currentRoll > 2) {
                    if (player.frames[this.currentRoll - 3].isStrike()) {
                      player.frames[this.currentRoll - 3].bonusScore =
                        frame.firstRolledPins + frame.secondRolledPins;
                    }
                }
            } else if (frame.isSpare()) {
                let spareFrame = Roll.rollOne();
                player.frames[this.currentRoll - 1].bonusScore = spareFrame.firstRolledPins;
                player.addRoll(spareFrame);
                updatedFrames.push(spareFrame);
            } else if (frame.isStrike()) {
                let strikeFrame = Roll.rollOne(this.currentRoll + 1);
                player.addRoll(strikeFrame);
                updatedFrames.push(strikeFrame);

                player.frames[this.currentRoll - 2].bonusScore +=
                    strikeFrame.firstRolledPins;

                if (strikeFrame.isStrike()) {
                    let strikeFrame2 = Roll.rollOne(this.currentRoll + 2);
                    player.frames[this.currentRoll - 3].bonusScore +=
                      strikeFrame2.firstRolledPins;
                    player.addRoll(strikeFrame2);
                    updatedFrames.push(strikeFrame2);

                } else {
                    Roll.rollSecondShot(strikeFrame);
                    player.frames[this.currentRoll - 2].bonusScore += strikeFrame.secondRolledPins;
                }
            }

      this.printRoll(updatedFrames);
    }

      this.currentRoll++;
    };

    printRoll(){
        console.log("******")

        console.log("******")
    }
}