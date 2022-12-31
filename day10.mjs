import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });
const data = input.split("\n");

const part1 = (data) => {
  const recordedCycles = [];
  const instructions = [...data];
  let buffer = 1;
  let lastInstruction;
  let cycle = 1;
  let X = 1;
  do {
    buffer--;

    // end when we run out of instructions and also the buffer tasks are done
    if (buffer === 0 && instructions.length === 0) break;

    if (buffer === 0) {
      // we have completed all tasks
      if (lastInstruction && lastInstruction.startsWith("addx")) {
        // execute instruction
        X += Number(lastInstruction.split(" ")[1]);
      }

      // get the top instruction and remove it from list
      lastInstruction = instructions.shift();
      if (lastInstruction === "noop") {
        // add one cycle
        buffer = 1;
      } else {
        // add two cycles
        buffer = 2;
      }
    }

    // if 20th, 60th, 100th, 140th, 180th, or 220th
    if (cycle % 40 === 20) {
      // signal strength (the cycle number multiplied by the value of the X register
      recordedCycles.push(X * cycle);
    }

    cycle++;
  } while (buffer > 0); // run till all buffer tasks are complete

  console.log(
    // What is the sum of 20th, 60th, 100th, 140th, 180th, or 220th signal strengths
    recordedCycles.reduce((prevSum, current) => current + prevSum, 0)
  );
};

const part2 = (data) => {
  //create placeholder screen
  const crtRows = Array.from(Array(6), () => []);
  const instructions = [...data];
  let buffer = 1;
  let lastInstruction;
  let cycle = 1;
  let X = 1;

  do {
    buffer--;

    // end when we run out of instructions and also the buffer tasks are done
    if (buffer === 0 && instructions.length === 0) break;

    if (buffer === 0) {
      // we have completed all tasks
      if (lastInstruction && lastInstruction.startsWith("addx")) {
        // execute instruction
        X += Number(lastInstruction.split(" ")[1]);
      }
      // get the top instruction and remove it from list
      lastInstruction = instructions.shift();
      if (lastInstruction === "noop") {
        // add one cycle
        buffer = 1;
      } else {
        // add two cycles
        buffer = 2;
      }
    }

    const rowLength = 40;
    // find the current row
    const row = Math.floor((cycle - 1) / rowLength);
    // the sprite is 3 pixels wide,
    // and the X register sets the horizontal position of the middle of that sprite
    const sprite = [X - 1, X, X + 1];
    // check if sprite intersecting the cycle pixel
    const cycleIntersection = sprite.indexOf((cycle - 1) % rowLength);
    // if intersection the screen produces a lit pixel (#);
    // otherwise, the screen leaves the pixel dark (.).
    crtRows[row].push(cycleIntersection > -1 ? "🟨" : "⬛");

    cycle++;
  } while (buffer > 0); // run till all buffer tasks are complete

  // What eight capital letters appear on your CRT?
  for (const row of crtRows) {
    console.log(row.join(""));
  }
};

console.time("part1");
part1(data);
console.timeEnd("part1");
console.time("part2");
part2(data);
console.timeEnd("part2");
