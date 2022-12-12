import { readFileSync } from "fs";
const input = readFileSync("./input.txt", { encoding: "utf8" });
const data = input.split("\n");

const getTailPositions = (knots) => {
  // create placeholder for knot positions
  const knotPositions = Array.from(Array(knots), () => [[0, 0]]);
  let knot = 0;
  for (const instruction of data) {
    const [direction, turns] = instruction.split(" ");
    for (let i = 1; i <= Number(turns); i++) {
      const [x, y] = knotPositions[knot].at(-1);

      // move head
      switch (direction) {
        case "R":
          knotPositions[knot].push([x + 1, y]);
          break;
        case "D":
          knotPositions[knot].push([x, y - 1]);
          break;
        case "L":
          knotPositions[knot].push([x - 1, y]);
          break;
        case "U":
          knotPositions[knot].push([x, y + 1]);
          break;
      }

      // move tails (head is knot 0)
      for (let k = 1; k < knots; k++) {
        const [x, y] = knotPositions[k - 1].at(-1);
        const [tx, ty] = knotPositions[k].at(-1);
        const d = Math.max(Math.abs(tx - x), Math.abs(ty - y));
        if (d > 1) {
          if (ty === y) {
            // go horizontal
            knotPositions[k].push([
              (knotPositions[k].at(-1)[0] += x > tx ? 1 : -1),
              ty,
            ]);
          } else if (tx == x) {
            // go vertical
            knotPositions[k].push([
              tx,
              (knotPositions[k].at(-1)[1] += y > ty ? 1 : -1),
            ]);
          } else {
            // go diagonal
            knotPositions[k].push([
              (knotPositions[k].at(-1)[0] += x > tx ? 1 : -1),
              (knotPositions[k].at(-1)[1] += y > ty ? 1 : -1),
            ]);
          }
        }
      }

      // visualize
      // const c = knotPositions.map((t) => `${t.at(-1)[0]}-${t.at(-1)[1]}`);
      // const max = Math.max(
      //   ...knotPositions.map((t) => Math.max(...t.map((u) => Math.max(...u))))
      // );

      // for (let i = 0; i <= max; i++) {
      //   let a = "";
      //   for (let j = 0; j <= max; j++) {
      //     const b = c.indexOf(`${i}-${j}`);
      //     const lastIndex = c.length - 1;
      //     if (b > -1) {
      //       switch (b) {
      //         case 0:
      //           a += "H";
      //           break;
      //         case lastIndex:
      //           a += "T";
      //           break;
      //         default:
      //           a += b;
      //       }
      //     } else {
      //       a += ".";
      //     }
      //   }
      //   console.log(a);
      // }
      // console.log(`-------------------`);
    }
  }

  return knotPositions;
};

const getUniqueTailPositions = (knots) => {
  const tailPositions = getTailPositions(knots);

  // How many positions does the tail of the rope visit at least once?
  // adding 1 for the starting position
  return (
    new Set([...tailPositions.at(-1).map(([x, y]) => `${x}-${y}`)]).size + 1
  );
};

const part1 = (knots) => {
  console.log(getUniqueTailPositions(knots));
};

const part2 = (knots) => {
  console.log(getUniqueTailPositions(knots));
};

part1(2);
part2(10);
