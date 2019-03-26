//Assigned the module.exports without the name fluxGenerator
//This was made into a arrow function
module.exports = (seed, times, variability, positivity) => {
  //Making a const so we can't change later
  const output = [];
  let current = seed;

  for (var i = 0; i < times; i++) {
    let change = (Math.random() * variability).toFixed(0);
    if ((Math.random() * positivity) <= (positivity / 2)) {
      change = -change;
    } else {
      change = +change;
    }
    current += change;
    output.push(current);
  }
  return output;
};
