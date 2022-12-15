import { time } from "console";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });
const data = input
  .split("\n")
  .map((line) =>
    line.split(" -> ").map((point) => point.split(",").map(Number))
  );

const getPoints = (key) => key.split("-").map(Number);

const getRocks = (data) => {
  const rocks = new Set();

  for (const line of data) {
    for (let i = 0; i < line.length; i++) {
      if (line[i + 1] === undefined) {
        break;
      }

      const [startCol, startRow] = line[i];
      const [endCol, endRow] = line[i + 1];

      const isVertical = startCol === endCol;
      const start = isVertical
        ? Math.min(startRow, endRow)
        : Math.min(startCol, endCol);
      const limit = isVertical
        ? Math.max(endRow, startRow)
        : Math.max(startCol, endCol);

      for (let j = start; j <= limit; j++) {
        rocks.add(isVertical ? `${startCol}-${j}` : `${j}-${startRow}`);
      }
    }
  }

  return rocks;
};

const drawSimulation = (rocks, restrictedKeys, part2 = false) => {
  const flatData = data.flat();
  const rowPoints = flatData.map((point) => point[1]);
  const scanRowCount = Math.max(...rowPoints) + (!part2 ? 1 : 2);
  const columnPoints = flatData.map((point) => point[0]);
  const scanColumnStart = !part2
    ? Math.min(...columnPoints)
    : 500 - scanRowCount;
  const scanColumnEnd = !part2 ? Math.max(...columnPoints) : 500 + scanRowCount;

  for (let i = 0; i < scanRowCount; i++) {
    let line = "";
    for (let j = scanColumnStart; j <= scanColumnEnd; j++) {
      const key = `${j}-${i}`;
      if (rocks.has(key)) {
        line += "#";
      } else if (restrictedKeys.has(key)) {
        line += "o";
      } else {
        line += ".";
      }
    }
    console.log(line);
  }

  if (part2) {
    console.log("#".repeat(scanRowCount * 2 + 1));
  }
};

const part1 = (data) => {
  const flatData = data.flat();
  const rowPoints = flatData.map((point) => point[1]);
  const scanRowCount = Math.max(...rowPoints) + 1;

  const rocks = getRocks(data);

  const restrictedKeys = new Set(rocks);

  let isFlowingToAbyss = false;

  let sandUnit = 0;

  // do until sand units are not falling into the abyss
  while (!isFlowingToAbyss) {
    let sandPosition = [500, 0];
    let isResting = false;

    // do until sand unit is not resting
    while (!isResting) {
      const [sandCol, sandRow] = sandPosition;
      const downKey = `${sandCol}-${sandRow + 1}`;
      const downLeftKey = `${sandCol - 1}-${sandRow + 1}`;
      const downRightKey = `${sandCol + 1}-${sandRow + 1}`;

      if (sandRow >= scanRowCount) {
        // falling into the abyss below!
        isFlowingToAbyss = true;
        break;
      }

      if (!restrictedKeys.has(downKey)) {
        // sand always falls down one step if possible
        sandPosition = getPoints(downKey);
        continue;
      } else if (!restrictedKeys.has(downLeftKey)) {
        // if not move diagonally one step down and to the left
        sandPosition = getPoints(downLeftKey);
        continue;
      } else if (!restrictedKeys.has(downRightKey)) {
        // if not move diagonally one step down and to the right
        sandPosition = getPoints(downRightKey);
        continue;
      } else {
        // else sand comes to rest
        restrictedKeys.add(`${sandCol}-${sandRow}`);
        isResting = true;
      }
    }
    sandUnit++;
  }

  drawSimulation(rocks, restrictedKeys);
  // How many units of sand come to rest before sand starts
  // flowing into the abyss below?
  // (remove 1 since it fell into the abyss)
  console.log(sandUnit - 1);
};

const part2 = (data) => {
  const flatData = data.flat();
  const rowPoints = flatData.map((point) => point[1]);
  const scanRowCount = Math.max(...rowPoints) + 1;

  const rocks = getRocks(data);

  const restrictedKeys = new Set(rocks);

  let isBlockingSource = false;

  let sandUnit = 0;
  const source = [500, 0];

  // do until sand units are not falling into the abyss
  while (!isBlockingSource) {
    let sandPosition = source;
    let isResting = false;

    // do until sand unit is not resting
    while (!isResting) {
      const [sandCol, sandRow] = sandPosition;
      const downKey = `${sandCol}-${sandRow + 1}`;
      const downLeftKey = `${sandCol - 1}-${sandRow + 1}`;
      const downRightKey = `${sandCol + 1}-${sandRow + 1}`;

      if (restrictedKeys.has(`${source[0]}-${source[1]}`)) {
        // has reached the starting point
        isBlockingSource = true;
        break;
      }

      if (sandRow === scanRowCount) {
        // sand is on the floor and can rest
        restrictedKeys.add(`${sandCol}-${sandRow}`);
        isResting = true;
      } else if (!restrictedKeys.has(downKey)) {
        // sand always falls down one step if possible
        sandPosition = getPoints(downKey);
        continue;
      } else if (!restrictedKeys.has(downLeftKey)) {
        // if not move diagonally one step down and to the left
        sandPosition = getPoints(downLeftKey);
        continue;
      } else if (!restrictedKeys.has(downRightKey)) {
        // if not move diagonally one step down and to the right
        sandPosition = getPoints(downRightKey);
        continue;
      } else {
        // else sand comes to rest
        restrictedKeys.add(`${sandCol}-${sandRow}`);
        isResting = true;
      }
    }
    sandUnit++;
  }

  drawSimulation(rocks, restrictedKeys, true);
  // simulate the falling sand until the source of the sand becomes blocked.
  // How many units of sand come to rest?
  // (remove 1 since it blocked the source)
  console.log(sandUnit - 1);
};

console.time("part1");
part1(data);
console.timeEnd("part1");
console.time("part2");
part2(data);
console.timeEnd("part2");
