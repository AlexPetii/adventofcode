const fs = require("fs");

function trailhead(input) {
const data = input || fs.readFileSync("input.txt", "utf8");
  let sum = 0;
  const map = data.split("\n").map((line) => line.split(""));
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "0") {
        let queue = [{ x, y }];
        let visited = new Set();
        while (queue.length > 0) {
          const { x, y } = queue.shift();
          if (map[y][x] === "9") {
            sum++;
          }
          const nieghbors = [
            { x: x - 1, y },
            { x: x + 1, y },
            { x, y: y - 1 },
            { x, y: y + 1 },
          ].filter((p) => +map[p.y]?.[p.x] === +map[y][x] + 1);
          nieghbors.forEach((p) => {
            if (!visited.has(`${p.x},${p.y}`)) {
              visited.add(`${p.x},${p.y}`);
              queue.push(p);
            }
          });
        }
      }
    }
  }
  return sum;
}

console.log(trailhead());
