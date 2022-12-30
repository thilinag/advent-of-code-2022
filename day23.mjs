import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });
const elves = new Set();
input.split("\n").map((line, rowIndex) =>
  line.split("").forEach((point, colIndex) => {
    if (point === "#") elves.add(`${rowIndex},${colIndex}`);
  })
);

const move = (elves, turnsLimit) => {
  const elvesPositions = new Set(elves);
  let turn = 1;
  // initial directions
  const directions = ["N", "S", "W", "E"];
  while (turn <= turnsLimit) {
    const nextElfPositions = {};

    for (const elf of elvesPositions) {
      const [x, y] = elf.split(",").map(Number);

      const neighbors = [
        `${x - 1},${y - 1}`,
        `${x - 1},${y}`,
        `${x - 1},${y + 1}`,
        `${x},${y - 1}`,
        `${x},${y + 1}`,
        `${x + 1},${y - 1}`,
        `${x + 1},${y}`,
        `${x + 1},${y + 1}`,
      ];
      // if there are no neighbors around elf, we don't need to move
      if (neighbors.every((neighbor) => !elvesPositions.has(neighbor))) {
        continue;
      }

      // check next position of elf based on direction priority
      nextMove: for (const direction of directions) {
        switch (direction) {
          case "N": {
            const northKey = `${x - 1},${y}`;
            const checkPos = [
              northKey,
              `${x - 1},${y + 1}`,
              `${x - 1},${y - 1}`,
            ];
            if (checkPos.every((pos) => !elvesPositions.has(pos))) {
              nextElfPositions[northKey] = [
                ...(nextElfPositions[northKey] || []),
                elf,
              ];
              break nextMove;
            }
            break;
          }
          case "E": {
            const eastKey = `${x},${y + 1}`;
            const checkPos = [
              eastKey,
              `${x - 1},${y + 1}`,
              `${x + 1},${y + 1}`,
            ];
            if (checkPos.every((pos) => !elvesPositions.has(pos))) {
              nextElfPositions[eastKey] = [
                ...(nextElfPositions[eastKey] || []),
                elf,
              ];
              break nextMove;
            }
            break;
          }
          case "S": {
            const southKey = `${x + 1},${y}`;
            const checkPos = [
              southKey,
              `${x + 1},${y - 1}`,
              `${x + 1},${y + 1}`,
            ];
            if (checkPos.every((pos) => !elvesPositions.has(pos))) {
              nextElfPositions[southKey] = [
                ...(nextElfPositions[southKey] || []),
                elf,
              ];
              break nextMove;
            }
            break;
          }
          case "W": {
            const westKey = `${x},${y - 1}`;
            const checkPos = [
              westKey,
              `${x - 1},${y - 1}`,
              `${x + 1},${y - 1}`,
            ];
            if (checkPos.every((pos) => !elvesPositions.has(pos))) {
              nextElfPositions[westKey] = [
                ...(nextElfPositions[westKey] || []),
                elf,
              ];
              break nextMove;
            }
            break;
          }
        }
      }
    }

    // if none of the elves moved, stop the process
    if (Object.keys(nextElfPositions).length === 0) break;

    // if only one elf suggested a position, move them there
    Object.entries(nextElfPositions).forEach(([key, value]) => {
      if (value.length === 1) {
        elvesPositions.delete(value[0]);
        elvesPositions.add(key);
      }
    });

    // set the next direction priority
    directions.push(directions.shift());

    turn++;
  }

  return elvesPositions;
};

const part1 = (turnsLimit) => {
  const elvesPositions = move(elves, turnsLimit);

  // find row, column min. max
  const rowNumbers = [...elvesPositions].map((elf) =>
    Number(elf.split(",")[0])
  );
  const colNumbers = [...elvesPositions].map((elf) =>
    Number(elf.split(",")[1])
  );
  const rowMin = Math.min(...rowNumbers);
  const rowMax = Math.max(...rowNumbers);
  const colMin = Math.min(...colNumbers);
  const colMax = Math.max(...colNumbers);

  // Simulate the Elves' process and find the smallest rectangle that
  // contains the Elves after 10 rounds.
  // How many empty ground tiles does that rectangle contain?

  // size of the full input minus elves positions
  console.log(
    (rowMax - rowMin + 1) * (colMax - colMin + 1) - elvesPositions.size
  );
};

const part2 = () => {
  console.log();
};

console.time("part1");
part1(10);
console.timeEnd("part1");
console.time("part2");
part2();
console.timeEnd("part2");
