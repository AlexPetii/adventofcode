const fs = require("fs");

function isReportSafe(report) {
  const levels = report.split(" ").map(Number);

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

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log("error readFile: ", err);
    return;
  }
  const reports = data.trim().split("\n");

  const safeReportCount = reports.filter(isReportSafe).length;

  console.log("Safe Report: ", safeReportCount);
});
