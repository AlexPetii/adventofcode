import * as fs from "node:fs/promises";

function countXMAS(grid: string[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  const isMas = (str: string): boolean => str === "MAS" || str === "SAM";

  for (let x = 1; x < rows - 1; x++) {
    for (let y = 1; y < cols - 1; y++) {
      const diag1 = grid[x - 1][y - 1] + grid[x][y] + grid[x + 1][y + 1];

      const diag2 = grid[x - 1][y + 1] + grid[x][y] + grid[x + 1][y - 1];

      if (isMas(diag1) && isMas(diag2)) {
        count++;
      }
    }
  }
  return count;
}

async function main() {
  try {
    const data = await fs.readFile("input.txt", "utf8");

    const grid: string[][] = data
      .trim()
      .split("\n")
      .map((line) => line.trim().split(""));

    const result = countXMAS(grid);

    console.log("Total X-MAS: ", result);
  } catch (err) {
    console.log("Error readFile ", err);
  }
}

main();
