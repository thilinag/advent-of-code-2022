import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });
let start, end;

const getCharValue = (char) => char.charCodeAt();

const data = input.split("\n").map((row) => [...row]);

const dataAsNumbers = data.map((row, rowIndex) =>
  row.map((char, colIndex) => {
    if (char === "S") {
      start = [rowIndex, colIndex];
      return 0;
    }
    if (char === "E") {
      end = [rowIndex, colIndex];
      return 25;
    } else return getCharValue(char) - getCharValue("a");
  })
);

const getNeighbors = (row, col, matrix, part2) => {
  const neighbors = [];
  const current = matrix[row][col];

  if (!part2) {
    // check for out of bounds
    // part 1 conditions
    // also the elevation of the destination square can be at most one higher
    // than the elevation of your current square;
    if (col + 1 < matrix[row].length && matrix[row][col + 1] <= current + 1) {
      neighbors.push({ row, col: col + 1 });
    }

    if (col - 1 >= 0 && matrix[row][col - 1] <= current + 1) {
      neighbors.push({ row, col: col - 1 });
    }

    if (row + 1 < matrix.length && matrix[row + 1][col] <= current + 1) {
      neighbors.push({ row: row + 1, col });
    }

    if (row - 1 >= 0 && matrix[row - 1][col] <= current + 1) {
      neighbors.push({ row: row - 1, col });
    }
  } else {
    // part 2 conditions
    // go in reverse path so we can go from E -> a
    // so the elevation of the destination square can be at most one less
    // than the elevation of your current square;
    if (col + 1 < matrix[row].length && matrix[row][col + 1] >= current - 1) {
      neighbors.push({ row, col: col + 1 });
    }

    if (col - 1 >= 0 && matrix[row][col - 1] >= current - 1) {
      neighbors.push({ row, col: col - 1 });
    }

    if (row + 1 < matrix.length && matrix[row + 1][col] >= current - 1) {
      neighbors.push({ row: row + 1, col });
    }

    if (row - 1 >= 0 && matrix[row - 1][col] >= current - 1) {
      neighbors.push({ row: row - 1, col });
    }
  }
  return neighbors;
};

/* 
https://en.wikipedia.org/wiki/Breadth-first_search
 1  procedure BFS(G, root) is
 2      let Q be a queue
 3      label root as explored
 4      Q.enqueue(root)
 5      while Q is not empty do
 6          v := Q.dequeue()
 7          if v is the goal then
 8              return v
 9          for all edges from v to w in G.adjacentEdges(v) do
10              if w is not labeled as explored then
11                  label w as explored
12                  w.parent := v
13                  Q.enqueue(w)
*/

const getPath = (matrix, part2, start, end = null) => {
  // let Q be a queue
  const queue = [];
  const visited = {};
  const [row, col] = start;

  // record 'a' location for part 2
  let goalKey;

  // label root as explored
  visited[`${row}-${col}`] = {
    key: `${row}-${col}`,
  };
  // Q.enqueue(root)
  queue.push({ row, col });

  // while Q is not empty do
  while (queue.length > 0) {
    // v := Q.dequeue()
    const { row, col } = queue.shift();
    const currentKey = `${row}-${col}`;

    // if v is the goal then stop
    if (!part2 && row === end[0] && col === end[1]) {
      break;
    }

    // if we reach 'a', then stop
    if (part2 && matrix[row][col] === 0) {
      break;
    }

    // for all edges from v to w in G.adjacentEdges(v) do
    const neighbors = getNeighbors(row, col, matrix, part2);
    for (let i = 0; i < neighbors.length; i++) {
      const { row: neighborRow, col: neighborCol } = neighbors[i];
      const key = `${neighborRow}-${neighborCol}`;

      // if w is not labeled as explored then
      if (key in visited) {
        continue;
      }

      // label w as explored
      // w.parent := v
      visited[key] = {
        key: currentKey,
      };

      if (part2 && matrix[neighborRow][neighborCol] === 0) {
        goalKey = key;
      }

      // Q.enqueue(w)
      queue.push(neighbors[i]);
    }
  }

  const path = [];
  let startKey = `${row}-${col}`;
  let currentKey = !part2 ? `${end[0]}-${end[1]}` : goalKey;

  // backtrack on visited nodes till we find the destination
  while (currentKey !== startKey) {
    //const [currentRow, currentCol] = currentKey.split("-").map(Number);
    path.push(currentKey);
    currentKey = visited[currentKey].key;
  }

  return path;
};

const drawPath = (matrix, path, part2 = false) => {
  const colors = [
    "\x1b[42m",
    "\x1b[43m",
    "\x1b[44m",
    "\x1b[46m",
    "\x1b[41m",
    "\x1b[47m",
  ];
  for (let row = 0; row < matrix.length; row++) {
    const pathPoints = [];
    let rowLine = "";
    for (let col = 0; col < matrix[row].length; col++) {
      const current = matrix[row][col];
      pathPoints.push(current);
      if (path.includes(`${row}-${col}`) || (!part2 && current === "S")) {
        rowLine += "\x1b[40m%s\x1b[0m";
      } else {
        let color = colors[0];
        const currentChar = current.charCodeAt() - "a".charCodeAt();
        if (currentChar > 22) {
          color = colors[5];
        } else if (currentChar > 12) {
          color = colors[4];
        } else if (currentChar > 5) {
          color = colors[3];
        } else if (currentChar > 2) {
          color = colors[2];
        } else if (currentChar > 1) {
          color = colors[1];
        }

        rowLine += `${color}%s\x1b[0m`;
      }
    }
    console.log(rowLine, ...pathPoints);
  }
};

const part1 = () => {
  const path = getPath(dataAsNumbers, false, start, end);
  drawPath(data, path);
  console.log(path.length);
};

const part2 = () => {
  const path = getPath(dataAsNumbers, true, end);
  drawPath(data, path, true);
  console.log(path.length);
};

console.time("part1");
part1(data);
console.timeEnd("part1");
console.time("part2");
part2(data);
console.timeEnd("part2");
