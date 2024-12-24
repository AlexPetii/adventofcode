const fs = require("fs");

function blink(stones, numBlinks) {
  for (let blink = 0; blink < numBlinks; blink++) {
    const newStones = [];
    for (const stone of stones) {
      if (stone === 0) {
        newStones.push(1);
      } else if (String(stone).length % 2 === 0) {
        const str = String(stone);
        const mid = str.length / 2;
        const left = parseInt(str.slice(0, mid), 10);
        const right = parseInt(str.slice(mid), 10);
        newStones.push(left, right);
      } else {
        newStones.push(stone * 2024);
      }
    }
    stones = newStones;
  }
  return stones.length;
}

function part1() {
  const data = fs.readFileSync("input.txt", "utf8");
  const stones = data.split(" ").map(Number);
  const numBlinks = 25;
  return blink(stones, numBlinks);
}

console.log(part1())
