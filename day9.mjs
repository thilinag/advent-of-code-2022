import { readFileSync } from "fs";
const input = readFileSync("./input.txt", { encoding: "utf8" });
const data = input.split("\n");

const part1 = (data) => {
  const tailPositions = [];
  let headPosition = [0, 0];
  let turnCount = 1;
  for (const instruction of data) {
    const [direction, turns] = instruction.split(" ");
    for (let i = 1; i <= Number(turns); i++) {
      const [x, y] = headPosition;
      const [tx, ty] = tailPositions.at(-1) || [0, 0];

      // const b = [...tailPositions];
      // for (let i = 0; i <= 5; i++) {
      //   let a = "";
      //   for (let j = 0; j <= 5; j++) {
      //     if (x === i && y === j) {
      //       a += "H";
      //     } else if (tx === i && ty === j) {
      //       a += "T";
      //     } else {
      //       a += ".";
      //     }
      //   }
      //   console.log(a);
      // }
      // console.log(`---${turnCount}----------------`);

      switch (direction) {
        case "R":
          headPosition = [x + 1, y];
          if (Math.abs(tx - (x + 1)) > 1 || Math.abs(ty - y) > 1) {
            tailPositions.push([x, y]);
          }
          break;
        case "D":
          headPosition = [x, y - 1];
          if (Math.abs(tx - x) > 1 || Math.abs(ty - (y - 1)) > 1) {
            tailPositions.push([x, y]);
          }
          break;
        case "L":
          headPosition = [x - 1, y];
          if (Math.abs(tx - (x - 1)) > 1 || Math.abs(ty - y) > 1) {
            tailPositions.push([x, y]);
          }
          break;
        case "U":
          headPosition = [x, y + 1];
          if (Math.abs(tx - x) > 1 || Math.abs(ty - (y + 1)) > 1) {
            tailPositions.push([x, y]);
          }
          break;
      }
      turnCount++;
    }
  }
  const uniqueTailPositions = new Set([
    ...tailPositions.map(([x, y]) => `${x}-${y}`),
  ]);
  console.log(uniqueTailPositions.size + 1);
};

const part2 = (knots) => {
  const tailPositions = Array(knots - 1).fill([[0, 0]]);
  console.log(tailPositions);
  let currentKnot = 0;

  let headPosition = [0, 0];

  // console.log(headPosition);
  // let turnCount = 1;
  for (const instruction of data) {
    const [direction, turns] = instruction.split(" ");
    for (let i = 1; i <= Number(turns); i++) {
      const [x, y] = headPosition;
      // const [tx, ty] = tailPositions[currentKnot]?.at(-1) || [0, 0];
      // if (!tailPositions[currentKnot]) {
      //   tailPositions.push([
      //     tailPositions[currentKnot - 1]?.at(-1) || [0, 0],
      //   ]);
      // }

      // const b = [...tailPositions];
      // for (let i = 0; i <= 5; i++) {
      //   let a = "";
      //   for (let j = 0; j <= 5; j++) {
      //     if (x === i && y === j) {
      //       a += "H";
      //     } else if (tx === i && ty === j) {
      //       a += "T";
      //     } else {
      //       a += ".";
      //     }
      //   }
      //   console.log(a);
      // }
      // console.log(`---${turnCount}----------------`);

      switch (direction) {
        case "R":
          headPosition = [x + 1, y];
          let knot = 0;
          do {
            let [tx, ty] = tailPositions[knot - 1]?.at(-1) || [0, 0];
            if (Math.abs(tx - (x + 1)) > 1 || Math.abs(ty - y) > 1) {
              tailPositions[knot] = [
                ...(tailPositions[knot] || []),
                ...(knot === 0 ? [[x, y]] : [[tx, ty]]),
              ];
            }
            knot++;
          } while (knot < knots - 1);
          break;
        case "D":
          headPosition = [x, y - 1];
          if (Math.abs(tx - x) > 1 || Math.abs(ty - (y - 1)) > 1) {
            tailPositions[currentKnot] = [
              ...(tailPositions[currentKnot] || []),
              [x, y],
            ];
          }
          break;
        case "L":
          headPosition = [x - 1, y];
          if (Math.abs(tx - (x - 1)) > 1 || Math.abs(ty - y) > 1) {
            tailPositions[currentKnot] = [
              ...(tailPositions[currentKnot] || []),
              [x, y],
            ];
          }
          break;
        case "U":
          headPosition = [x, y + 1];
          if (Math.abs(tx - x) > 1 || Math.abs(ty - (y + 1)) > 1) {
            tailPositions[currentKnot] = [
              ...(tailPositions[currentKnot] || []),
              [x, y],
            ];
          }
          break;
      }
      // turnCount++;
    }
  }

  console.log({ currentKnot, headPosition }, JSON.stringify(tailPositions));

  // while (currentKnot < knots - 1) {
  //   if (tailPositions.length === 0) {
  //     tailPositions.push([[0, 0]]);
  //   }
  //   // let headPosition = tailPositions[currentKnot - 1]?.[0] || [0, 0];

  //   console.log({ roundtail: JSON.stringify(tailPositions) });

  //   currentKnot++;
  // }

  // console.log(tailPositions);

  // const uniqueTailPositions = new Set([
  //   ...tailPositions[0].map(([x, y]) => `${x}-${y}`),
  // ]);
  // console.log(uniqueTailPositions.size);
};

part1(data);
part2(3);
//6248
