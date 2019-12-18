/* eslint-disable guard-for-in */
/* eslint-disable quotes */
/* eslint-disable max-statements */
/* eslint-disable complexity */
const fs = require("fs");
let input = fs
  .readFileSync("./day10input.txt")
  .toString()
  .split("\n");
input.pop();

// function reduce(numerator, denominator) {
//   var gcd = function gcd(a, b) {
//     return b ? gcd(b, a % b) : a;
//   };
//   gcd = gcd(numerator, denominator);
//   return [numerator / gcd, denominator / gcd];
// }

function gcd(x, y) {
  if (typeof x !== "number" || typeof y !== "number") return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

// console.log(gcd(-4, 2));

function cartesian2Polar(x, y) {
  distance = Math.sqrt(x * x + y * y);
  radians = Math.atan2(y, x); //This takes y first
  polarCoor = { distance: distance, radians: radians };
  return polarCoor;
}

// console.log(Math.atan2(3, 4));

const day10 = arr => {
  let foundAsteroids = [];

  //locating every asteroid
  for (let row = 0; row < arr.length; row++) {
    for (let height = 0; height < arr[0].length; height++) {
      let beacon = arr[row][height];
      if (beacon === "#") {
        foundAsteroids.push([row, height]);
      }
    }
  }

  let maxAsteroids = 0;
  let finalAsteroids = new Set();
  let optimal = 0;

  foundAsteroids.forEach((asteroid, idx) => {
    let monitored = new Set();
    for (let i = 0; i < foundAsteroids.length; i++) {
      let rise = foundAsteroids[i][0] - asteroid[0];
      let run = foundAsteroids[i][1] - asteroid[1];
      let divisor = gcd(rise, run);

      let slope = `${rise / divisor}/${run / divisor}`;
      if (!monitored.has(slope)) {
        monitored.add(slope);
      }
    }

    if (monitored.size > maxAsteroids) {
      maxAsteroids = monitored.size;
      finalAsteroids = monitored;
      optimal = idx;
    }
  });

  finalAsteroids.delete("NaN/NaN");
  let finalAsteroidsArray = [];

  finalAsteroids.forEach(point => {
    let coordinates = point.split("/");
    finalAsteroidsArray.push([
      point,
      Math.atan2(coordinates[1], coordinates[0])
    ]);
  });

  finalAsteroidsArray.sort((a, b) => a[1] - b[1]);
  let zeroIndex = 0;

  finalAsteroidsArray.forEach((set, idx) => {
    if (set[1] === 0) {
      zeroIndex = idx;
    }
  });

  let count = 0;
  while (count <= 200) {
    if (zeroIndex < finalAsteroidsArray.length) {
      zeroIndex++;
    } else {
      zeroIndex = 0;
    }
    count++;
  }

  let thisPoint = finalAsteroidsArray[zeroIndex];
  let x = Number(thisPoint[0].split("/")[1]);
  x *= 100;
  let y = Number(thisPoint[0].split("/")[0]);
  console.log((x -= y));
  // console.log(thisPoint[0].split("/"));
};

day10(input);
