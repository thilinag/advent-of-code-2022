import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });
const data = input.split("\n\n");

const getCaloriesSumArray = (data) => {
  return data
    .map((elf) =>
      elf
        .split("\n") // get each elf's calorie total as an array
        .reduce((prevSum, calories) => prevSum + Number(calories), 0)
    )
    .sort((a, b) => b - a); // sort it DESC
};

const part1 = (data) => {
  const caloriesSumArr = getCaloriesSumArray(data);
  console.log(
    caloriesSumArr.at(0) // Sum of calories of the elf carrying the most calories)
  );
};

const part2 = (data) => {
  const caloriesSumArr = getCaloriesSumArray(data);
  console.log(
    caloriesSumArr
      .slice(0, 3) // get top 3 Elves carrying the most calories
      .reduce((p, c) => p + c, 0) // Calories sum of top 3 Elves carrying the most calories
  );
};

part1(data);
part2(data);
