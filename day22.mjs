import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });
const [mapData, instructionsData] = input.split("\n\n");

const openTiles = new Set();
const solidWalls = new Set();
const rowLimits = {};
const colLimits = {};
mapData.split("\n").map((line, rowIndex) => {
  if (rowIndex === 157) console.log(line, line.length);
  return line.split("").forEach((d, colIndex) => {
    if (d === "#") {
      solidWalls.add(`${rowIndex},${colIndex}`);
    }
    if (d === ".") {
      openTiles.add(`${rowIndex},${colIndex}`);
    }

    // find the mins and max of each row, col, so we can be within bounds
    if (d !== " ") {
      if (!rowLimits[rowIndex]) {
        rowLimits[rowIndex] = { min: 999, max: 0 };
      }
      if (!colLimits[colIndex]) {
        colLimits[colIndex] = { min: 999, max: 0 };
      }

      if (rowLimits[rowIndex].min > colIndex) {
        rowLimits[rowIndex].min = colIndex;
      }
      if (rowLimits[rowIndex].max < colIndex) {
        rowLimits[rowIndex].max = colIndex;
      }
      if (colLimits[colIndex].min > rowIndex) {
        colLimits[colIndex].min = rowIndex;
      }
      if (colLimits[colIndex].max < rowIndex) {
        colLimits[colIndex].max = rowIndex;
      }
    }
  });
});

const possibleDirections = [">", "v", "<", "^"];
// instructionsData sample: 10R5L5R10L4R5L5
const instructionTurns = instructionsData.match(/(\d+)/g).map(Number);
// going towards right at the start
const instructionDirections = [">"];
instructionsData.match(/(R|L+)/g).forEach((d) => {
  if (d === "R") {
    // turn 90 deg clockwise
    instructionDirections.push(
      possibleDirections.at(
        possibleDirections.indexOf(instructionDirections.at(-1)) + 1
      ) || possibleDirections[0]
    );
  } else {
    // turn 90 deg anti-clockwise
    instructionDirections.push(
      possibleDirections.at(
        possibleDirections.indexOf(instructionDirections.at(-1)) - 1
      )
    );
  }
});

const move = (pos, turnsArr, directionsArr) => {
  let currentPos = pos;
  let direction;

  // move till we have turns
  while (turnsArr.length) {
    let turns = turnsArr.shift();
    direction = directionsArr.shift();

    for (let i = 0; i < turns; i++) {
      let [x, y] = currentPos;
      let nextMove;
      switch (direction) {
        case ">":
          nextMove = [x, y + 1];
          if (
            !solidWalls.has(`${nextMove[0]},${nextMove[1]}`) &&
            !openTiles.has(`${nextMove[0]},${nextMove[1]}`)
          ) {
            nextMove = [x, rowLimits[x].min];
          }
          break;
        case "v":
          nextMove = [x + 1, y];
          if (
            !solidWalls.has(`${nextMove[0]},${nextMove[1]}`) &&
            !openTiles.has(`${nextMove[0]},${nextMove[1]}`)
          ) {
            nextMove = [colLimits[y].min, y];
          }
          break;
        case "<":
          nextMove = [x, y - 1];
          if (
            !solidWalls.has(`${nextMove[0]},${nextMove[1]}`) &&
            !openTiles.has(`${nextMove[0]},${nextMove[1]}`)
          ) {
            // console.log({ x }, colLimits[x]);
            nextMove = [x, rowLimits[x].max];
          }
          break;
        case "^":
          nextMove = [x - 1, y];
          if (
            !solidWalls.has(`${nextMove[0]},${nextMove[1]}`) &&
            !openTiles.has(`${nextMove[0]},${nextMove[1]}`)
          ) {
            nextMove = [colLimits[y].max, y];
          }
          break;
      }

      // if we find a wall, we need to face next direction
      if (solidWalls.has(`${nextMove[0]},${nextMove[1]}`)) {
        break;
      }

      // otherwise keep moving to the same direction
      currentPos = nextMove;
    }
  }
  return [...currentPos, direction];
};

const part1 = () => {
  let position = [...openTiles][0].split(",").map(Number);
  let turnsArr = [...instructionTurns];
  let directionsArr = [...instructionDirections];
  const lastPos = move(position, turnsArr, directionsArr);

  // Rows start from 1 at the top and count downward;
  // columns start from 1 at the left and count rightward.
  // Facing is 0 for right (>), 1 for down (v), 2 for left (<), and 3 for up (^).

  // The final password is the sum of 1000 times the row,
  // 4 times the column, and the facing.
  // What is the final password?
  console.log(
    (lastPos[0] + 1) * 1000 +
      (lastPos[1] + 1) * 4 +
      possibleDirections.indexOf(lastPos[2])
  );
};

const part2 = () => {
  console.log();
};

console.time("part1");
part1();
console.timeEnd("part1");
console.time("part2");
part2();
console.timeEnd("part2");
