const possiblePasswords = (a, b) => {
  let possible = [];

  for (let i = a; i <= b; i++) {
    let stringA = i.toString();

    let double = false;
    let slopeUp = true;
    let setCount = {};
    for (let j = 1; j < 6; j++) {
      let current = Number(stringA[j]);
      let previous = Number(stringA[j - 1]);

      if (current === previous) {
        if (!setCount[current]) {
          setCount[current] = 2;
        } else {
          setCount[current]++;
        }
      }

      if (current < previous) {
        slopeUp = false;
      }
    }

    for (let key in obj) {
    }

    if (double && slopeUp) {
      possible.push(stringA);
    }
  }
  console.log(possible.length);
};

possiblePasswords(153517, 630395);
