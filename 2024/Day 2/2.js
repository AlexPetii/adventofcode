const fs = require("fs");

function isReportSafe(levels) {
  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 1; i < levels.length; i++) {
    const difference = levels[i] - levels[i - 1];

    if (difference < 1 || difference > 3) isIncreasing = false;
    if (difference > -1 || difference < -3) isDecreasing = false;

    if (!isIncreasing && !isDecreasing) return false;
  }
  return isIncreasing || isDecreasing;
}

function canBeSafe(levels) {
  for (let i = 0; i < levels.length; i++) {
    const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));

    if (isReportSafe(modifiedLevels)) {
      return true;
    }
  }
}

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log("error readFile: ", err);
    return;
  }
  const reports = data
    .trim()
    .split("\n")
    .map((line) => line.split(" ").map(Number));

  const safeReportCount = reports.filter(isReportSafe).length;

  const canBeSafeReportCount = reports.filter(
    (levels) => isReportSafe(levels) || canBeSafe(levels)
  ).length;

  console.log("Safe Report: ", safeReportCount);
  console.log("Can be save Report: ", canBeSafeReportCount);
});
