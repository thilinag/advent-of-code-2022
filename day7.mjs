import { readFileSync } from "fs";
const input = readFileSync("./input.txt", { encoding: "utf8" });
const data = input.split("\n");

const getPath = (history) => history.join("/");

const getTree = (data) => {
  const tree = {};
  const history = [];

  for (let line of data) {
    const currentDir = getPath(history);

    // we are doing a dir operation
    if (line.indexOf("$ cd") > -1) {
      const dir = line.split(" ")[2];
      if (dir === "..") {
        // we are going back, add the current dir total to parent
        // remove from history
        history.pop();
        tree[getPath(history)] += tree[currentDir];
        continue;
      }

      // we are going into a dir, record in history
      history.push(dir);
      tree[getPath(history)] = tree[getPath(history)] || 0;
      continue;
    }

    if (/\d+ .+/.test(line)) {
      // this is a file, add it to the total
      const size = Number(line.split(" ")[0]);
      tree[currentDir] += size;
    }
  }

  // we are not in the root directory yet
  // do the size calcs add add totals till we reach root
  for (let i = history.length; i > 1; i--) {
    const curentDir = history.slice(0, i).join("/");
    const previousDir = history.slice(0, i - 1).join("/");
    tree[previousDir] += tree[curentDir];
  }

  return tree;
};

const part1 = (data) => {
  const tree = getTree(data);
  // Find all of the directories with a total size of at most 100000.
  // What is the sum of the total sizes of those directories?
  console.log(
    Object.values(tree)
      .filter((s) => s <= 100000)
      .reduce((p, c) => p + c, 0)
  );
};

const part2 = (data) => {
  const TOTAL_DISK_SPACE = 70000000;
  const REQUIRED_UNUSED_DISK_SPACE = 30000000;

  const tree = getTree(data);

  const unusedSpace = TOTAL_DISK_SPACE - tree["/"];
  const requiredSpace = REQUIRED_UNUSED_DISK_SPACE - unusedSpace;

  // Find the smallest directory that, if deleted, would free up enough space on the
  // filesystem to run the update. What is the total size of that directory?
  console.log(
    Object.values(tree)
      .sort((a, b) => a - b)
      .find((dirSpace) => dirSpace > requiredSpace)
  );
};

part1(data);
part2(data);
