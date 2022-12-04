import { readFileSync } from "fs";
const input = readFileSync("./input.txt", { encoding: "utf8" });
const data = input.split("\n");

const part1 = (data) => {
  const overlappingPairs = data.filter((task) => {
    const tasks = task.split(",").map((r) => r.split("-").map(Number));
    return (
      (tasks[0][0] <= tasks[1][0] && tasks[0][1] >= tasks[1][1]) ||
      (tasks[1][0] <= tasks[0][0] && tasks[1][1] >= tasks[0][1])
    );
  });

  console.log(overlappingPairs.length);
};

const part2 = (data) => {
  const nonOverlappingPairs = data.filter((task) => {
    const tasks = task.split(",").map((r) => r.split("-").map(Number));
    return !(tasks[0][1] < tasks[1][0] || tasks[1][1] < tasks[0][0]);
  });

  console.log(nonOverlappingPairs.length);
};

part1(data);
part2(data);
