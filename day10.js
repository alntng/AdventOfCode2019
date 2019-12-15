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
// .map(num => Number(num));

console.log(input);
