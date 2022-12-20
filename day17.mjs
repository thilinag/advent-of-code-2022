import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });
const data = input.split("");

const rocks = `####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`
  .split("\n\n")
  .map((lines) =>
    lines
      .split("\n")
      .map((line, rowIndex) =>
        line
          .split("")
          .map((rockPiece, colIndex) => {
            return rockPiece === "#"
              ? {
                  x: rowIndex - (lines.split("\n").length - 1),
                  y: colIndex + 2,
                }
              : null;
          })
          .filter((rockPiece) => rockPiece)
      )
      .flat()
  );

const part1 = (moves, rocks, lastRock) => {
  let currentMove = 0;
  let currentRock = 1;
  // add floor
  const chamber = new Set(["1,0", "1,1", "1,2", "1,3", "1,4", "1,5", "1,6"]);
  let towerHeight = 0;
  let isFalling = false;

  while (currentRock <= lastRock) {
    let rock = rocks[(currentRock - 1) % rocks.length].map(({ x, y }) => ({
      x: x - towerHeight - 3,
      y,
    }));
    let stopped = false;

    // do till rock is stopped
    while (!stopped) {
      const move = moves[currentMove % moves.length];
      let nextPosition;
      if (isFalling) {
        nextPosition = rock.map(({ x, y }) => ({
          x: x + 1,
          y,
        }));

        // does any part of the rock already blocked in chamber ?
        if (nextPosition.some(({ x, y }) => chamber.has(`${x},${y}`))) {
          // then add the previous position of the rock as settled
          for (const { x, y } of rock) {
            chamber.add(`${x},${y}`);
          }
          // find the tallest rock point
          if (Math.abs(rock[0].x) + 1 > towerHeight) {
            towerHeight = Math.abs(rock[0].x) + 1;
          }
          // reset cycle for new rock
          isFalling = false;
          // exit this rock's loop
          stopped = true;
          break;
        } else {
          // otherwise rock can move there
          rock = nextPosition;
        }
      } else {
        // left / right move
        nextPosition = rock.map(({ x, y }) => ({
          x,
          y: y + (move === ">" ? 1 : -1),
        }));
        if (
          nextPosition.every(
            ({ x, y }) => !chamber.has(`${x},${y}`) && y <= 6 && y >= 0
          )
        ) {
          // if any part of the rock is not already covered in chamber or
          // not going out of bounds, rock can move there
          rock = nextPosition;
        }
        currentMove++;
      }

      // switch between falling and moving turn
      isFalling = !isFalling;
    }
    currentRock++;
  }
  // How many units tall will the tower of rocks be after 2022 rocks have stopped falling?
  console.log(towerHeight);
};

const part2 = (data) => {
  // console.log(rocks);
};

console.time("part1");
part1(data, rocks, 2022);
console.timeEnd("part1");
console.time("part2");
part2(data);
console.timeEnd("part2");
