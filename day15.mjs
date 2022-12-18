import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });

const data = input.split("\n").map((line) => {
  const matches = line.match(
    /Sensor at x=(?<sensorX>-?\d+), y=(?<sensorY>-?\d+)\: closest beacon is at x=(?<beaconX>-?\d+), y=(?<beaconY>-?\d+)/
  );
  const sensorX = Number(matches.groups.sensorX);
  const sensorY = Number(matches.groups.sensorY);
  const beaconX = Number(matches.groups.beaconX);
  const beaconY = Number(matches.groups.beaconY);

  return {
    sensorX,
    sensorY,
    beaconX,
    beaconY,
  };
});

const part1 = (data, y) => {
  const covered = new Set();
  const beacons = new Set();

  for (const line of data) {
    const { sensorX, sensorY, beaconX, beaconY } = line;
    const beaconDistance =
      Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);

    if (
      (sensorY < y && sensorY + beaconDistance < y) ||
      (sensorY > y && sensorY - beaconDistance > y)
    ) {
      continue;
    }

    if (beaconY === y) {
      beacons.add(`${beaconX}`);
    }

    const start = sensorX - beaconDistance + Math.abs(y - sensorY);
    for (
      let i = start;
      i <= sensorX + (beaconDistance - Math.abs(y - sensorY));
      i++
    ) {
      covered.add(`${i}`);
    }
  }
  console.log(covered.size - beacons.size);
};

const part2 = (data, min, max) => {
  const covered = new Set();
  const beacons = new Set();

  for (const line of data) {
    const { sensorX, sensorY, beaconX, beaconY } = line;
    const beaconDistance =
      Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);

    if (
      (sensorY > max && sensorY - beaconDistance > max) ||
      (sensorY < min && sensorY + beaconDistance < min)
    ) {
      continue;
    }

    console.log(line);
  }
};

console.time("part1");
// part1(data, 2000000);
part1(data, 10);
console.timeEnd("part1");
console.time("part2");
// part2(data, 0, 4000000);
part2(data, 0, 20);
console.timeEnd("part2");
