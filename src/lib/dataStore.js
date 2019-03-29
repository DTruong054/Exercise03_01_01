var Pizza = require('../models/pizza');

var data = {};

// initialize data store with bootstrapped data
function init() {
  data.quotes = require('../mock/quotes');
  initPizzas(function (pizzas) {
    data.pizzas = pizzas;
  });
}

function getQuotes(ticker) {
  return data.quotes[ticker];
}

function getAllQuotes() {
  return new Promise((resolve) => {
    resolve(data.quotes);
  })
}

/** STEPS TO CONVERT
 * Get rid of callback
 * Create a return nre Promise
 * Add resolve, and reject with an arrow function
 * Copy and paste code.
 * Switch var to const
 * Create a arrow function
 * Copy and paste code
 * Change callback to resolve and delete the null
 * Add a .catch(reject)
 */
function getPizzas() {
  return new Promise((resolve) => {
    resolve(data.pizzas);
  })
}

function getPizza(ticker) {
  return new Promise((resolve, reject) => {
    resolve(data.pizzas[ticker]);
  })
}

function initPizzas(callback) {
  var pizzas = require('../mock/pizzas'),
    realPizzas = {},
    startingDate = new Date();

  pizzas.forEach(function (pizza) {
    // realPizzas[pizza[0]] = new Pizza(startingDate, data.quotes[pizza[0]], pizza[0], pizza[1], pizza[2], pizza[3], pizza[4]);
    //Spread syntax allows array expression or string to be expanded in places where zero or more arguments  or elements are expected, or an object expression to be expanded in places where zero or more key-value pairs are expected.
    realPizzas[pizza[0]] = new Pizza(startingDate, data.quotes[pizza[0]], ...pizza);
  });

  callback(realPizzas);
}

module.exports = {
  init,
  getQuotes,
  getAllQuotes,
  getPizzas,
  getPizza
};