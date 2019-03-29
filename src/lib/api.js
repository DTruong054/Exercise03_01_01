var request = require('request'),
  Pizza = require('../models/pizza');

var localPort;

function initPort(port) {
  localPort = port;
}

function getAllQuotes() {
  return new Promise((resolve, reject) => {
    request('http://localhost:' + localPort + '/quotes', function (error, res, body) {
      if (error) {
        reject(error);
      } else {
        //Do JSON.parse to return JSON text not just plain text
        resolve(JSON.parse(body));
      }
    });
  })
}

//Removed callback for a promise
function getPizza(ticker) {
  //This is a promise
  return new Promise((resolve, reject) => {
    request('http://localhost:' + localPort + '/pizza/' + ticker, function (error, res, body) {
      if (error) {
        reject(error);
      } else {
        resolve(Pizza.hydrate(JSON.parse(body)));
      }
    });
  });
}

function getAllPizzas() {
  return new Promise((resolve, reject) => {
    request('http://localhost:' + localPort + '/pizzas', function (error, res, body) {
      if (error) {
        reject(error);
      } else {
        const staticPizzas = JSON.parse(body),
          pizzas = [];

        for (let ix in staticPizzas) {
          pizzas.push(Pizza.hydrate(staticPizzas[ix]));
        }
        resolve(pizzas);
      }
    });
  });
}

module.exports = {
  initPort: initPort,
  getAllQuotes: getAllQuotes,
  getPizza: getPizza,
  getAllPizzas: getAllPizzas
};