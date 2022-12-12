import { readFileSync } from "fs";
const input = readFileSync("./input.txt", { encoding: "utf8" });

// no eval :P
const getOperation = (operationData) => {
  if (operationData === "old * old") {
    return (x) => x * x;
  }

  // eg. old * 5
  if (/old \* \d+/.test(operationData)) {
    const num = Number(operationData.split(" ")[2]);
    return (x) => x * num;
  }

  // eg. old + 5
  if (/old \+ \d+/.test(operationData)) {
    const num = Number(operationData.split(" ")[2]);
    return (x) => x + num;
  }
};

const parseData = () => {
  /* eg:
  Monkey 0:
    Starting items: 92, 73, 86, 83, 65, 51, 55, 93
    Operation: new = old * 5
    Test: divisible by 11
      If true: throw to monkey 3
      If false: throw to monkey 4
  */
  return input.split("\n\n").map((monkeyLines) => {
    const [
      _,
      itemsLine,
      operationsLine,
      testLine,
      testTrueLine,
      testFalseLine,
    ] = monkeyLines.split("\n");
    const itemsData = itemsLine
      .split("  Starting items: ")[1]
      .split(", ")
      .map(Number);
    const operationData = operationsLine.split("  Operation: new = ")[1];

    return {
      items: itemsData,
      operation: getOperation(operationData),
      test: {
        division: Number(testLine.split("  Test: divisible by ")[1]),
        0: Number(testFalseLine.split("    If false: throw to monkey ")[1]),
        1: Number(testTrueLine.split("    If true: throw to monkey ")[1]),
      },
      inspected: 0, // we will accumilate inspected counts here
    };
  });
};

const getMonkeyBusuness = (monkeys) => {
  // monkey business = product of the two most active monkeys inspected items

  const monkeysInspectedItems = monkeys.map((m) => m.inspected);
  const monkeysInspectedItemsSorted = monkeysInspectedItems.sort(
    (a, b) => b - a
  );

  return monkeysInspectedItemsSorted[0] * monkeysInspectedItemsSorted[1];
};

const part1 = (rounds) => {
  let round = 1;
  const monkeys = parseData();
  while (round <= rounds) {
    for (const monkey of monkeys) {
      const items = [...monkey.items];
      for (const item of items) {
        // remove top item
        monkey.items.shift();
        // monkey has seen an item
        monkey.inspected += 1;
        // do the operation
        // monkey's inspection didn't damage the item
        // causes worry level to be divided by three
        const worryLevel = Math.floor(monkey.operation(item) / 3);
        // find which monkey we are passing to and pass it
        monkeys[
          monkey.test[String(+(worryLevel % monkey.test.division === 0))]
        ].items.push(worryLevel);
      }
    }

    round++;
  }

  console.log(getMonkeyBusuness(monkeys));
};

const part2 = (rounds) => {
  let round = 1;
  const monkeys = parseData();

  const divisionMod = monkeys
    .map((m) => m.test.division)
    .reduce((p, c) => p * c, 1);

  while (round <= rounds) {
    for (const monkey of monkeys) {
      const items = [...monkey.items];
      for (const item of items) {
        // remove top item
        monkey.items.shift();
        // monkey has seen an item
        monkey.inspected += 1;
        // do the operation
        let worryLevel = monkey.operation(item);

        // tried with BigInt but old * old etc causing numbers to go to ridiculous levels.

        // Trick learned from reddit to keep the numbers in managable size.
        // If you look at all the monkeys, the test is always a prime number.
        // To make sure that each monkey's test continues to work, if we modulo
        // by the product of those prime numbers, the tests will still work but the number
        // will be bounded instead of growing to infinite length causing js number
        // limits to exeed

        worryLevel %= divisionMod;

        // find which monkey we are passing to and pass it
        monkeys[
          monkey.test[String(+(worryLevel % monkey.test.division === 0))]
        ].items.push(worryLevel);
      }
    }

    round++;
  }

  console.log(getMonkeyBusuness(monkeys));
};

part1(20);
part2(10000);
