import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });
const data = input.split("\n");

const getKnotPositions = (knots) => {
  // create placeholder for knot positions
  const knotPositions = Array.from(Array(knots), () => [[0, 0]]);
  let knot = 0;
  for (const instruction of data) {
    const [direction, turns] = instruction.split(" ");
    for (let i = 1; i <= Number(turns); i++) {
      const [x, y] = knotPositions[knot].at(-1);

      // move head
      let tailPosition;
      switch (direction) {
        case "R":
          tailPosition = [x + 1, y];
          break;
        case "D":
          tailPosition = [x, y - 1];
          break;
        case "L":
          tailPosition = [x - 1, y];
          break;
        case "U":
          tailPosition = [x, y + 1];
          break;
      }
      knotPositions[0].push(tailPosition);

      // move tails (head is knot 0)
      for (let k = 1; k < knots; k++) {
        const [prevX, prevY] = knotPositions[k - 1].at(-1);
        let [currentX, currentY] = knotPositions[k].at(-1);
        const d = Math.max(
          Math.abs(currentX - prevX),
          Math.abs(currentY - prevY)
        );
        let newTailPosition;
        if (d > 1) {
          if (currentY === prevY) {
            // go horizontal
            newTailPosition = [
              (currentX += prevX > currentX ? 1 : -1),
              currentY,
            ];
          } else if (currentX == prevX) {
            // go vertical
            newTailPosition = [
              currentX,
              (currentY += prevY > currentY ? 1 : -1),
            ];
          } else {
            // go diagonal
            newTailPosition = [
              (currentX += prevX > currentX ? 1 : -1),
              (currentY += prevY > currentY ? 1 : -1),
            ];
          }

          knotPositions[k].push(newTailPosition);
        }
      }
    }
  }

  return knotPositions;
};

const getUniqueTailPositions = (knots) => {
  const knotPositions = getKnotPositions(knots);
  const tailPositions = knotPositions.at(-1);

  // How many positions does the tail of the rope visit at least once?
  return new Set([...tailPositions.map(([x, y]) => `${x}-${y}`)]).size;
};

const part1 = (knots) => {
  console.log(getUniqueTailPositions(knots));
};

const part2 = (knots) => {
  console.log(getUniqueTailPositions(knots));
};

part1(2);
part2(10);
