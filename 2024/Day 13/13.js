const fs = require("fs");

function solve({ ax, ay, bx, by, px, py }) {
  let a = (px * by - py * bx) / (ax * by - ay * bx);
  let b = (px - a * ax) / bx;

  if (Number.isInteger(a) && Number.isInteger(b)) {
    return a * 3 + b;
  } else {
    return 0;
  }
}

function parse(input) {
  return input.split("\n\n").map((group) => {
    let [a, b, prize] = group.split("\n");
    let [, ax, ay] = a.match(/X\+(\d+), Y\+(\d+)/);
    let [, bx, by] = b.match(/X\+(\d+), Y\+(\d+)/);
    let [, px, py] = prize.match(/X\=(\d+), Y\=(\d+)/);
    return { ax: +ax, ay: +ay, bx: +bx, by: +by, px: +px, py: +py };
  });
}

function part1() {
  const data = fs.readFileSync("input.txt", "utf8");
  let machines = parse(data);
  return machines
    .map(solve)
    .reduce((a, b) => a + b, 0);
}

console.log(part1());
