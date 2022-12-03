import { readFileSync } from "fs";
const input = readFileSync("./input.txt", { encoding: "utf8" });
const data = input.split("\n");

const opponentChoices = ["A", "B", "C"];

const part1 = (data) => {
  const ourChoices = ["X", "Y", "Z"];
  const turns = data.map((turn) => {
    const [opponentChoice, ourChoice] = turn.split(" ");
    const opponentMove = opponentChoices.indexOf(opponentChoice) + 1;
    const ourMove = ourChoices.indexOf(ourChoice) + 1;

    if (opponentMove === ourMove) {
      // draw
      return 3 + ourMove;
    }

    if (ourMove - opponentMove === 1 || ourMove - opponentMove === -2) {
      // won
      return 6 + ourMove;
    }

    return ourMove; // lost
  });

  console.log(turns.reduce((prevSum, turnScore) => prevSum + turnScore, 0));
};

const part2 = (data) => {
  const turns = data.map((turn) => {
    const [opponentChoice, outcome] = turn.split(" ");
    const opponentMove = opponentChoices.indexOf(opponentChoice) + 1;

    if (outcome === "X") {
      // need to loose
      return opponentMove - 1 || 3; // play the move which comes before the order of opponent move to lose, check for out of bounds
    }

    if (outcome === "Y") {
      // need to draw
      return 3 + opponentMove; // draw score + ourChoice score (same as opponent move when draw)
    }

    // else we need to win
    const winningMove = opponentMove + 1;
    return (
      (winningMove > 3 // out of bounds
        ? 1
        : winningMove) + 6
    ); // add winner score
  });

  console.log(turns.reduce((prevSum, turnScore) => prevSum + turnScore, 0));
};

part1(data);
part2(data);
