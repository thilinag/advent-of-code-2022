import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const inputFileName = path.basename(fileURLToPath(import.meta.url), ".mjs");
const input = readFileSync(`./${inputFileName}.txt`, { encoding: "utf8" });
const data = {};
input.split("\n").forEach((line) => {
  const matches = line.match(
    /Valve (?<valve>[A-Z]{2}) has flow rate=(?<flowRate>\d+); tunnels? leads? to valves? (?<tunnels>.+)/
  );
  data[matches.groups.valve] = {
    flowRate: Number(matches.groups.flowRate),
    tunnels: matches.groups.tunnels.split(", "),
  };
});

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

const part1 = (data) => {
  console.log(data);
};

const part2 = (data) => {
  console.log();
};

console.time("part1");
part1(data);
console.timeEnd("part1");
console.time("part2");
part2(data);
console.timeEnd("part2");
