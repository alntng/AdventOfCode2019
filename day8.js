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
  // console.log(stacksOfLayers[99].length);
  return stacksOfLayers;
}

// imageLayer(input, 25, 6);

function singleImage(arr, width, height) {
  let layers = imageLayer(arr, width, height);
  let newLayers = [];

  layers.map(layer => {
    let image = [];
    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        row.push(layer[width * i + j]);
      }
      image.push(row);
    }
    newLayers.push(image);
  });
  return newLayers;
}

// let testImages = singleImage(test, 3, 2);
// console.log(testImages[0]);

// console.log(inputImages);

function populateDrawing(arr, width, height) {
  let dimensions = width * height;
  let canvas = new Array(dimensions).fill(" ");

  let image = imageLayer(arr, width, height);
  // console.log(image[0]);
  image.forEach(layer => {
    for (let i = 0; i < dimensions; i++) {
      let currentCanvas = canvas[i];
      let currentImage = layer[i];
      if (currentCanvas === " ") {
        if (currentImage === 0) {
          canvas[i] = "X";
        } else if (currentImage === 1) {
          canvas[i] = "O";
        }
      }
    }
  });

  canvas = singleImage(canvas, width, height);
  console.log(canvas[0]);
}

populateDrawing(input, 25, 6);

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

// fewestZeroes(input, 25, 6);
