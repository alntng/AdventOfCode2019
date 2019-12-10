/* eslint-disable max-statements */
/*
Op code 3
takes 1 input
3,50, input
-> takes input value and stores at idx 50

Op code 4
takes 1 input
4,50, input
-> takes input value; outputs at address 50

Parameter modes
0 -> position mode
  -> value stored at this position
1 -> immediate mode
  -> parameter is parameter

ABCDE
-> D,E = opcode
-> C = first parameter node
-> B = second parameter node
-> A = third parameter node

[1002,4,3,4,33]
-> 4 (index1 )in position mode
[1002,33,3,4,33]
[1002,33,3,99]
\

*/
const fs = require("fs");
const input = fs
  .readFileSync("./day5input.txt")
  .toString()
  .split(",")
  .map(num => Number(num));

// eslint-disable-next-line complexity
function day7(arr, machine) {
  let instructionPointer = 0;
  let outputs = [];

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
      arr[inputOne] = machine;
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
  // console.log(arr);
  console.log(outputs);
}

day7(input, 5);
