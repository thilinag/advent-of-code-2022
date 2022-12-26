import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });
// const numbers = {};
const data = input.split("\n").map(Number);

const mix = (numbers, data) => {
  for (let i = 0; i < data.length; i++) {
    const currentId = numbers.findIndex((num) => num.pos === i);
    numbers.splice(currentId, 1);
    numbers.splice((data[i] + currentId) % numbers.length, 0, {
      num: data[i],
      pos: i,
    });
  }

  return numbers;
};

const part1 = (data, positions) => {
  let special = [];
  let numbers = data.map((num, index) => ({ num, pos: index }));

  const mixedNumbers = mix(numbers, data);

  const zeroIndex = mixedNumbers.findIndex((number) => number.num === 0);

  for (const position of positions) {
    special.push(
      mixedNumbers[(position + zeroIndex) % mixedNumbers.length].num
    );
  }

  console.log(special.reduce((p, c) => p + c, 0));
};

const part2 = (data) => {
  console.log();
};

console.time("part1");
part1(data, [1000, 2000, 3000]);
console.timeEnd("part1");
console.time("part2");
part2(data);
console.timeEnd("part2");
