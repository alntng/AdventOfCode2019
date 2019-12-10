const fs = require("fs");
const input = fs
  .readFileSync("./day1input.txt")
  .toString()
  .split("\n");

//why did I have to pop?
input.pop();

function getFuel(num) {
  return Math.floor(Number(num) / 3) - 2;
}

const totalMass = arr => {
  let total = 0;

  arr.forEach(mass => {
    let currentFuel = getFuel(Number(mass));
    let currentSum = [currentFuel];

    while (currentFuel > 0) {
      currentFuel = getFuel(currentFuel);
      if (currentFuel > 0) {
        currentSum.push(currentFuel);
      }
    }

    currentSum.forEach(sum => (total += sum));
  });

  console.log(total);
};

totalMass(input);
//Mass divide by 3, round down, subtract 2
