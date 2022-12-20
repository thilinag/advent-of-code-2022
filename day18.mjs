import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });
const data = input.split("\n");

const part1 = (data) => {
  let surfaces = 0;
  const cubes = new Set(data);
  const cubePositions = data.map((line) => line.split(",").map(Number));

  // for each cube position
  for (const [x, y, z] of cubePositions) {
    // possible neighbors for this cube for all 6 sides
    const neighbors = [
      `${x + 1},${y},${z}`,
      `${x - 1},${y},${z}`,
      `${x},${y + 1},${z}`,
      `${x},${y - 1},${z}`,
      `${x},${y},${z + 1}`,
      `${x},${y},${z - 1}`,
    ];

    for (const neighbor of neighbors) {
      // check if there is a cube in possible neighbors
      // if there are no cubes, this side is exposed
      if (!cubes.has(neighbor)) {
        surfaces++;
      }
    }
  }

  // What is the surface area of your scanned lava droplet?
  console.log({ surfaces });
};

const part2 = (data) => {
  console.log();
};

console.time("part1");
part1(data);
console.timeEnd("part1");
console.time("part2");
part2(data);
console.timeEnd("part2");
