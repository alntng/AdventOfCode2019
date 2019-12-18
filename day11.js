/* eslint-disable guard-for-in */
/* eslint-disable quotes */
/* eslint-disable max-statements */
/* eslint-disable complexity */

/*
inputs:
0 -> robot is over a black panel
1 -> robot is over a white panel

outputs:
0 -> paint the panel black
1 -> paint the panel white

0 -> turn left 90 degrees
1 -> turn right 90 degrees

. -> black panels
# -> white panels
*/

const fs = require("fs");
let input = fs
  .readFileSync("./day11input.txt")
  .toString()
  .split(",")
  .map(num => Number(num));

console.log(input);
