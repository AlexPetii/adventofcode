const fs = require("fs");

function calculateTotalDistance(leftList, rightList) {
  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  let totalDistance = 0;
  for (let i = 0; i < leftList.length; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i]);
  }
  return totalDistance;
}

function calculateSimilarityScore(leftList, rightList) {
  const rightFrequency = {};
  rightList.forEach((num) => {
    rightFrequency[num] = (rightFrequency[num] || 0) + 1;
  });

  let similarityScore = 0;
  leftList.forEach((num) => {
    if (rightFrequency[num]) {
      similarityScore += num * rightFrequency[num];
    }
  });
  return similarityScore;
}

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log("error readFile: ", err);
    return;
  }

  const leftList = [];
  const rightList = [];

  data
    .trim()
    .split("\n")
    .forEach((line) => {
      const [left, right] = line.trim().split(/\s+/).map(Number);
      leftList.push(left);
      rightList.push(right);
    });

  const result = calculateTotalDistance(leftList, rightList);
  const similarityScore = calculateSimilarityScore(leftList, rightList);
  console.log(result);
  console.log(similarityScore);
});
