import { readFileSync } from "fs";
const input = readFileSync("./input.txt", { encoding: "utf8" });
const data = input.split("\n");

const part1 = (rucksacks) => {
  const rucksackCommonItems = rucksacks.map((rucksack) => {
    const allItems = rucksack.split("");
    const firstCompartment = allItems.slice(0, allItems.length / 2);
    const secondCompartment = allItems.slice(allItems.length / 2);
    return firstCompartment.find((item) => secondCompartment.includes(item));
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
