import { readFileSync } from "fs";
const input = readFileSync("./input.txt", { encoding: "utf8" });
const data = input.split('');

const getMarker = (sequence) => {
  let paketMarker;
  for (let i = sequence - 1; i < data.length; i++) {
    const set = new Set()
    for (let j = 0; j < sequence; j++) {
      set.add(data[i-j])
    }
    if (set.size === sequence) {
      paketMarker = i + 1
      break
    }
  }

  return paketMarker
}

const part1 = (data) => {
  const sequence = 4;

  console.log(getMarker(sequence))
};

const part2 = (data) => {
  const sequence = 14;
  
  console.log(getMarker(sequence))
};

part1(data);
part2(data);
