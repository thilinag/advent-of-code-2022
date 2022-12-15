import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });

// separate stackLines and movesLines
const [stackData, movesData] = input.split("\n\n");

const stackRows = stackData.split("\n");

// use move line format to put numberOfItemstoMove, from and to data to an array
const moves = movesData.split("\n").map((move) => {
  const matches = move.match(/move (\d*) from (\d*) to (\d*)/);
  return [Number(matches[1]), Number(matches[2]), Number(matches[3])];
});

// separate the stack base info
const stackBase = stackRows.pop();
// get the nmber of stacks by looking at last number in stack base
const numberOfStacks = stackBase.trim().at(-1);

const startingStacks = [];
for (let j = 0; j < stackRows.length; j++) {
  const stackRow = stackRows[j];
  for (let i = 1; i <= numberOfStacks; i++) {
    // find the matching stack
    const stackItem = stackRow.at(stackBase.indexOf(i));
    if (stackItem !== " ") {
      // if there is an item there, prepend it to the array
      startingStacks[i - 1] = [stackItem, ...(startingStacks[i - 1] || [])];
    }
  }
}

const part1 = () => {
  // get a copy of stack so we don't affect part2
  // since we are mutating the array
  const part1Stacks = Array.from(startingStacks).map((row) => Array.from(row));

  // rearrangement procedure
  for (let [numberOfItemstoMove, from, to] of moves) {
    for (let i = 0; i < numberOfItemstoMove; i++) {
      part1Stacks[to - 1] = [
        ...part1Stacks[to - 1],
        part1Stacks[from - 1].pop(),
      ];
    }
  }

  // After the rearrangement procedure completes,
  // what crate ends up on top of each stack?
  console.log(part1Stacks.map((stack) => stack.at(-1)).join(""));
};

const part2 = () => {
  // get a copy of stack so we don't affect part2
  // since we are mutating the array
  const part2Stacks = Array.from(startingStacks).map((row) => Array.from(row));

  // rearrangement procedure
  for (let [numberOfItemstoMove, from, to] of moves) {
    const fromStack = part2Stacks[from - 1];
    // get moving item stack
    const itemsToMove = fromStack.slice(numberOfItemstoMove * -1);
    // remove moving item stack original stack
    fromStack.splice(
      fromStack.length - numberOfItemstoMove,
      numberOfItemstoMove
    );
    // add to destination stack
    part2Stacks[to - 1] = [...part2Stacks[to - 1], ...itemsToMove];
  }

  // After the rearrangement procedure completes,
  // what crate ends up on top of each stack?
  console.log(part2Stacks.map((stack) => stack.at(-1)).join(""));
};

part1();
part2();
