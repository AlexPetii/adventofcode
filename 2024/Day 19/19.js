const fs = require("fs");

function countMatches(line, patterns, memo) {
  let matches = 0;
  if (line in memo) return memo[line];
  if (line.length === 0) return 1;
  for (let pattern of patterns) {
    if (line.startsWith(pattern)) {
      matches += countMatches(line.slice(pattern.length), patterns, memo);
    }
  }
  return (memo[line] = matches);
}

const data = fs.readFileSync("input.txt", "utf8");

function solve(memo = {}) {
  let [patterns, lines] = data.trim().split("\n\n").map((x) => x.split(/(\n|, )/));
  return lines.map((line) => countMatches(line, patterns, memo));
}

function part1() {
  return solve().filter((x) => x > 0).length;
}

function part2() {
    return solve().reduce((a,b) => a + b)
}


console.log(part1());
console.log(part2())