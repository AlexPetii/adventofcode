const fs = require("fs");

function getResultIfPossible(result, numbers, op) {
  let all = [numbers[0]];
  for (const i of numbers.slice(1)) {
    all = all.flatMap((x) => [+`${x}${i}`, x + i, x * i].slice(op ? 0 : 1));
  }
  return all.includes(result) ? result : 0;
}

try {
  const data = fs.readFileSync("input.txt", "utf8");
  const op = false;
  const results = data
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      let [result, numbers] = line.split(": ");
      numbers = numbers.split(" ").map(Number);
      return getResultIfPossible(+result, numbers, op);
    });
  const part1 = results.reduce((a, b) => a + b);
  console.log(part1);
} catch (err) {
  //do nothing
}
