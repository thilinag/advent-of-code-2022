import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });
const data = input.split("\n");

const snafuDigits = {
  2: 2,
  1: 1,
  0: 0,
  "-": -1,
  "=": -2,
};

const getSnafu = (num) => {
  // convert to base 5
  const base5Str = num.toString(5);

  // reverse it so we can start from end
  const base5StrArrReversed = base5Str.split("").map(Number).reverse();

  let snafuReversed = [];

  for (let i = 0; i < base5StrArrReversed.length; i++) {
    let char = base5StrArrReversed[i];

    // only chars up to 2 allowed
    if (char > 2) {
      // get remainder
      char -= 5;
      // add one to next char
      base5StrArrReversed[i + 1] += 1;
    }

    // get allowed char from snafuDigits instead of -1 and -2
    snafuReversed.push(
      Object.keys(snafuDigits).find((key) => snafuDigits[key] === char)
    );
  }

  // fix the order
  return snafuReversed.reverse().join("");
};

const part1 = (data) => {
  const decimals = data.map((snafuNum) =>
    snafuNum
      .split("")
      .reduce(
        (p, c, i) => p + snafuDigits[c] * Math.pow(5, snafuNum.length - 1 - i),
        0
      )
  );

  const sum = decimals.reduce((p, c) => p + c, 0);

  console.log(getSnafu(sum));
};

const part2 = () => {
  console.log();
};

console.time("part1");
part1(data);
console.timeEnd("part1");
console.time("part2");
part2();
console.timeEnd("part2");
