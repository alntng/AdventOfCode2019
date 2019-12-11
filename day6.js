/* eslint-disable max-statements */
/* eslint-disable complexity */
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
  "K)L",
  "K)YOU",
  "I)SAN"
];

const day6 = arr => {
  let galaxy = {};

  arr.forEach(planet => {
    let planets = planet.split(")");
    let obj = planets[1];
    let orbit = planets[0];

    if (!galaxy[obj]) {
      galaxy[obj] = orbit;
    }
  });

  let totalOrbits = 0;
  // eslint-disable-next-line guard-for-in
  for (const obj in galaxy) {
    let currentObj = obj;
    while (galaxy[currentObj]) {
      totalOrbits++;
      currentObj = galaxy[currentObj];
    }
  }

  let youPath = [galaxy.YOU];
  let youOrbit = galaxy.YOU;
  while (galaxy[youOrbit] !== "COM") {
    youPath.push(galaxy[youOrbit]);
    youOrbit = galaxy[youOrbit];
  }

  let sanPath = [galaxy.SAN];
  let sanOrbit = galaxy.SAN;
  while (galaxy[sanOrbit] !== "COM") {
    sanPath.push(galaxy[sanOrbit]);
    sanOrbit = galaxy[sanOrbit];
  }

  let meetingPoint;
  for (let i = 0; i < sanPath.length; i++) {
    let planet = sanPath[i];
    if (youPath.indexOf(planet) > 1) {
      meetingPoint = planet;
      break;
    }
  }

  let youIndex = 0;
  for (let i = 0; i < youPath.length; i++) {
    if (youPath[i] === meetingPoint) break;
    youIndex++;
  }

  let sanIndex = 0;
  for (let i = 0; i < sanPath.length; i++) {
    if (sanPath[i] === meetingPoint) break;
    sanIndex++;
  }
  console.log(sanIndex + youIndex);
};

day6(input);
