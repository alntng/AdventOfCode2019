/* eslint-disable guard-for-in */
/* eslint-disable quotes */
/* eslint-disable max-statements */
/* eslint-disable complexity */
const fs = require("fs");
let input = fs
  .readFileSync("./day8input.txt")
  .toString()
  .split("")
  .map(num => Number(num));

input.pop();

// console.log(input.length);

let test = "123456789012".split("").map(num => Number(num));
// console.log(test);

//Create image layers
function imageLayer(arr, width, height) {
  let stacksOfLayers = [];
  let dimensions = width * height;

  for (let i = 0; i < arr.length; i += dimensions) {
    let currentLayer = [];
    for (let j = 0; j < dimensions; j++) {
      currentLayer.push(arr[i + j]);
    }

    stacksOfLayers.push(currentLayer);
  }
  // console.log(stacksOfLayers[100]);
  return stacksOfLayers;
}

imageLayer(input, 25, 6);

//Count zeroes
function countZeroes(arr) {
  let count = 0;
  arr.forEach(num => {
    if (num === 0) count++;
  });
  return count;
}

//Finding Layer with most zeroes
function fewestZeroes(arr, width, height) {
  let leastZeroCount = Infinity;
  let leastZeroIndex = 0;
  let stacks = imageLayer(arr, width, height);

  for (let i = 0; i < stacks.length; i++) {
    let currentZeroCount = countZeroes(stacks[i]);
    if (currentZeroCount < leastZeroCount) {
      leastZeroCount = currentZeroCount;
      leastZeroIndex = i;
    }
  }

  let oneDigits = 0;
  let twoDigits = 0;

  stacks[leastZeroIndex].forEach(num => {
    if (num === 1) {
      oneDigits++;
    } else if (num === 2) {
      twoDigits++;
    }
  });

  console.log(oneDigits * twoDigits);
}

fewestZeroes(input, 25, 6);
