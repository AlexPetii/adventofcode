const fs = require("fs");

function RamRun(wh = 70, simulate = 1024) {
  let bytes = data.split("\n");
  let queue = [{ x: 0, y: 0, steps: 0 }];
  let visited = new Set(bytes.slice(0, simulate));
  while (queue.length) {
    let curr = queue.shift();
    if (curr.x === wh && curr.y === wh) return curr.steps;
    let neighbors = [
      { x: curr.x - 1, y: curr.y },
      { x: curr.x + 1, y: curr.y },
      { x: curr.x, y: curr.y - 1 },
      { x: curr.x, y: curr.y + 1 },
    ].filter(
      ({ x, y }) =>
        x >= 0 && x <= wh && y >= 0 && y <= wh && !visited.has(`${x},${y}`)
    );
    neighbors.forEach((neighbors) => {
      visited.add(`${neighbors.x},${neighbors.y}`);
      queue.push({ ...neighbors, steps: curr.steps + 1 });
    });
  }
}

function part2(wh = 70, simulate = 1024) {
  let bytes = data.split("\n");
  for (let i = simulate; i < bytes.length; i++) {
    if (!RamRun(wh, i)) return bytes[i - 1];
  }
}

const data = fs.readFileSync("input.txt", "utf8");

console.log(RamRun());
console.log(part2());
