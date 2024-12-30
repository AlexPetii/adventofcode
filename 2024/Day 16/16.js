const fs = require("fs");

function parse(data) {
  let map = data.split("\n").map((line) => line.split(""));
  let y = map.findIndex((line) => line.includes("S"));
  let x = map[y].indexOf("S");
  let ey = map.findIndex((line) => line.includes("E"));
  let ex = map[ey].indexOf("E");
  return { map, start: { x, y, direction: "right" }, end: { x: ex, y: ey } };
}

function getNeighbors(map, current) {
  let opposite = { up: "down", down: "up", left: "right", right: "left" };
  let neighbors = [
    { x: current.x - 1, y: current.y, direction: "left" },
    { x: current.x + 1, y: current.y, direction: "right" },
    { x: current.x, y: current.y - 1, direction: "up" },
    { x: current.x, y: current.y + 1, direction: "down" },
  ]
    .filter((n) => n.direction !== opposite[current.direction])
    .filter((n) => map[n.y]?.[n.x] !== "#")
    .map((n) => ({
      ...n,
      path: new Set([...current.path, `${n.x},${n.y}`]),
      score: current.score + (n.direction !== current.direction ? 1001 : 1),
    }));
  return neighbors;
}

function solve(data) {
  let key = (p) => `${p.x},${p.y},${p.direction}`;
  let { map, start, end } = parse(data);
  let curr = { ...start, score: 0, path: new Set([`${start.x},${start.y}`]) };
  let queue = [curr];
  let visited = new Map([[key(curr), curr]]);
  let score = Infinity;
  let titles;
  while (queue.length > 0) {
    curr = queue.shift();
    if (curr.x === end.x && curr.y === end.y) {
      if (curr.score < score) {
        titles = curr.path.size;
        score = Math.min(score, curr.score);
        continue;
      }
    }
    getNeighbors(map, curr).forEach((n) => {
      let prev = visited.get(key(n));
      if (!prev || prev.score > n.score) {
        queue.push(n);
        visited.set(key(n), n);
      } else if (prev.score === n.score) {
        prev.path = new Set([...prev.path, ...n.path]);
      }
    });
  }return {score, titles}
}

const data = fs.readFileSync("input.txt", "utf8");

function part1() {
  return solve(data).score;
}

function part2(){
    return solve(data).titles
}

console.log(part1());
console.log(part2())