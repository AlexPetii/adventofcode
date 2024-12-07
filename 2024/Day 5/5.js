const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8");

const [rawRules, rawUpdates] = input.trim().split("\n\n");

const rules = rawRules.split("\n").map((line) => line.split("|").map(Number));

const updates = rawUpdates
  .split("\n")
  .map((line) => line.split(",").map(Number));

function isValidUpdate(update, rules) {
  const seen = new Set();

  for (let page of update) {
    seen.add(page);

    for (let [x, y] of rules) {
      if (page === y && !seen.has(x)) {
        return false;
      }
    }
  }
  return true;
}

function filterRules(update, rules) {
  const pageSet = new Set(update);
  return rules.filter(([x, y]) => pageSet.has(x) && pageSet.has(y));
}

function sumOfMidPage(rules, updates) {
  let sum = 0;

  for (let update of updates) {
    const applicableRules = filterRules(update, rules);

    if (isValidUpdate(update, applicableRules)) {
      const middlePage = update[Math.floor(update.length / 2)];
      sum += middlePage;
    }
  }
  return sum;
}

const result = sumOfMidPage(rules, updates);
console.log(result);
