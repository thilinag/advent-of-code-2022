import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });
const data = input.split("\n");

const part1 = (data) => {
  const overlappingPairs = data.filter((task) => {
    const [[elf1Start, elf1End], [elf2Start, elf2End]] = task
      .split(",")
      .map((r) => r.split("-").map(Number));
    return (
      (elf1Start <= elf2Start && elf1End >= elf2End) ||
      (elf2Start <= elf1Start && elf2End >= elf1End)
    );
  });

  console.log(overlappingPairs.length);
};

const part2 = (data) => {
  const nonOverlappingPairs = data.filter((task) => {
    const [[elf1Start, elf1End], [elf2Start, elf2End]] = task
      .split(",")
      .map((r) => r.split("-").map(Number));
    return !(elf1End < elf2Start || elf2End < elf1Start);
  });

  console.log(nonOverlappingPairs.length);
};

part1(data);
part2(data);
