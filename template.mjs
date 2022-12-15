import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });
const data = input.split("\n");

const part1 = (data) => {
  console.log();
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
