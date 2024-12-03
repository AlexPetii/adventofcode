const { match } = require("assert");
const fs = require("fs");

function memory(input) {
  const pattern = /(mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))/g;

  const matches = [...input.matchAll(pattern)];

  let isActive = true;
  let sum = 0;

  matches.forEach((match) => {
    const [fullMatch, mul, x, y] = match;

    if (fullMatch === "do()") {
      isActive = true;
    } else if (fullMatch === "don't()") {
      isActive = false;
    } else if (mul && isActive) {
      sum += parseInt(x, 10) * parseInt(y, 10);
    }
  });
  return sum;
}

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error readFile ", err);
    return;
  }

  const result = memory(data.trim());
  console.log(result);
});
