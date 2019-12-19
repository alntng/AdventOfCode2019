/* eslint-disable guard-for-in */
/* eslint-disable quotes */
/* eslint-disable max-statements */
/* eslint-disable complexity */
const fs = require("fs");
let input = fs
  .readFileSync("./day7input.txt")
  .toString()
  .split(",")
  .map(num => Number(num));

// console.log(input[514]);
let test = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];

function day5(arr, phase, machine) {
  let instructionPointer = 0;
  let outputs = [];

  let onPhase = true;

  while (instructionPointer < arr.length) {
    let instructions = arr[instructionPointer].toString().split("");

    let instructionCodes = [];
    while (instructions.length) {
      instructionCodes.push(instructions.pop());
    }
    //defining opCode
    let opCode = Number(instructionCodes[0]);
    let paramOneMode;
    let paramTwoMode;
    let paramThreeMode;

    //*defining first Parameter mode
    if (!instructionCodes[2]) {
      paramOneMode = 0;
    } else {
      paramOneMode = Number(instructionCodes[2]);
    }
    //*defining second Parameter mode
    if (!instructionCodes[3]) {
      paramTwoMode = 0;
    } else {
      paramTwoMode = Number(instructionCodes[3]);
    }
    //*defining third Parameter mode
    if (!instructionCodes[4]) {
      paramThreeMode = 0;
    } else {
      paramThreeMode = Number(instructionCodes[4]);
    }

    let paramOne;
    let paramTwo;
    let paramThree;
    let inputOne = arr[instructionPointer + 1];
    let inputTwo = arr[instructionPointer + 2];
    let inputThree = arr[instructionPointer + 3];

    //*reassigning paramOne
    if (paramOneMode === 1) {
      paramOne = inputOne;
    } else {
      paramOne = arr[inputOne];
    }
    //*reassigning paramTwo
    if (paramTwoMode === 1) {
      paramTwo = inputTwo;
    } else {
      paramTwo = arr[inputTwo];
    }
    //*reassigning paramThree
    if (paramThreeMode === 1) {
      paramThree = inputThree;
    } else {
      paramThree = arr[inputThree];
    }

    //OPCODE 1 or 2
    if (opCode === 1 || opCode === 2) {
      if (opCode === 1) {
        let sum = paramOne + paramTwo;
        arr[inputThree] = sum;
      } else {
        //opcode is 2 (still within larger if statement)
        let product = paramOne * paramTwo;
        arr[inputThree] = product;
      }
      instructionPointer += 4;
      //OPCODE 3
    } else if (opCode === 3) {
      if (onPhase) {
        arr[inputOne] = phase;
        onPhase = !onPhase;
      } else {
        arr[inputOne] = machine;
        onPhase = !onPhase;
      }
      instructionPointer += 2;
      //OPCODE 4
    } else if (opCode === 4) {
      // console.log(arr[inputOne]);
      outputs.push(arr[inputOne]);
      instructionPointer += 2;
      //OPCODE 5
    } else if (opCode === 5) {
      if (paramOne !== 0) {
        instructionPointer = paramTwo;
      } else {
        instructionPointer += 3;
      }
      //OPCODE 6
    } else if (opCode === 6) {
      if (paramOne === 0) {
        instructionPointer = paramTwo;
      } else {
        instructionPointer += 3;
      }
      //OPCODE 7
    } else if (opCode === 7) {
      if (paramOne < paramTwo) {
        arr[inputThree] = 1;
      } else {
        arr[inputThree] = 0;
      }
      instructionPointer += 4;
      //OPCODE 8
    } else if (opCode === 8) {
      if (paramOne === paramTwo) {
        arr[inputThree] = 1;
      } else {
        arr[inputThree] = 0;
      }
      instructionPointer += 4;
    } else if (opCode === 9) {
      break;
    }
  }

  // console.log(outputs);
  return outputs[0];
}

function getAllPermutations(string) {
  var results = [];

  if (string.length === 1) {
    results.push(string);
    return results;
  }

  for (var i = 0; i < string.length; i++) {
    var firstChar = string[i];
    var charsLeft = string.substring(0, i) + string.substring(i + 1);
    var innerPermutations = getAllPermutations(charsLeft);
    for (var j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}

function day7(arr) {
  let phasePermutations = getAllPermutations("01234").map(set => set.split(""));

  let firstMax = 0;

  for (let i = 0; i < phasePermutations.length; i++) {
    let currentCombo = phasePermutations[i];
    let prev = 0;
    currentCombo.forEach(phase => {
      let copy = [...arr];
      prev = day5(copy, Number(phase), prev);
    });
    firstMax = Math.max(firstMax, prev);
  }
  // console.log("AFTER", arr);
  console.log(firstMax);
}

day7(input);

/*
Popping off each index of object -- not needed
for (let i = 0; i < 5; i++) {
  let currentMax = 0;
  let maxPhase;
  for (let key in phases) {
    let outPut = day5(arr, phases[key], prev);

    if (outPut > currentMax) {
      currentMax = outPut;
      maxPhase = key;
    }
  }
  thrusterSignal.push(currentMax);
  prev = currentMax;
  delete phases[maxPhase];
}
*/
