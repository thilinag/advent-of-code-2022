import { readFileSync } from "fs";
const input = readFileSync("./input.txt", { encoding: "utf8" });
const data = input.split("\n");

const getItemPriority = (item) => {
  // item types a through z have priorities 1 through 26.
  // item types A through Z have priorities 27 through 52.
  return item.charCodeAt() - (/[a-z]/.test(item) ? 96 : 38);
};

const part1 = (rucksacks) => {
  const rucksackCommonItems = rucksacks.map((rucksack) => {
    const firstCompartment = rucksack.substr(0, rucksack.length / 2);
    const secondCompartment = rucksack.substr(rucksack.length / 2);
    return firstCompartment
      .split("")
      .find((item) => secondCompartment.indexOf(item) > -1);
  });
  const itemPriorities = rucksackCommonItems.map((item) => {
    return getItemPriority(item);
  });
  console.log(
    itemPriorities.reduce((sum, itemPriority) => sum + itemPriority, 0)
  );
};

const part2 = (rucksacks) => {
  const rucksackBadges = [];
  for (let i = 0; i < rucksacks.length; i = i + 3) {
    const commonItem = rucksacks[i]
      .split("")
      .find(
        (item) =>
          rucksacks[i + 1].indexOf(item) > -1 &&
          rucksacks[i + 2].indexOf(item) > -1
      );
    rucksackBadges.push(commonItem);
  }

  const itemPriorities = rucksackBadges.map((item) => {
    return getItemPriority(item);
  });
  console.log(
    itemPriorities.reduce((sum, itemPriority) => sum + itemPriority, 0)
  );
};

part1(data);
part2(data);
