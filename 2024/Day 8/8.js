const fs = require("fs");

function parse(input) {
  const map = input.split("\n").map((line) => line.split(""));
  const dis = new Map();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] !== ".") {
        const key = map[y][x];
        dis.set(key, (dis.get(key) || []).concat({ x, y }));
      }
    }
  }
  return { map, dis };
}

function pairs(dis, fn) {
  for (const points of dis.values()) {
    for (const point of points) {
      for (const other of points) {
        if (point !== other) {
          fn(point, point.x - other.x, point.y - other.y);
        }
      }
    }
  }
}

try {
  const data = fs.readFileSync("input.txt", "utf8");
  const { map, dis } = parse(data);
  pairs(dis, ({ x, y }, dx, dy) => {
    if (map[y - dy * 2]?.[x - dx * 2]) map[y - dy * 2][x - dx * 2] = "#";
  });
  const part1 = map.reduce(
    (sum, line) => sum + line.filter((c) => c === "#").length,
    0
  );
  console.log("answer1:", part1);

  pairs(dis, ({ x, y }, dx, dy) => {
    while (map[y - dy]?.[x - dx]) map[(y -= dy)][(x -= dx)] = "#";
  });
  const part2 = map.reduce(
    (sum, line) => sum + line.filter((c) => c === "#").length,
    0
  );
  console.log("answer2:", part2);
} catch (err) {
  console.error(err);
}
