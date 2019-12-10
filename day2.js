const fs = require("fs");
let input = fs
  .readFileSync("./day2input.txt")
  .toString()
  .split(",");

input = input.map(num => Number(num));

const intCode = (arr, noun, verb) => {
  arr[1] = noun;
  arr[2] = verb;

  for (let i = 0; i < arr.length; i += 4) {
    let opCode = arr[i];
    let idx1 = arr[i + 1];
    let idx2 = arr[i + 2];
    let newIdx = arr[i + 3];

    if (opCode === 1) {
      let sum = arr[idx1] + arr[idx2];
      arr[newIdx] = sum;
    } else if (opCode === 2) {
      let product = arr[idx1] * arr[idx2];
      arr[newIdx] = product;
    } else if (opCode === 99) {
      break;
    }
  }
  //   console.log(arr[0]);
  //   console.log(noun, verb);
  return arr[0];
};

// intCode(input, 12, 2);

const findNoundAndVerb = (target, arr) => {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      let copy = [...arr];
      let thisInt = intCode(copy, noun, verb);

      if (thisInt === target) {
        console.log(noun, verb);
      }
    }
  }
  //   console.log(count);
};

findNoundAndVerb(19690720, input);
