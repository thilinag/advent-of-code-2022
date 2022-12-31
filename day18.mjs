import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });
const data = input.split("\n");

const part1 = (data) => {
  let surfaces = 0;
  const cubes = new Set(data);
  const cubePositions = data.map((line) => line.split(",").map(Number));

  // for each cube position
  for (const [x, y, z] of cubePositions) {
    // possible neighbors for this cube for all 6 sides
    const neighbors = [
      `${x + 1},${y},${z}`,
      `${x - 1},${y},${z}`,
      `${x},${y + 1},${z}`,
      `${x},${y - 1},${z}`,
      `${x},${y},${z + 1}`,
      `${x},${y},${z - 1}`,
    ];

    for (const neighbor of neighbors) {
      // check if there is a cube in possible neighbors
      // if there are no cubes, this side is exposed
      if (!cubes.has(neighbor)) {
        surfaces++;
      }
    }
  }

  // What is the surface area of your scanned lava droplet?
  console.log(surfaces);
};

// https://en.wikipedia.org/wiki/Breadth-first_search
// 1  procedure BFS(G, root) is
const fillOutside = (cubes, [minX, minY, minZ], [maxX, maxY, maxZ]) => {
  let surfaces = 0;
  // 2 let Q be a queue
  const queue = [];
  const visited = new Set();
  // 3 label root as explored
  visited.add(`${minX},${minY},${minZ}`);
  // 4 Q.enqueue(root)
  queue.push({ x: minX, y: minY, z: minZ });
  // 5 while Q is not empty do
  while (queue.length > 0) {
    // 6 v := Q.dequeue()
    const { x, y, z } = queue.shift();
    // 7 if v is the goal then
    // 8 return v
    // 9 for all edges from v to w in G.adjacentEdges(v) do
    const neighbors = [
      { x: x + 1, y, z },
      { x: x - 1, y, z },
      { x, y: y + 1, z },
      { x, y: y - 1, z },
      { x, y, z: z + 1 },
      { x, y, z: z - 1 },
    ];

    for (const neighbor of neighbors) {
      const { x, y, z } = neighbor;
      const key = `${x},${y},${z}`;

      if (cubes.has(key)) {
        // this is touching the lava droplet
        surfaces++;
        continue;
      }

      // 10 if w is not labeled as explored then
      if (visited.has(key)) {
        continue;
      }

      // 11 label w as explored
      visited.add(key);

      // 12 w.parent := v
      if (
        x > maxX ||
        y > maxY ||
        z > maxZ ||
        x < minX ||
        y < minY ||
        z < minZ
      ) {
        // point is out of bounds
        continue;
      }

      // 13 Q.enqueue(w)
      queue.push(neighbor);
    }
  }

  return surfaces;
};

const part2 = (data) => {
  const cubes = new Set(data);
  const cubePositions = data.map((line) => line.split(",").map(Number));
  const xPos = [];
  const yPos = [];
  const zPos = [];
  cubePositions.forEach((pos) => {
    xPos.push(pos[0]);
    yPos.push(pos[1]);
    zPos.push(pos[2]);
  });

  // make a cube 1 layer larger than the lava droplet,
  // then use DFS to fill it and find outside faces
  const minX = Math.min(...xPos) - 1;
  const maxX = Math.max(...xPos) + 1;
  const minY = Math.min(...yPos) - 1;
  const maxY = Math.max(...yPos) + 1;
  const minZ = Math.min(...zPos) - 1;
  const maxZ = Math.max(...zPos) + 1;

  // What is the exterior surface area of your scanned lava droplet?
  console.log(fillOutside(cubes, [minX, minY, minZ], [maxX, maxY, maxZ]));
};

console.time("part1");
part1(data);
console.timeEnd("part1");
console.time("part2");
part2(data);
console.timeEnd("part2");
