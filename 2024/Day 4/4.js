const fs = require("fs");

function countXMAS(grid, word) {
  const dir = [
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 1 },
    { dx: -1, dy: -1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: 1 },
  ];

  const rows = grid.length;
  const cols = grid[0].length;
  const wordLength = word.length;
  let count = 0;

  function checkDir(x, y, dx, dy) {
    for (let i = 0; i < wordLength; i++) {
      const nx = x + i * dx;
      const ny = y + i * dy;

      if (
        nx < 0 ||
        ny < 0 ||
        nx >= rows ||
        ny >= cols ||
        grid[nx][ny] !== word[i]
      ) {
        return false;
      }
    }
    return true;
  }

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      dir.forEach(({ dx, dy }) => {
        if (checkDir(x, y, dx, dy)) {
          count++;
        }
      });
    }
  }
  return count;
}

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error readFile ", err);
    return;
  }

  const grid = data
    .trim()
    .split("\n")
    .map((line) => line.trim().split(""));

  const word = "XMAS";
  const result = countXMAS(grid, word);

  console.log("Total: ", result);
});
