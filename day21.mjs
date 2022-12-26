import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });
const monkeyData = {};
const data = input.split("\n").forEach((line) => {
  const [monkey, value] = line.split(": ");
  // create an object with monkey and its number or operation
  monkeyData[monkey] = /\d+/.test(value) ? Number(value) : value;
});

// recursively find the monkey number
const getResult = (monkeyValue) => {
  if (/\d+/.test(monkeyValue)) {
    return monkeyValue;
  }
  const [monkey1, operation, monkey2] = monkeyValue.split(" ");
  switch (operation) {
    case "+":
      return getResult(monkeyData[monkey1]) + getResult(monkeyData[monkey2]);
    case "-":
      return getResult(monkeyData[monkey1]) - getResult(monkeyData[monkey2]);
    case "*":
      return getResult(monkeyData[monkey1]) * getResult(monkeyData[monkey2]);
    case "/":
      return getResult(monkeyData[monkey1]) / getResult(monkeyData[monkey2]);
  }
};

const part1 = (data) => {
  console.log(getResult(data["root"]));
};

const part2 = (data) => {
  console.log();
};

console.time("part1");
part1(monkeyData);
console.timeEnd("part1");
console.time("part2");
part2(data);
console.timeEnd("part2");
