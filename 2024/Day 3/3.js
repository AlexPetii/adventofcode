const fs = require("fs");

function memory(input) {
  const pattern = /(mul|do_not_mul)\((\d{1,3}),(\d{1,3})\)/g;

  let matches = [...input.matchAll(pattern)];

  const sum = matches.reduce((total, match) => {
    const x = parseInt(match[2], 10);
    const y = parseInt(match[3], 10);
    return total + x * y;
  }, 0);
  return sum;
}

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error read File: ", err);
    return;
  }

  const result = memory(data.trim());
  console.log("Result: ", result);
});
