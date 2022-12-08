import { readFileSync } from "fs";
const input = readFileSync("./input.txt", { encoding: "utf8" });
const data = input.split("\n").map((row) => row.split("").map(Number));

const part1 = (data) => {
  let coveredTrees = 0;

  // ignore outer edge so we start from index 1 <---> length - 1 horizontal and vertical
  for (let i = 1; i < data.length - 1; i++) {
    for (let j = 1; j < data[0].length - 1; j++) {
      const tree = data[i][j];

      const topTrees = data.slice(0, i).map((row) => row[j]);
      const topCovered = topTrees.some((h) => h >= tree);
      if (!topCovered) continue;

      const rightTrees = data[i].slice(j + 1);
      const rightCovered = rightTrees.some((h) => h >= tree);
      if (!rightCovered) continue;

      const bottomTrees = data.slice(i + 1).map((row) => row[j]);
      const bottomCovered = bottomTrees.some((h) => h >= tree);
      if (!bottomCovered) continue;

      const leftTrees = data[i].slice(0, j);
      const leftCovered = leftTrees.some((h) => h >= tree);
      if (!leftCovered) continue;

      // if we are here that means we are coverd in all directions
      coveredTrees += 1;
    }
  }

  // how many trees are visible from outside the grid?
  const totalTrees = data.length * data[0].length;
  console.log(totalTrees - coveredTrees);
};

const part2 = (data) => {
  let scenicScores = [];

  // ignore outer edge so we start from index 1 <---> length - 1 horizontal and vertical
  for (let i = 1; i < data.length - 1; i++) {
    for (let j = 1; j < data[0].length - 1; j++) {
      const tree = data[i][j];
      const view = [];

      const topTrees = data.slice(0, i).map((row) => row[j]);
      if (topTrees.length) {
        // reverse before pushing since we are looking towards top
        view.push(topTrees.reverse());
      }

      const rightTrees = data[i].slice(j + 1);
      if (rightTrees.length) {
        view.push(rightTrees);
      }

      const bottomTrees = data.slice(i + 1).map((row) => row[j]);
      if (bottomTrees.length) {
        view.push(bottomTrees);
      }

      const leftTrees = data[i].slice(0, j);
      if (leftTrees.length) {
        // reverse before pushing since we are looking towards left
        view.push(leftTrees.reverse());
      }

      // scenic score is found by multiplying together its viewing distance
      const scenicScore = view.reduce((accumulator, trees) => {
        const blockingTreeIndex = trees.findIndex((t) => t >= tree);
        // if we can't find any blocking trees that means we can see all the avialable trees to that direction
        // findIndex gives -1 in this sittuation otherwise it gives us the index of blocking tree
        const viewingDistance =
          blockingTreeIndex < 0 ? trees.length : blockingTreeIndex + 1;
        return accumulator * viewingDistance;
      }, 1);

      scenicScores.push(scenicScore);
    }
  }
  // What is the highest scenic score possible for any tree?
  console.log(Math.max(...scenicScores));
};

part1(data);
part2(data);
