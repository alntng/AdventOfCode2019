const fs = require("fs");
const input = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n");

const first = input[0].split(",");
const second = input[1].split(",");

// const first = ["R8", "U5", "L5", "D3"];
// const second = ["U7", "R6", "D4", "L4"];

const crossedWires = (wire1, wire2) => {
  //helper function to create wires
  function createWire(arr) {
    let thisWire = [];
    let x = 0;
    let y = 0;

    arr.forEach(wire => {
      let direction = wire[0];
      let count = Number(wire.slice(1));

      if (direction === "U") {
        for (let i = 0; i < count; i++) {
          x++;
          thisWire.push(`${x},${y}`);
        }
      } else if (direction === "D") {
        for (let i = 0; i < count; i++) {
          x--;
          thisWire.push(`${x},${y}`);
        }
      } else if (direction === "R") {
        for (let i = 0; i < count; i++) {
          y++;
          thisWire.push(`${x},${y}`);
        }
      } else {
        //direction === 'L'
        for (let i = 0; i < count; i++) {
          y--;
          thisWire.push(`${x},${y}`);
        }
      }
    });
    return thisWire;
  }

  let firstWire = new Set(createWire(wire1));
  console.log(firstWire.size);
  let secondWire = createWire(wire2);
  console.log(secondWire.length);

  let found = [];

  for (let i = 0; i < secondWire.length; i++) {
    let secondCoordinate = secondWire[i];
    if (firstWire.has(secondCoordinate)) {
      found.push(secondCoordinate);
    }
  }

  found = found.map(coordinate => {
    coordinate = coordinate.split(",");
    let firstHalf = Number(coordinate[0]);
    // let firstInt = Number(firstHalf[firstHalf.length - 1]);
    let secondHalf = Number(coordinate[1]);
    // let secondInt = Number(secondHalf[0]);

    return Math.abs(firstHalf) + Math.abs(secondHalf);
  });
  console.log(Math.min(...found));
};

crossedWires(first, second);

// [-5, 0];
