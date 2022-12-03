import { readFileSync } from "fs";
const input = readFileSync("./input.txt", { encoding: "utf8" });
const data = input.split("\n");

const part1 = (rucksacks) => {
  const rucksackCommonItems = rucksacks.map((rucksack) => {
    const firstCompartment = rucksack.substr(0, rucksack.length / 2);
    const secondCompartment = rucksack.substr(rucksack.length / 2);
    return firstCompartment
      .split("")
      .find((item) => secondCompartment.indexOf(item) > -1);
  });
  const itemPriorities = rucksackCommonItems.map((item) => {
    return item.charCodeAt() - (/[a-z]/.test(item) ? 96 : 38);
  });
  console.log(
    itemPriorities.reduce((sum, itemPriority) => sum + itemPriority, 0)
  );
};

const part2 = (data) => {
  console.log();
};

part1(data);
part2(data);
