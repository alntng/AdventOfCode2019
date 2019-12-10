const fs = require("fs");
let input = fs
  .readFileSync("./day6input.txt")
  .toString()
  .split("\n");
input.pop();
// console.log(input);

let test = [
  "COM)B",
  "B)C",
  "C)D",
  "D)E",
  "E)F",
  "B)G",
  "G)H",
  "D)I",
  "E)J",
  "J)K",
  "K)L"
];

const day6 = arr => {
  let galaxy = {};

  arr.forEach(planet => {
    let planets = planet.split(")");
    let obj = planets[1];
    let orbit = planets[0];

    if (!galaxy[obj]) {
      galaxy[obj] = [orbit];
    } else {
      galaxy[obj].push(orbit);
    }
  });

  let totalOrbits = 0;
  for (const obj in galaxy) {
    let currentObj = obj;
    while (galaxy[currentObj]) {
      totalOrbits++;
      currentObj = galaxy[currentObj];
    }
  }
  console.log(totalOrbits);
};

day6(input);
