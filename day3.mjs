import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });
const data = input.split("\n");

const getItemPriority = (item) => {
  // item types a through z have priorities 1 through 26.
  // item types A through Z have priorities 27 through 52.
  // 'A'.charCodeAt() = 65
  // 'a'.charCodeAt() = 97
  return item.charCodeAt() - (/[a-z]/.test(item) ? 96 : 38);
};

const part1 = (rucksacks) => {
  const rucksackCommonItemPriorities = rucksacks.map((rucksack) => {
    const firstCompartment = rucksack.substr(0, rucksack.length / 2);
    const secondCompartment = rucksack.substr(rucksack.length / 2);
    const commonItem = firstCompartment
      .split("")
      .find((item) => secondCompartment.indexOf(item) > -1);

    return getItemPriority(commonItem);
  });
  console.log(
    rucksackCommonItemPriorities.reduce(
      (sum, itemPriority) => sum + itemPriority,
      0
    )
  );
};

const part2 = (rucksacks) => {
  const rucksackBadgesPriorities = [];
  for (let i = 0; i < rucksacks.length; i += 3) {
    const commonItem = rucksacks[i]
      .split("")
      .find(
        (item) =>
          rucksacks[i + 1].indexOf(item) > -1 &&
          rucksacks[i + 2].indexOf(item) > -1
      );
    const commonItemPriority = getItemPriority(commonItem);
    rucksackBadgesPriorities.push(commonItemPriority);
  }
  console.log(
    rucksackBadgesPriorities.reduce(
      (sum, itemPriority) => sum + itemPriority,
      0
    )
  );
};

part1(data);
part2(data);
